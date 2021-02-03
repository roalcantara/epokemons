# e(lastic)-pokemons

A simple multi-containerized [Docker][11] application sample with [NestJS][6], [PostgreSQL][22] and [Elasticsearch][25]

---

## Intro

  As a sysadmin
  I want that each new record on a Postgres table
  Be also searchable on Elasticsearch

### How it works?

#### Given that

- There is an App's Docker container up and running
- There is a Postgres' Docker container up and running
- There is an Elasticsearch's Docker container up and running
- And the dockerized app is listening to a Postgres' trigger

#### When

- A new record is added to a Postgres' table
- And dockerized Postgres triggers a notification

#### Then

- The dockerized app catches the Postgres' notification
- And the dockerized app indexes the received data on Elasticsearch

---

## Setup

### Dependencies

- [Docker][11]: Which helps developers and teams build and ship apps

    ```sh
    brew cask install docker-edge
    ```

### Clone the repository

  1. Run `git clone https://github.com/roalcantara/epokemons.git` to check out the project
  2. Run `cd epokemons`

---

## Running

  This project can be ran using [Docker Compose][20], which ensures that everything it depends on, like the aforementioned external services, is created during the start process.

  > These steps can also be followed via **[REST CLIENT][31]** with the file
  > [apps/api/api.rest](apps/api/api.rest)

   1. **Run the containerized app**

      ```sh
      yarn up # or docker-compose up --build -V
      ```

   2. **Ensure that the environment is up and running**

      - Run `curl http://localhost:3333/api/health`
      - Run `curl 'http://localhost:9200/_cat/nodes?v=true&pretty'`

   3. **Check the current records**

      - Run `curl http://localhost:3333/api/pokemons` to load from postgres via app
      - Run `curl http://localhost:3333/api/search` to load from elasticsearch via app
      - Run `curl http://localhost:9200/pokemons/_doc/_search` to load directly on elasticsearch

   4. **Start listening the postgres' triggers**

      So that when a new record is created on the database it will be sent to elasticsearch

         - Run `curl http://localhost:3333/api/listen`

   5. **Insert a new record on the database**

      To create a new record on the database

         - Run `curl -X POST http://localhost:3333/api/pokemons/:id`
         - Where  `:pokemon_id` is a [pokemon][7] id.
         - That is, each time this script is ran, it should change the id. **Ex:**
           - First time: `curl -X POST http://localhost:3333/api/pokemons/1`
           - Second time: `curl -X POST http://localhost:3333/api/pokemons/2`
           - And so on...
         - Run `curl http://localhost:3333/api/pokeapi` to check all available options

   6. **Show a record by id**

      - Run `curl http://localhost:3333/api/pokemons/:id` to load from postgres via app
      - Run `curl http://localhost:3333/api/search/:id` to load from elasticsearch via app
      - Run `curl http://localhost:9200/pokemons/_doc/:id` to load directly from elasticsearch

   7. **List all records**

      - Run `curl http://localhost:3333/api/pokemons` to load from postgres via app
      - Run `curl http://localhost:3333/api/search` to load from elasticsearch via app
      - Run `curl http://localhost:9200/pokemons/_doc/_search` to load directly from elasticsearch

   8. **Stop the containerized app**

      ```sh
      yarn down # or docker-compose down -v
      ```

      Which will:

        - Shutdown the Postgres' Docker container
        - Shutdown the Elasticsearch's Docker container
        - Shutdown the App's Docker container
        - Remove any container volume

---

## Developing

A multi-containerized docker application

### 1. Overview

Using [Compose][20] is basically a three-step process:

  1. Define the app’s environment with a [Dockerfile][29]
   So it can be reproduced anywhere
  2. Define the services that make up the app in `docker-compose.yml`
   So they can be run together in an isolated environment
  3. Run `docker-compose up`
   So Compose starts and runs the entire app

