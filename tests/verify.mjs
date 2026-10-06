import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8');
const html = await read('index.html');

assert.match(html, /message\.textContent = text;/, 'La question utilisateur doit utiliser textContent.');
assert.doesNotMatch(html, /chat\.innerHTML\s*\+=/, 'Le chat ne doit pas concaténer du contenu dans innerHTML.');
assert.match(html, /DOMPurify\.sanitize\(marked\.parse\(markdown\)/, 'Le Markdown doit être assaini.');
assert.match(html, /FORBID_TAGS:\s*\['a', 'script'/, 'Les liens et scripts du modèle doivent être interdits.');
assert.match(html, /const LINK_TOKEN_PATTERN = \/.*LINK:.*preuves.*archives/, 'Les liens doivent passer par des marqueurs contrôlés.');

for (const event of ['page_view', 'chat_open', 'question', 'click_git', 'click_orioris', 'click_preuves']) {
  assert.ok(html.includes(event), `Événement manquant dans le frontend : ${event}`);
}

for (const url of [
  'https://cv.orioris.com',
  'https://git.orioris.com',
  'https://orioris.com',
  'https://drive.google.com/drive/folders/1cxoLwXPXy0IUmi6_1hh8_lcT-3sQ7GhV?usp=drive_link',
  'https://drive.google.com/drive/folders/1U8E8ZASnV2SxmWwi70ShFICYZ5ow3jlQ?usp=drive_link'
]) {
  assert.ok(html.includes(url), `Lien public manquant : ${url}`);
}

assert.ok(html.includes('https://n8n.orioris.com/webhook/question-cv-patrice'));
assert.ok(html.includes('https://n8n.orioris.com/webhook/cv-event'));
assert.ok(!html.includes('https://api.orioris.com/webhook/'), 'Le frontend ne doit pas utiliser le domaine actuellement bloqué.');

function findKey(value, searchedKey) {
  if (!value || typeof value !== 'object') return false;
  if (Object.hasOwn(value, searchedKey)) return true;
  return Object.values(value).some((child) => findKey(child, searchedKey));
}

const workflowFiles = ['n8n/question-cv-patrice.v2.json', 'n8n/cv-event.json'];
for (const file of workflowFiles) {
  const workflow = JSON.parse(await read(file));
  assert.ok(Array.isArray(workflow.nodes) && workflow.nodes.length > 0, `Workflow vide : ${file}`);
  assert.ok(workflow.connections && typeof workflow.connections === 'object', `Connexions manquantes : ${file}`);
  assert.equal(findKey(workflow, 'credentials'), false, `Credential trouvé dans l'export public : ${file}`);
  assert.equal(findKey(workflow, 'instanceId'), false, `Identifiant d'instance trouvé : ${file}`);
  assert.equal(workflow.settings.saveDataSuccessExecution, 'none');
  assert.equal(workflow.settings.saveDataErrorExecution, 'none');
  for (const node of workflow.nodes.filter((candidate) => candidate.type === 'n8n-nodes-base.code')) {
    new Function(node.parameters.jsCode);
  }
}

const questionWorkflow = JSON.parse(await read('n8n/question-cv-patrice.v2.json'));
const agent = questionWorkflow.nodes.find((node) => node.name === 'AI Agent');
assert.ok(agent.parameters.options.systemMessage.includes("Je ne peux pas le confirmer avec les éléments disponibles."));
assert.ok(agent.parameters.options.systemMessage.includes('Ne produis jamais de HTML'));
assert.ok(!agent.parameters.options.systemMessage.includes('<a href='));
assert.equal(questionWorkflow.nodes.find((node) => node.name === 'Qdrant Vector Store').parameters.qdrantCollection.value, '=RAG_CV');

const eventWorkflow = JSON.parse(await read('n8n/cv-event.json'));
const eventCode = eventWorkflow.nodes.find((node) => node.name === 'Valider et agréger').parameters.jsCode;
assert.ok(!/headers|user-agent|cf-connecting-ip|x-forwarded-for/i.test(eventCode), 'Le workflow analytics ne doit pas conserver les en-têtes ou IP.');

const ragDirectory = path.join(root, 'rag');
const ragFiles = (await readdir(ragDirectory)).filter((name) => name.endsWith('.md'));
assert.ok(ragFiles.length >= 5, 'Les notes RAG attendues sont absentes.');
for (const file of ragFiles) {
  const contents = await read(path.join('rag', file));
  assert.match(contents, /^---[\s\S]*rag_sync: true[\s\S]*---/, `Frontmatter RAG invalide : ${file}`);
}

const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .filter((script) => script.trim());
for (const script of inlineScripts) {
  new Function(script);
}

console.log(`OK — frontend, ${workflowFiles.length} workflows et ${ragFiles.length} notes RAG vérifiés.`);
