// routes/signup/+page.server.ts
import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { authDB } from '$lib/db/db.server';
import { auth_user,user_session } from '$lib/db/schema';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		console.log(username)
		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username.toLowerCase())
		) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		// TODO: check if username is already used
		await authDB.insert(auth_user).values({
			id: userId,
			username: username.toLowerCase(),
			hashed_password: hashedPassword
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
