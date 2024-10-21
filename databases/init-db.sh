#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '$POSTGRES_DB') THEN
            CREATE DATABASE $POSTGRES_DB;
        END IF;
    END
    \$\$;

    CREATE USER IF NOT EXISTS $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;
EOSQL

# Start PostgreSQL in the foreground
exec postgres -D /var/lib/postgresql/data