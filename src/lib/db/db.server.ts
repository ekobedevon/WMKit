import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { PG_USER,PG_URL,PG_PASSWORD,DB_NAME, } from '$env/static/private'

// const authPGCredentials = postgres({
//     user:PG_USER,
//     database:AUTH_DB_NAME,
//     hostname: PG_URL,
//     port:5432,
//     password: PG_PASSWORD
// })

const dataPGCredentials = postgres({
	user: PG_USER,
	database: DB_NAME,
	hostname: PG_URL,
	port: 5432,
	password: PG_PASSWORD
});


export const dataDB = drizzle(dataPGCredentials);