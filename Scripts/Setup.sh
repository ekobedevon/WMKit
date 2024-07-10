#!/bin/bash

# Database configuration

# Create the "Lucia" database
echo "Creating the $AUTH_DB_NAME database with $POSTGRES_USER.."
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "CREATE DATABASE $AUTH_DB_NAME;"

# Connect to the "Lucia" database
echo "Connect and setup $AUTH_DB_NAME database for username + password..."

# CREATE TYPE roles AS ENUM ('Admin', 'Moderator', 'User');
# Add above to below to add roles on instantiaion

psql -U $POSTGRES_USER -d $AUTH_DB_NAME -c "
-- Create the 'auth_user' table
CREATE TABLE auth_user (
    id TEXT PRIMARY KEY,
    username TEXT,
    hashed_password TEXT
);

-- Create the 'user_session' table
CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL REFERENCES auth_user(id)
);

"

echo "$AUTH_DB_NAME database setup complete."
echo "Creating the $DB_NAME database with $POSTGRES_USER.."

#Stage 2 setup general DB

psql -U $POSTGRES_USER -d $POSTGRES_DB -c "CREATE DATABASE $DB_NAME;"

echo "Connect and setup $DB_NAME database..."
psql -U $POSTGRES_USER -d $DB_NAME -c "
-- Create the 'sample' table
CREATE TABLE sample (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL

);
"

#sample data fill to test drizle
psql -U $POSTGRES_USER -d $DB_NAME -c "
INSERT INTO sample (id, name) VALUES
    ('1', 'John Doe'),
    ('2', 'Jane Smith'),
    ('3', 'Alice Johnson');
"

#change password
psql -U "$POSTGRES_USER" -c "ALTER USER \"$POSTGRES_USER\" WITH PASSWORD '$POSTGRES_PASSWORD';"