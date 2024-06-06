## Description

This is a microservice built using the [Nest](https://github.com/nestjs/nest) framework in TypeScript.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## TODO

- identify wich client type is making the connection to the server.
- remove DTOs, are useless because the only way to send data in `handleConnection` is via query.
- create docker compose for this service.
- create cruds for the diferents entities.
- add auth.
- add test with coverage.
