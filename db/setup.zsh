#! /usr/bin/env zsh

set -eEuo pipefail

# Move into db folder
cd db/

if [[ ! -z ${NODE_ENV+unset} ]]; then
    echo "NODE_ENV is set, exiting"
    exit 1
fi

# This should only run on localhost
export PGHOST=localhost
export PGDATABASE=fuze_app
export PGUSER=postgres
export PGPASSWORD=postgres
export PGPORT=5432

# Need to run sequelize-cli from db folder
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

cd -
