# Sequelize Typescript Bootstrap

This was started with my own bootstrap project found [here](https://github.com/edge0701/sequelize-typescript-bootstrap)

Bootstrap project showcases sequelize migration, seeding and models in Typescript, using annotations in model definitions

## Installation
```console
yarn install
```

## Build
```console
yarn build
```

## Migration
Run outstanding migration(s)
```console
yarn migrate
```

Undo last migration
```console
yarn migrate:undo
```

Undo all migrations
```console
yarn migrate:undo:all
```

## Seeding
Run a single seed
```console
yarn seed --seed build/seed/00001-org-dev.js
```

Run outstanding seed(s)
```console
yarn seed:all
```

Undo single seed
```console
yarn seed:undo --seed build/seed/00001-org-dev.js
```

Undo all seeds
```console
yarn seed:undo:all
```