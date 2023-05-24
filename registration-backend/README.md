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
yarn dev
```

Anytime new model is added to the db schema:

```sh
yarn prisma migrate dev
yarn prisma generate
```
