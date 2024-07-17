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
    id SERIAL PRIMARY KEY,
    author_id TEXT NOT NULL REFERENCES auth_user(id),
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    timestamp TIMESTAMP NOT NULL DEFAULT now()
);

-- Create admin invite
INSERT INTO invites (id, creator_id, max_uses) VALUES ('ADMIN', 'SYSTEM', 1);

EOSQL

# Change password
psql -U "$POSTGRES_USER" -c "ALTER USER \"$POSTGRES_USER\" WITH PASSWORD '$POSTGRES_PASSWORD';"
