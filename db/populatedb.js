const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS item (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    category_id INTEGER NOT NULL
        REFERENCES category(id)
        ON DELETE RESTRICT
);

INSERT INTO category (name)
VALUES ('Uncategorized'), ('Test Category');

INSERT INTO item (name, price, stock, category_id)
VALUES ('Nothing', 0, 0, 1), ('Test 1', 5000, 10, 2), ('Test 2', 99.99, 400, 2), ('Test 3', 3999.99, 20, 2);

`;

const connectionString = process.argv[2];

async function main() {
    console.log("seeding...");
    console.log(connectionString);

    const client = new Client({
        connectionString,
    });
    
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();