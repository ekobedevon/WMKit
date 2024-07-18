import type { PageServerLoad } from './$types';
import { dataDB } from '$lib/db/db.server';
import { auth_user, characters } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event: any) => {
	if (!event.locals.user) redirect(302, '/');
	if (event.locals.user) {
		const id = event.locals.user.id;
		const userData = await dataDB.select().from(auth_user).where(eq(auth_user.id, id));

		const characterData = await dataDB.select().from(characters).where(eq(characters.owner, id));

		const user = userData[0];
		const { icon, username, role, display, pronouns } = user;
		return {
			characterData,
			userData: { icon, username, role, display, pronouns }
		};
	} else {
		return { icon: 'ogre', username: 'error', role: 'Player' };
	}
};
