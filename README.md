# Regen

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/William-Fernandes252/regen/LICENSE)
[![npm version](https://badge.fury.io/js/@williamfernandes%2Fregen.svg)](https://badge.fury.io/js/@williamfernandes%2Fregen)
[![CI status](https://github.com/William-Fernandes252/regen/actions/workflows/dev.yml/badge.svg)](https://github.com/William-Fernandes252/regen/actions/workflows/dev.yml)
[![Codecov](https://codecov.io/gh/William-Fernandes252/regen/graph/badge.svg?token=KF55A7SKBC)](https://codecov.io/gh/William-Fernandes252/regen)

Generate the skeleton (service, repository and factory) for an application resource.

```bash
regen scaffold -r product
```

```typescript
// src/repository/product.repository.ts

export default class ProductRepository {
 constructor() {}

 async create(data: any) {
  return Promise.reject("Method not implemented.");
 }

 async update(id: number, data: any) {
  return Promise.reject("Method not implemented.");
 }

 async delete(id: number) {
  return Promise.reject("Method not implemented.");
 }

 async read(id: number) {
  return Promise.reject("Method not implemented.");
 }
}
```

```typescript
// src/service/product.service.ts

export default class ProductRepository {
 constructor() {}

 async create(data: any) {
  return Promise.reject("Method not implemented.");
 }

 async update(id: number, data: any) {
  return Promise.reject("Method not implemented.");
 }

 async delete(id: number) {
  return Promise.reject("Method not implemented.");
 }

 async read(id: number) {
  return Promise.reject("Method not implemented.");
 }
}
```

```typescript
// src/factory/product.factory.ts

import ProductRepository from "../repository/product.repository";
import ProductService from "../service/product.service";

export default class ProductFactory {
  static getInstance() {
    return new ProductService(new ProductRepository());
  }
}
```

## Requirements

In order to use `regen`, you need to have Node.js (`>=20`) installed on your machine.

## Installation

If you want to install `regen` as a development dependency to a project, `cd` into the project and run

```bash
npm install -D @williamfernandes/regen
```

## Usage

### `regen scaffold`

Scaffold a new resource in your project.

```bash
Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -r, --resource    The name of the resource to scaffold   [array] [default: []]
  -s, --service     The name of the service to scaffold    [array] [default: []]
  -p, --repository  The name of the repository to scaffold [array] [default: []]
  -b, --base-dir    The base directory for the project    [string] [default: ""]
  -m, --main-dir    The main directory for the project [string] [default: "src"]

Examples:
  scaffold -r product          Scaffold a project with a single "product" domain
  scaffold -r product -r user  Scaffold a project with two domains: "product" an
                               d "user"
  scaffold -s product          Scaffold a project with a single "product" servic
                               e

For more information, visit the documentation.
```