### 2. Project's Commands

  1. Run `yarn start` to run the NodeJS app
  2. Run `yarn up` to compose starts and runs the entire app, which will
     - Startup the Postgres Docker container
       - Run the required sql scripts to setup the database
     - Startup the Elasticsearch Docker container
     - Startup the NodeJS app Docker container
  3. Run `yarn down` to compose stops the entire app, which will
     - Shutdown the Postgres Docker container
     - Shutdown the Elasticsearch Docker container
     - Shutdown the NodeJS app Docker container
     - Remove any container volume
  4. Run `nx run api:docker-build --v='0.1.0'` to build a new image
  5. Run `nx run api:docker-run --v='0.1.0'` to run a container from the image
  6. Run `nx run api:docker-stop` to run stop the container

### 3. Docker Commands

  1. Run `docker image ls --all` to see all available images
     - Run `docker image rm :image_id` to remove an image
  2. Run `docker image prune --all` to remove any stopped containers and all unused images
  3. Run `docker container ls --all` to see all runninng containers
     - Run `docker container stop :name` to stop a runninng containers
     - Run `docker container rm :name` to remove a stopped containers

---

## Dockerized Development Environment

### 1. Create a [NestJS][6]'s app

### 2. Add a [Dockerfile][29]

Which defines the app’s environment

### 3. Add the [docker-compose.yml][20] file

Which composes [multi-container][17] applications

   1. **Add the [NestJS][6]' app service**
      - Is responsible for running the application
      - Exposes the container's port `3333`
      - Is accessible via `http://localhost:3333/api`

   2. **Add the [PostgreSQL][22]'s service**
      - Exposes the container's port `5432`
      - Is accessible via `postgres://user:password@localhost:5432/database`
      - Runs a script to setup the table and triggger

   3. **Add the [Elasticsearch][25]'s service**
      - Exposes the container's port `9200`
      - Is accessible via `http://localhost:9200`

---

## Nx

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

### Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@epokemons/mylib`.

### Development server

Run `nx serve my-app` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

### Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

---

## 6. References

- [Docker - A platform built for developers to build and run applications][11]
- [NestJS - A progressive Node.js framework for building efficient, reliable and scalable server-side applications][6]
- [Homebrew - A package manager for macOS (or Linux)][8]
- [Chocolatey - A Package Manager For Windows][5]
- [Containerized development with NestJS and Docker][17]
- [Local Development Set-Up of PostgreSQL with Docker][19]
- [Become a Docker Power User With Microsoft Visual Studio Code][21]
- [Dockerize PostgreSQL][22]
- [Getting Started with PostgreSQL using Docker-Compose][23]
- [Install Elasticsearch with Docker][24]
- [Running the Elastic Stack on Docker][25]
- [Elastic Docker registry][26]
- [Dockerize your Development Environment for Node.js][30]

[1]: https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-8.1/
[2]: https://docs.chocolatey.org/en-us/choco/setup#non-administrative-install
[3]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1
[4]: https://stefanscherer.github.io/how-to-install-docker-the-chocolatey-way
[5]: https://chocolatey.org/install
[6]: https://nestjs.com/
[7]: https://pokeapi.co/
[8]: https://brew.sh/
[9]: https://nodejs.org/en/
[10]: https://yarnpkg.com/
[11]: https://www.docker.com/
[12]: https://asdf-vm.com/#/
[13]: https://direnv.net/
[14]: https://nodejs.org/en/download/
[15]: https://www.npmjs.com/package/bats
[16]: https://github.com/asdf-vm/asdf/pull/451
[17]: https://blog.logrocket.com/containerized-development-nestjs-docker/
[18]: https://docs.docker.com/engine/reference/builder/
[19]: https://towardsdatascience.com/local-development-set-up-of-postgresql-with-docker-c022632f13ea
[20]: https://docs.docker.com/compose/
[21]: https://youtu.be/sUZxIWDUicA
[22]: https://docs.docker.com/engine/examples/postgresql_service/
[23]: https://medium.com/analytics-vidhya/getting-started-with-postgresql-using-docker-compose-34d6b808c47c
[24]: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
[25]: https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-docker.html
[26]: https://www.docker.elastic.co/
[27]: https://nx.dev/latest/angular/getting-started/getting-started
[28]: https://nx.dev/latest/angular/tutorial/01-create-application
[29]: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
[30]: https://medium.com/javascript-in-plain-english/dockerize-your-development-environment-in-node-js-c64de51c540c
[31]: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
