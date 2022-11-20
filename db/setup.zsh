#! /usr/bin/env zsh

set -eEuo pipefail

# Move into db folder
cd db/

if [[ ! -z ${NODE_ENV+unset} ]]; then
    echo "NODE_ENV is set, exiting"
    exit 1
fi

export PGHOST=tiny.db.elephantsql.com
export PGDATABASE=tqasymif
export PGUSER=tqasymif
export PGPASSWORD=TRRGtLnlM3QgqrlhfBVzfTpJuuV8Fq18
export PGPORT=5432

# Need to run sequelize-cli from db folder
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

cd -
