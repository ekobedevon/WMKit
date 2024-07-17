import type { PageServerLoad } from './$types';
import { dataDB } from '$lib/db/db.server';
import { auth_user } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event: any) => {
	if (!event.locals.user) redirect(302, '/');
	if (event.locals.user) {
		const userData = await dataDB
			.select()
			.from(auth_user)
			.where(eq(auth_user.id, event.locals.user.id));

		const user = userData[0];
		const { icon, username, role, display, pronouns } = user;
		return {
			icon,
			username,
			role,
			display,
			pronouns
		};
	} else {
		return { icon: 'ogre', username: 'error', role: 'Player' };
	}
};
