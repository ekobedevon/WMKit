import {dataDB} from "$lib/db/db.server"
import {sampleTable} from "$lib/db/schema"
import type {PageServerLoad} from './$types'

export const load = (async () => {
	const result = await dataDB.select().from(sampleTable);
	return {
		result
	};
}) satisfies PageServerLoad;