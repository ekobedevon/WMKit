import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, serial, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('roles', ['Admin', 'Moderator', 'GM', 'Player']);

export const auth_user = pgTable('auth_user', {
	id: text('id').primaryKey(),
	username: text('username'),
	hashed_password: text('hashed_password'),
	display: text('display').notNull(),
	role: roleEnum('role').notNull().default('Player'),
	icon: text('icon').notNull().default('goblin-head'),
	pronouns: text('pronouns').notNull().default('')
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
	author: text('author_id')
		.notNull()
		.references(() => auth_user.id),
	title: text('title').notNull(),
	desc: text('description').default(''),
	timestamp: timestamp('timestamp', { mode: 'date' })
		.notNull()
		.default(sql`now()`)
});

export const games = pgTable('games', {
	id: serial('id').primaryKey(),
	author: text('author_id')
		.notNull()
		.references(() => auth_user.id),
	gm: text('gm_id')
		.notNull()
		.references(() => auth_user.id),
	min: integer('min_level').default(0),
	max: integer('max_level').default(100),
	title: text('title').notNull(),
	desc: text('description').default(''),
	selection: text('selection').default('First'),
	timestamp: timestamp('timestamp', { mode: 'date' })
		.notNull()
		.default(sql`now()`)
});

export const characters = pgTable('characters', {
	id: text('id').primaryKey(),
	owner: text('owner_id')
		.notNull()
		.references(() => auth_user.id),
	name: text('name').notNull(),
	level: integer('level').default(0),
	desc: text('description').default(''),
	timestamp: timestamp('timestamp', { mode: 'date' })
		.notNull()
		.default(sql`now()`)
});

export const signup = pgTable('signup', {
	id: text('id').primaryKey(),
	owner: text('owner_id')
		.notNull()
		.references(() => auth_user.id),
	game: text('game_id')
		.notNull()
		.references(() => games.id),
	character: text('character_id')
		.notNull()
		.references(() => characters.id),
	desc: text('description').default(''),
	timestamp: timestamp('timestamp', { mode: 'date' })
		.notNull()
		.default(sql`now()`)
});

export const comments = pgTable('comments', {
	id: serial('id').primaryKey(),
	owner: text('owner_id')
		.notNull()
		.references(() => auth_user.id),
	post: text('post_id')
		.notNull()
		.references(() => games.id),
	desc: text('description').notNull(),
	timestamp: timestamp('timestamp', { mode: 'date' })
		.notNull()
		.default(sql`now()`)
});
