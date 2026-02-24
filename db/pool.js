const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.DEV_DATABASE_URL;

module.exports = new Pool({
    connectionString,
});
