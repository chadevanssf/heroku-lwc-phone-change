# lwc-oss-phone-updater

Phone Updater for Heroku Connect with LWC OSS. Inspired by the original, [https://github.com/jamesward/heroku-connect-phone-change](https://github.com/jamesward/heroku-connect-phone-change)

## Dev Notes

The source files are located in the [`src`](./src) folder. All web components are within the [`src/client/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components. The entry file for the custom Express configuration can be found in the ['src/server'](./src/server) folder.

## Learnings

How did we build this?

Based on the ideas in this posting: [https://developer.salesforce.com/blogs/2020/12/how-i-built-a-christmas-app-with-node-js-lwc-oss-and-heroku.html](https://developer.salesforce.com/blogs/2020/12/how-i-built-a-christmas-app-with-node-js-lwc-oss-and-heroku.html)

In addition, we moved the Front End and Back End into one code base, patterned after how this project works: [https://devcenter.heroku.com/articles/mean-apps-restful-api](https://devcenter.heroku.com/articles/mean-apps-restful-api).

### LWC OSS

Create the LWC OSS app first: [https://lwc.dev/](https://lwc.dev/)

### Lightning Base Components

Layer in the Lightning Base Components so we don't have to recreate the world. See [https://developer.salesforce.com/blogs/2020/12/build-connected-apps-anywhere-using-lightning-base-components.html](https://developer.salesforce.com/blogs/2020/12/build-connected-apps-anywhere-using-lightning-base-components.html)

### Lightning Design System

You need to expose the SLDS on the HTML page, as well change the Shadow DOM to synthentic. You will also have to copy the css from the SLDS module to your distribution folder.

Add this to your 'lwc-services.config.js' file:

```javascript
module.exports = {
    resources: [
        ...
        {
            from: 'node_modules/@salesforce-ux/design-system/assets',
            to: 'dist/resources/assets/'
        },
        ...
    ],
```

### Add LWC OSS Recipes page styling

1. Grab the ui namespace in [https://github.com/trailheadapps/lwc-recipes-oss](https://github.com/trailheadapps/lwc-recipes-oss)

1. Adding in the Recipies UI components and entry in the lwc.config.json: [lwc-recipes-oss-ui-components](https://www.npmjs.com/package/lwc-recipes-oss-ui-components)

1. Install the styles and header info; likely you want the new styles to be imported after the SLDS.

### Combine Client and Server

Mapping the API location with the Client location like is set up in the default could be accomplished with instead merging the Express servers from Client and Server into one.

1. Setup server.js and api.js to switch on an env variable, like 'EMBEDDED_API' (values are 'separate' and 'embedded'):

1. Clean up package.json to ensure serve and watch still work:

    ```json
    {
        ...
        "serve": "EMBEDDED_API=embedded run-p serve:client serve:api",
        ...
        "watch": "EMBEDDED_API=separate run-p watch:client watch:server",
        ...
    }
    ```

### Add Heroku parts

1. Add a Procfile, see [https://devcenter.heroku.com/articles/procfile](https://devcenter.heroku.com/articles/procfile)

    ```sh
    web: yarn serve
    ```

1. Add an app.json, see [https://devcenter.heroku.com/articles/app-json-schema](https://devcenter.heroku.com/articles/app-json-schema)

1. Change the package.json build tasks:

    First install "per-env", see [https://github.com/ericclemmons/per-env](https://github.com/ericclemmons/per-env).

    WAS:

    ```json
    {
        ...
        "scripts": {
            ...
            "build": "lwc-services build -m production",
            "build:development": "lwc-services build",
            ...
        },
        ...
    }
    ```

    CHANGE:

    ```json
    {
        ...
        "scripts": {
            ...
            "build": "per-env",
            "build:production": "lwc-services build -m production",
            "build:development": "lwc-services build",
            ...
        },
        ...
    }
    ```

## Deploy Locally

1. Install the project dependencies using `yarn`

    ```sh
    yarn install
    ```

1. Start up your local Postgres:

    1. Setup using Heroku Postgres Local
       [https://devcenter.heroku.com/articles/heroku-postgresql#local-setup](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)

    1. Enable SSL
       You must have SSL enabled in your local psql for this to work. Suggested way to enable is found at [https://www.postgresql.org/docs/9.6/static/ssl-tcp.html](https://www.postgresql.org/docs/9.6/static/ssl-tcp.html) under Creating a Self-signed Certificate

    1. Install the database config

        ```sh
        createdb phone_updater
        cat ./data/init.sql | psql phone_updater
        ```

    1. Don't forget the DATABASE_URL env var!

        ```sh
        export DATABASE_URL=postgres://$(whoami)/phone_updater
        export DATABASE_URL=postgres://localhost/phone_updater
        export PGUSER=<username here>
        export PGPASSWORD=<password here>
        ```

1. Build the project

    ```sh
    yarn build
    ```

1. Start the app in watch mode

    ```sh
    yarn watch
    ```

## Deploy to Heroku

If you want to deploy to Heroku - there's a button for that.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
