import { dataDB } from '$lib/db/db.server';
import { characters } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions, RequestEvent } from './$types';

export const load = (async (event) => {
	if (!event.locals.user) redirect(302, '/kit/home');
	const userID = event.locals.user?.id;
	const charactersData = await dataDB
		.select()
		.from(characters)
		.where(and(eq(characters.id, event.params.id), eq(characters.owner, userID)));
	if (charactersData.length === 0) redirect(302, '/kit/home');

	return {
		character: charactersData[0]
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const id = event.locals.user!.id;

		const formData = await event.request.formData();
		const name = formData.get('name') as string;
		const pronouns = formData.get('pronouns') as string;
		const about = formData.get('about') as string;
		const levelString = formData.get('level') as string;
		const level = parseInt(levelString);
		try {
			await dataDB
				.update(characters)
				.set({ owner: id, name, level, desc: about, pronouns })
				.where(and(eq(characters.id, event.params.id), eq(characters.owner, id)));
		} catch (error) {
			console.error('Error update user:', error);
		}

		redirect(302, `/`);
	}
};
