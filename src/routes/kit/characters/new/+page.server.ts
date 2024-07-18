import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { dataDB } from '$lib/db/db.server';
import { characters } from '$lib/db/schema';
import { nanoid } from 'nanoid';
import { redirect } from '@sveltejs/kit';
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const id = event.locals.user!.id;

		const formData = await event.request.formData();
		const name = formData.get('name') as string;
		const pronouns = formData.get('pronouns') as string;
		const about = formData.get('about') as string;
		const levelString = formData.get('level') as string;
		const level = parseInt(levelString)
		try {
			await dataDB.insert(characters).values({id:nanoid(),owner:id,name,level,desc:about})
		} catch (error) {
			console.error('Error update profile:', error);
		}

		redirect(302, `/`);
	}
};
