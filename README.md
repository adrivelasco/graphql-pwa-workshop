# GraphQL PWA Workshop

This repo was created for a workshop of how to create an Universal Application with `Nodejs` + `Reactjs` and connect our UI to a `GraphQL` API Server running in parallel with `Apollo`, using modern tools such as `Material-UI@Next`, `Webpack`, `Babel` and `PostCSS`. 

### `/api` directory

GraphQL API Server based on `graphql-yoga`.

### `/web` features

Progressive Web Application built with `nodejs/express`, `reactjs`, `graphql`, `apollo-server` (server-side-rendering) and `apollo-client` for connet the UI with our GraphQ server. I decide use `material-ui@next` for UI design.

## Requirements

  * Mac OS X, Windows, or Linux
  * [Node.js](https://nodejs.org/) v9.0 or newer
  * Text editor or IDE pre-configured with React/JSX/ESlint

## Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
│
├── /api/                       # GraphQL Server API
│   ├── /node_modules/          # 3rd-party libraries and utilities
│   ├── /src/                   # Proyect Source code
│   │   ├── /config/            # Server configurations
│   │   ├── /resolvers/         # Query and Mutations resolve functions
│   │   ├── index.js            # Startup script
│   │   ├── schema.graphql      # API Schema
│   │   └── server.js           # Setup
│   ├── .env                    # Custom enviroment variables
│   └── package.json            # The list of 3rd party libraries and utilities
│
├── /web/                       # Universal React.js Application
│   ├── /node_modules/          # 3rd-party libraries and utilities
│   ├── /src/                   # Project source code
│   │   ├── /build/             # The folder for compiled output for client scripts
│   │   ├── /client/            # Client configuration and entry point
│   │   ├── /server/            # Nodejs + Express and SSR
│   │   ├── /ui/                # React.js Componentes and Views
│   │   ├── /core/              # Other core framework modules
│   │   └── /queries/           # GraphQL queries for data
│   ├── /tools/                 # Build automation scripts and utilities
│   │   ├── /scripts/           # Library for utility snippets
│   │   ├── /postcss/           # Configuration for transforming styles with PostCSS plugins
│   │   └── /webpack/           # Configurations for client-side bundle
│   ├── .env                    # Custom enviroment variables
│   └── package.json            # The list of 3rd party libraries and utilities
```

## Getting Started

1. Clone the repo and install dependencies

````bash
git clone git@github.com:adrivelasco/graphql-pwa-workshop.git
cd graphql-pwa-workshop
npm install -g webpack nodemon
npm run install:api
npm run install:web
````

2. Copy the `.env.example` of **graphql** and **web** folder to `.env` and configure it.

3. Run GraphQL Server (default: PORT 4000)

  ````bash
  npm run start-dev:api // Production mode
  npm run start:api // Development mode
  ````

4. Build and start Web Server (default: PORT 4010)

  * Production mode

  ````bash
  npm run build:web
  npm run start:web
  ````

  * Development mode

  ````bash
  npm run build-dev:web
  npm run start-dev:web
  ````

## Developers

  * [Adrián Velasco](https://github.com/adrivelasco)
  
---

Copyright © 2018.
