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
dapr run --app-id registration-backend --app-protocol http --app-port 5600 --dapr-http-port 3600 --resources-path ../components -- npm run dev
```

Anytime new model is added to the db schema:

```sh
yarn prisma migrate dev
yarn prisma generate
```
