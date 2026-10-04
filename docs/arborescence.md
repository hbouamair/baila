# Arborescence, parcours et contenu — Bailamos

Livrable de la phase 1 (avant le guide PDF de charte graphique). Les pages existent et sont navigables en filaire gris ; l’identité visuelle sera appliquée ensuite par remplacement des tokens dans `src/app/(frontend)/globals.css`.

## Arborescence

Préfixe de langue obligatoire : `/fr`, `/en`, `/es`.

| Page | FR | EN | ES |
| --- | --- | --- | --- |
| Accueil | `/fr` | `/en` | `/es` |
| Pass & réservation | `/fr/pass` | `/en/passes` | `/es/pases` |
| Artistes | `/fr/artistes` | `/en/artists` | `/es/artistas` |
| Fiche artiste | `/fr/artistes/[slug]` | `/en/artists/[slug]` | `/es/artistas/[slug]` |
| Programme | `/fr/programme` | `/en/program` | `/es/programa` |
| Infos pratiques | `/fr/infos-pratiques` | `/en/practical-info` | `/es/info-practica` |
| FAQ | `/fr/faq` | `/en/faq` | `/es/faq` |
| Contact | `/fr/contact` | `/en/contact` | `/es/contact` |
| Mentions légales | `/fr/mentions-legales` | `/en/mentions-legales` | `/es/mentions-legales` |
| CGV | `/fr/cgv` | `/en/cgv` | `/es/cgv` |
| Confidentialité | `/fr/confidentialite` | `/en/confidentialite` | `/es/confidentialite` |
| Admin CMS | `/admin` | `/admin` | `/admin` |

## Parcours utilisateurs

1. **Découverte → achat** : Accueil → bouton **Découvrir les pass** → page Pass & réservation → **Acheter sur Go&Dance** (nouvel onglet, plateforme externe).
2. **Programmation** : Accueil ou menu → Artistes / Programme.
3. **Organisation** : Infos pratiques, FAQ, Contact (message stocké dans le CMS, sans e-mail transactionnel pour l’instant).
4. **Édition** : `/admin` → Pass, prix, liens, contenus localisés FR/EN/ES.

Le site n’a pas de panier, de paiement ni de compte acheteur.

## Blocs par page

- **Accueil** : hero (titre, sous-titre, image), CTA principal, highlights, artistes mis en avant, bandeau pass.
- **Pass** : intro, mention de redirection, cartes (nom, description, tarif courant + période, jours, inclusions, conditions, bouton d’achat).
- **Artistes** : grille + fiche (photo, rôle, bio, réseaux).
- **Programme** : créneaux groupés par jour.
- **Infos pratiques** : lieu, carte, accès, hébergement.
- **FAQ** : accordion.
- **Contact** : e-mail + formulaire.
- **Légal** : rich text éditable.

## Modèle de contenu (Payload)

Collections : `passes`, `artists`, `programme`, `faqs`, `pages`, `contact-submissions`, `media`, `users`.

Globals : `site-settings` (nom, dates, ville, **nom de la plateforme + URL de repli**, e-mail, Plausible, réseaux), `home`, `practical-info`.

Les champs éditoriaux sont localisés `fr` / `en` / `es`. Le tarif affiché est calculé à la date du jour parmi les périodes (`pricingTiers`). Le bouton d’un pass utilise `purchaseUrl` s’il est renseigné, sinon l’URL de repli des réglages.

## Suivi

Événement `outbound_ticket_click` avec `pass`, `platform`, `locale`. Le suivi des ventes réelles dépend de Go&Dance et est hors périmètre.

## À fournir par l’organisateur

- Guide PDF de charte graphique, logos, polices, traitement photo.
- Descriptifs définitifs des pass, tarifs, conditions, liens Go&Dance (pass par pass si possible).
- Line-up, bios, photos, programme, infos lieu / accès / hébergement.
- Mentions légales, CGV, politique de confidentialité.
- Compte Plausible (domaine) si le suivi doit être activé en production.
- Date de remise du PDF pour caler la phase 2 (application de la charte, validation des maquettes, intégration).
