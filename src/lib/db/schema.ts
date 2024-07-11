import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, serial, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('roles', ['Admin', 'Moderator', 'GM', 'Player']);

export const auth_user = pgTable('auth_user', {
	id: text('id').primaryKey(),
	username: text('username'),
	hashed_password: text('hashed_password'),
	role:roleEnum('role').notNull().default('Player')
});

export const user_session = pgTable('user_session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => auth_user.id)
});

export const verifyCode = pgTable('invites', {
	id: text('id').primaryKey(),
	creator: text('creator_id').notNull(),
	uses: integer('uses').default(0).notNull(),
	max: integer('max_uses').default(0).notNull()
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	author: text('author_id').notNull(),
	title: text('title').notNull(),
	desc: text('description').default(''),
	timestamp: timestamp('timestamp', { mode: 'date' })
		.notNull()
		.default(sql`now()`)
});

export const sampleTable = pgTable('sample', {
	id: text('id').primaryKey(),
	name: text('name').notNull()
});
