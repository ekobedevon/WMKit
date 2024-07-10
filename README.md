# Starter Repo

This repo is a simple template developed by ekobedevon for use in web projects. It is configured for a simple web app that uses basic username/password combination for authentication.

## Purpose

This repo expects you to redo the HTML and CSS for the pages, move them around, and just mess with stuff. This is just to get started with the back end basics already configured.

## Stack info

The stack contains the following: Sveltekit, Tailwind, Postgres, Lucia, DrizzleORM. This stack currently requires Node 20, CloudFlare Workers, Deno, Bun, or Vercel Edge Functions or the use of [polyfill](https://lucia-auth.com/getting-started/) as per Lucia docs.

## Creating a project

To start after [forking](https://github.com/ekobedevon/STPLDStarter/fork) the repo, run

`npm install`

after running that be sure to start the docker container wiht

`docker compose up`

for the PGSQL database as you will get errors if it is offline. This will create the pgdata volume to store your data so it persists between resets. You can delete the folder to refresh the database. The initial tables are created with the Setup.sh file in /Scripts which runs when the container is started fresh.

`npm run check`

you might get the following error for the pgdata folder for postgres data

`EACCES: permission denied`

you can ignore this or remove the volume from the docker compose. Note this will mean if you rebuild the container your data will be lost.

## Running the project

Simply run

`npm run dev`
