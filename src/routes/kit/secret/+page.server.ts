import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user)  redirect(302, '/auth/login');
	return {
		username: event.locals.user!.username
	};
};
