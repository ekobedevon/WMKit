// routes/signup/+page.server.ts
import { codeCheck, lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { dataDB } from '$lib/db/db.server';
import { auth_user } from '$lib/db/schema';


import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const verifyCode = formData.get('code') as string;
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		
		const valid = await codeCheck(verifyCode)

		if(valid){
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
			const baseRole =
				((await codeCheck(verifyCode)) && verifyCode) === 'ADMIN' ? 'Admin' : 'Player';
			// TODO: check if username is already used
			await dataDB.insert(auth_user).values({
				id: userId,
				username: username.toLowerCase(),
				hashed_password: hashedPassword,
				role: baseRole
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			redirect(302, '/');
		}
		return fail(400, {
			message: 'Invalid Code'
		});
	}
};
