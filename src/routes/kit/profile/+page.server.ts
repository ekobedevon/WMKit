import { dataDB } from '$lib/db/db.server';
import { auth_user } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { redirect } from '@sveltejs/kit';
export const load: PageServerLoad = async (event: any) => {
	if (!event.locals.user) redirect(302, '/auth/login');
	return {
		username: event.locals.user!.username,
		role: event.locals.user!.role,
		icon: event.locals.user!.icon
	};
};

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const id = event.locals.user!.id;

		const formData = await event.request.formData();
		const display = formData.get('display') as string;
		const pronouns = formData.get('pronouns') as string;
		const icon = formData.get('icon') as string;

		try {
			await dataDB.update(auth_user).set({ display, icon, pronouns }).where(eq(auth_user.id, id));
		} catch (error) {
			console.error('Error update profile:', error);
		}

		redirect(302, `/`);
	}
};
