


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Config and migrate

```bash
$ yarn docker # create postgresql docker please remind not using port 5432
# yarn docker:clear for remove and clean container and image
$ yarn migrate 
$ yarn seed 
# no of seed could be adjust in src/prisma/seed.ts
```


## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Testing the app

```bash
IMPORT "nest-hospital.postman_collection.json" to POSTMAN and test
```

## additionsal library usage

- dotenv
- prisma
- faker
- @nestjs/swagger


## FURTURES IMPROVEMENT
- versioning data in table.


