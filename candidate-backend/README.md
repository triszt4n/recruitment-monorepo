# Simonyi admin BE

- Yarn v1
- Node v18
- Prisma
- Postgres v13

1. Create DB with name simonyiadmin in Postgres
2. Change .env for this
3. Run these:

```sh
yarn install
yarn prisma migrate dev
dapr run --app-id candidate-backend --app-protocol http --app-port 5500 --dapr-http-port 3500 --resources-path ../components -- npm run dev
```

Anytime new model is added to the db schema:

```sh
yarn prisma migrate dev
yarn prisma generate
```
