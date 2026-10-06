<div align="center">

![Bannière ORIORIS](banniere_orioris.jpg)

# CV interactif ORIORIS

Un CV à parcourir, avec un assistant qui répond à partir de documents vérifiables.

[🌐 Voir le CV](https://cv.orioris.com) · [💻 Projets GitHub](https://git.orioris.com) · [✨ Découvrir ORIORIS](https://orioris.com)

</div>

---

## 🟦 Ce que fait le site

Le CV présente les expériences et projets. Le chat répond aux questions en distinguant les faits documentés, les projets personnels et les informations qu'il ne peut pas confirmer. Les liens proposés par l'assistant sont contrôlés par la page web ; ses réponses Markdown sont assainies avant affichage.

## 🟧 Comment fonctionne le RAG

Les notes destinées à l'assistant restent **hors de ce dépôt public**. Le workflow d'ingestion `RAG_TEST` lit ces fichiers dans un espace privé, les découpe, calcule leurs représentations avec Ollama et les insère dans la collection Qdrant `RAG_CV`. Le chat recherche ensuite des passages pertinents avant de répondre.

➡️ [Comprendre le workflow d'ingestion](n8n/%E2%99%BE%EF%B8%8FRAG_TEST%20%28Ingestion%20Locale%29.md)

## 🟩 À quoi sert `cv-event.json` ?

C'est l'export du petit workflow n8n qui **compte l'usage du CV**. Il reçoit six types d'événements : `page_view`, `chat_open`, `question`, `click_git`, `click_orioris` et `click_preuves`.

La page envoie un identifiant de session temporaire et, s'ils figurent dans l'URL, les paramètres `source` et `company`. Pour `question`, l'événement ne recopie pas le texte saisi. Le workflow valide les événements, limite leur fréquence et conserve des compteurs agrégés ; il ne stocke pas l'adresse IP brute comme donnée d'analytics. Ce n'est **pas** le workflow qui répond aux questions.

## 🟪 Les fichiers utiles

| Fichier | Rôle |
| --- | --- |
| `index.html` | CV et interface du chat |
| `n8n/question-cv-patrice.json` | Export du workflow de questions/réponses |
| `n8n/cv-event.json` | Export des compteurs d'événements |
| `n8n/♾️RAG_TEST (Ingestion Locale).md` | Explication de l'ingestion documentaire |

Les exports publics ne contiennent pas de credentials. Les notes personnelles et la configuration privée ne font pas partie de ce dépôt.
