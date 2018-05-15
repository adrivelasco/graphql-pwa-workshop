# GraphQL PWA Workshop

This proyect contains:

### `/graphql` directory

GraphQL API Server based on `graphql-yoga`.

### `/webapp` features

Progressive Web Application built with `nodejs/express`, `reactjs`, `graphql`, `apollo-server` (server-side-rendering) and `apollo-client` for connet the UI with our GraphQ server.

## Requirements

  * Mac OS X, Windows, or Linux
  * [Node.js](https://nodejs.org/) v9.0 or newer
  * Text editor or IDE pre-configured with React/JSX/ESlint

## Getting Started

1. Clone the repo and install dependencies

````bash
git clone git@github.com:adrivelasco/graphql-pwa-workshop.git
cd graphql-pwa-workshop
npm install -g webpack nodemon
npm run install:graphql
npm run install:webapp
````

2. Copy the `.env.example` of **graphql** and **webapp** folder to `.env` and configure it.

3. Run GraphQL Server (default: PORT 4000)

  ````bash
  npm run start-dev:graphql // Production mode
  npm run start:graphql // Development mode
  ````

4. Build and start Webapp Server (default: PORT 4010)

  * Production mode

  ````bash
  npm run build:webapp
  npm run start:webapp
  ````

  * Development mode

  ````bash
  npm run build-dev:webapp
  npm run start-dev:webapp
  ````

## Developers

  * [Adrián Velasco](https://github.com/adrivelasco)
  
---

Copyright © 2018.
