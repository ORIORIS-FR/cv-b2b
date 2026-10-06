# 🟧 Ingestion RAG_TEST

Le workflow d'ingestion prépare les documents que l'assistant du CV peut rechercher. Il fonctionne séparément du workflow qui répond aux visiteurs. Les notes source restent dans un espace privé, **pas dans ce dépôt GitHub**.

## Le trajet d'une note

```text
Note locale → détection du fichier → lecture → découpage en passages
            → embeddings Ollama → collection Qdrant RAG_CV
            → recherche par l'assistant lors d'une question
```

Le déclencheur local réagit aux ajouts et modifications dans le dossier monté pour n8n. Un nœud lit chaque fichier ; le chargeur de documents et le découpeur préparent des passages. Ollama calcule leurs embeddings, puis le nœud Qdrant les insère dans `RAG_CV`.

## Limite importante

Le stockage est en mode `insert`. Dans l'état observé, les passages indexés n'ont pas d'identifiant de fichier stable permettant de retirer à coup sûr les anciennes versions d'une note. Une modification peut donc laisser des doublons ou des passages obsolètes. Pour une mise à jour importante, il faut contrôler la collection et effectuer une réindexation maîtrisée, sans supposer que le fichier remplacé a effacé ses anciens passages.

## Confidentialité

« Local » ne veut pas dire « secret » : si une information est indexée, un visiteur peut tenter de l'obtenir par le chat. Seuls les contenus destinés à être présentés publiquement devraient être ingérés. Aucun chemin privé, identifiant de connexion ou contenu des notes n'est publié ici.
