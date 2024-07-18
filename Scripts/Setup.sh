#!/bin/bash

# Database configuration

# Stage 1: Create the "WMKit" database
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "CREATE DATABASE \"$DB_NAME\";"

echo "Connect and setup $DB_NAME database..."
psql -U "$POSTGRES_USER" -d "$DB_NAME" <<EOSQL

CREATE TYPE roles AS ENUM ('Admin', 'Moderator', 'GM', 'Player');

-- Create the 'auth_user' table
CREATE TABLE auth_user (
    id TEXT PRIMARY KEY,
    username TEXT,
    hashed_password TEXT,
    display TEXT NOT NULL,
    role roles NOT NULL DEFAULT 'Player',
    icon TEXT NOT NULL DEFAULT 'goblin-head',
    pronouns TEXT NOT NULL DEFAULT ''
);

-- Create the 'user_session' table
CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL REFERENCES auth_user(id)
);

-- Create the 'invites' table
CREATE TABLE invites (
    id TEXT PRIMARY KEY,
    creator_id TEXT NOT NULL,
    uses INT DEFAULT 0,
    max_uses INT DEFAULT 10
);

-- Create the 'posts' table
CREATE TABLE posts (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL REFERENCES auth_user(id),
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    timestamp TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the 'games' table
CREATE TABLE games (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL REFERENCES auth_user(id),
    gm_id TEXT NOT NULL REFERENCES auth_user(id),
    status TEXT NOT NULL
    min_level INT DEFAULT 0,
    max_level INT DEFAULT 100,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    selection TEXT DEFAULT 'First',
    timestamp TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the 'characters' table
CREATE TABLE characters (
    id TEXT PRIMARY KEY,
    owner_id TEXT NOT NULL REFERENCES auth_user(id),
    name TEXT NOT NULL,
    level INT DEFAULT 0,
    description TEXT DEFAULT '',
    timestamp TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the 'signup' table
CREATE TABLE signup (
    id SERIAL PRIMARY KEY,
    owner_id TEXT NOT NULL REFERENCES auth_user(id),
    game_id TEXT NOT NULL REFERENCES games(id),
    character_id TEXT NOT NULL REFERENCES characters(id),
    description TEXT DEFAULT '',
    timestamp TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the 'comments' table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    owner_id TEXT NOT NULL REFERENCES auth_user(id),
    post_id TEXT NOT NULL REFERENCES posts(id),
    description TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT now()
);

-- Create admin invite
INSERT INTO invites (id, creator_id, max_uses) VALUES ('ADMIN', 'SYSTEM', 1);

EOSQL

# Change password
psql -U "$POSTGRES_USER" -c "ALTER USER \"$POSTGRES_USER\" WITH PASSWORD '$POSTGRES_PASSWORD';"
