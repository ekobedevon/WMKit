import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const auth_user = pgTable('auth_user', {
	id: text('id').primaryKey(),
	username: text('username'),
	hashed_password: text('hashed_password')
});

export const user_session = pgTable('user_session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => auth_user.id)
});



export const sampleTable = pgTable('sample', {
	id: text('id').primaryKey(),
	name: text('name').notNull()
});
