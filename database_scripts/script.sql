-- set schema to ledger
set schema 'ledger';

-- create user table if does not exist
create table if not exists "users" (id uuid default gen_random_uuid() primary key,
firstName VARCHAR(25),
lastName VARCHAR(25),
email VARCHAR(40),
password VARCHAR(255),
createdAt timestamp,
updatedAt timestamp);