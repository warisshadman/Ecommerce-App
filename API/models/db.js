const pg = require('pg');

const createClient = async function () {
  const connectionString = `postgres://postgres:admin@localhost:5432/arch`
  return new pg.Client(connectionString)
}

exports.createClient = createClient;