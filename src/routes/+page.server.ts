import { dataDB } from '$lib/db/db.server';

import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
export const load: PageServerLoad = async (event:any) => {
	if (!event.locals.user) redirect(302, '/auth/login');
	redirect(302, '/kit');
};
