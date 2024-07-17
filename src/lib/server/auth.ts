// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { auth_user, user_session, verifyCode } from '$lib/db/schema';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { dataDB } from '$lib/db/db.server';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
const adapter = new DrizzlePostgreSQLAdapter(dataDB, user_session, auth_user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
			display: attributes.display,
			role: attributes.role,
			icon: attributes.icon,
			pronouns: attributes.pronouns
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
	display: string;
	role: string;
	icon: string;
	pronouns: string;
}

export const createCode = async (id: string, max_uses: number) => {
	await dataDB.insert(verifyCode).values({ id: nanoid(), creator: id, max: max_uses });
};

export const codeCheck = async (id: string): Promise<boolean> => {
	const response = await dataDB
		.select({ id: verifyCode.id })
		.from(verifyCode)
		.where(eq(verifyCode.id, id));

	if (response.length === 0) return false;
	return true;
};

export const codeUpdate = async (id: string) => {
	const response = await dataDB.select().from(verifyCode).where(eq(verifyCode.id, id));

	if (response.length !== 0) {
		if (response[0].uses + 1 >= response[0].max) {
			await dataDB.delete(verifyCode).where(eq(verifyCode.id, id));
		} else {
			await dataDB
				.update(verifyCode)
				.set({ uses: response[0].uses + 1 })
				.where(eq(verifyCode.id, id));
		}
	}
};
