---
title: Architecture et compétences IA - périmètre vérifié
type: 💻_it_dev
status: 🟢_actif
tags: [DEV/CV, SYSTEME/RAG_Agent]
related: []
created_at: 2026-06-28
updated_at: 2026-10-06
rag_sync: true
---

# Architecture et compétences IA : Patrice Vayne

## Statut des éléments décrits

Les éléments ci-dessous proviennent de projets personnels et de démonstrateurs ORIORIS/Bunker IA. Ils illustrent une pratique concrète de l'automatisation et des systèmes agentiques. Ils ne doivent pas être présentés comme une expérience salariée, une certification, ni une exploitation à grande échelle sans preuve complémentaire.

## Gestion de connaissances et RAG

- Structuration de connaissances en Markdown avec métadonnées YAML dans Obsidian.
- Mise en œuvre d'un pipeline RAG avec découpage documentaire, embeddings et recherche vectorielle.
- Outils observés dans les sources : n8n, Qdrant, Ollama et `nomic-embed-text`.
- Cas d'usage démontré : permettre à un agent conversationnel de répondre à des questions sur un CV à partir de documents contrôlés.

## Automatisation et intégration

- Conception et maintenance de workflows n8n reliant webhooks, modèles de langage, mémoire de session et base vectorielle.
- Manipulation de formats JSON et Markdown, appels d'API et scripts Python/JavaScript dans le cadre de projets personnels.
- Utilisation d'un routeur LiteLLM pour découpler les workflows du fournisseur de modèle.
- Expérimentations mentionnées dans les sources avec LangGraph et CrewAI. Ne pas en déduire un niveau d'expertise professionnelle non documenté.

## Infrastructure du démonstrateur

- Conteneurisation avec Docker et Docker Compose.
- Services documentés : PostgreSQL, Redis, Qdrant, Ollama, LiteLLM et n8n.
- Accès distant et routage expérimentés avec Cloudflare Tunnel et Tailscale.
- Observabilité par journaux et outils de supervision dans l'environnement personnel.

## Valeur métier visée

La finalité n'est pas de présenter Patrice comme développeur logiciel confirmé. Le projet montre surtout sa capacité à relier un besoin utilisateur, une source documentaire, un workflow d'automatisation et une interface simple. Ce positionnement est cohérent avec des missions de Change Management, Customer Success, adoption IA, intégration de solutions et amélioration de processus.

## Limites de réponse pour l'agent

- Ne jamais exposer d'identifiant, de credential, de chemin privé ou de configuration secrète.
- Ne pas transformer un outil utilisé en « maîtrise experte » sans preuve.
- Ne pas attribuer de performance, de disponibilité, de robustesse ou de niveau de sécurité non mesuré.
- Présenter ORIORIS et Bunker IA comme projets personnels/démonstrateurs lorsque la question porte sur l'expérience professionnelle.
