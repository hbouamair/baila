# Bailamos

Site du festival de bachata — Next.js 16 + Payload CMS 3. Phase 1 : structure, contenus et filaire neutre. La charte graphique (PDF) s’applique ensuite via les tokens CSS.

## Prérequis

- Node.js 20.9+
- Docker Desktop (Postgres local)
- pnpm 9+

## Démarrage

```bash
docker compose up -d
cp .env.example .env
pnpm install
pnpm payload migrate
pnpm seed
pnpm dev
```

- Site : [http://localhost:3000/fr](http://localhost:3000/fr)
- Admin : [http://localhost:3000/admin](http://localhost:3000/admin) — `admin@bailamos.local` / `admin`

## Scripts

| Commande | Rôle |
| --- | --- |
| `pnpm dev` | Dev (avec `--no-server-fast-refresh` pour Payload) |
| `pnpm seed` | Contenus de démonstration |
| `pnpm generate:types` | Types TypeScript Payload |
| `pnpm test:e2e` | Parcours Playwright desktop + mobile |

## Mise en ligne (Vercel + Supabase)

Le site tourne sur Vercel. Postgres et les médias CMS vont sur Supabase.

### 1. Projet Supabase

1. Créez un projet sur [supabase.com](https://supabase.com).
2. **Database → Connection string → Transaction pooler** (port `6543`).
3. Copiez l’URI et ajoutez `?sslmode=require` si besoin. C’est `DATABASE_URL`.
4. **Storage → New bucket** nommé `media`, public.
5. **Storage → S3** : générez les clés. Endpoint :

`https://<PROJECT_REF>.storage.supabase.co/storage/v1/s3`

### 2. Variables Vercel

Dans le projet Vercel (Production + Preview) :

| Variable | Valeur |
| --- | --- |
| `DATABASE_URL` | URI pooler Supabase |
| `PAYLOAD_SECRET` | longue chaîne aléatoire |
| `NEXT_PUBLIC_SITE_URL` | `https://votre-domaine.vercel.app` |
| `S3_BUCKET` | `media` |
| `S3_REGION` | région du projet (ex. `eu-west-1`) |
| `S3_ENDPOINT` | URL S3 ci-dessus |
| `S3_ACCESS_KEY_ID` | clé S3 Supabase |
| `S3_SECRET_ACCESS_KEY` | secret S3 Supabase |

Localement, laissez les variables `S3_*` vides : les uploads restent dans `/media`.

### 3. Déployer

```bash
git push
# ou
npx vercel --prod
```

Puis, une fois contre la base Supabase :

```bash
PAYLOAD_PUSH=true pnpm payload migrate
pnpm seed
```

Admin : `/admin` — créez le premier utilisateur au premier lancement, ou utilisez le seed.
