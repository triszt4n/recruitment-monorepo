# Simonyi admin BE

- Yarn v1
- Node v18

1. Change .env
2. Run these:

```sh
yarn install
yarn prisma migrate dev
dapr run --app-id email-backend --app-protocol http --app-port 5700 --dapr-http-port 3700 --resources-path ../components -- npm run dev
```

Anytime new model is added to the db schema:

```sh
yarn prisma migrate dev
yarn prisma generate
```
