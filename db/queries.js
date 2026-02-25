const pool = require('./pool');

async function getItemCount(category) {
    if (!category) {
        const { rows } = await pool.query("SELECT COUNT(*) FROM item")
        const [{ count: total }] = rows;
        return total;
    } else {
        const { rows } = await pool.query("SELECT COUNT(*) FROM item i JOIN category c ON i.category_id = c.id WHERE c.name ILIKE $1", [category])
        const [{ count: total }] = rows;
        return total;
    }
}

async function getCategoryCount(category) {
    if (!category) {
        const { rows } = await pool.query("SELECT COUNT(DISTINCT i.category_id) FROM item i JOIN category c ON i.category_id = c.id ")
        const [{ count: total }] = rows;
        return total;
    } else {
        const { rows } = await pool.query("SELECT COUNT(DISTINCT i.category_id) FROM item i JOIN category c ON i.category_id = c.id WHERE c.name ILIKE $1", [category])
        const [{ count: total }] = rows;
        return total;
    }
}

async function getItemsOutOfStock(category) {
    if (!category) {
        const { rows } = await pool.query("SELECT COUNT(stock) FROM item WHERE stock = 0");
        const [{ count: total }] = rows;
        return total;
    } else {
        const { rows } = await pool.query("SELECT COUNT(stock) FROM item i JOIN category c ON i.category_id = c.id WHERE c.name ILIKE $1 AND stock = 0", [category])
        const [{ count: total }] = rows;
        return total;
    }
}

async function getTotalStockValue(category) {
    if (!category ) {
        const { rows } = await pool.query("SELECT SUM(price * stock) FROM item");
        const [{ sum: total }] = rows;
        if (!total) return "0.00";
        return total;
    } else {
        const { rows } = await pool.query("SELECT SUM(price * stock) FROM item i JOIN category c ON i.category_id = c.id WHERE c.name ILIKE $1", [category])
        const [{ sum: total }] = rows;
        if (!total) return "0.00";
        return total;
    }
}

async function getCategories() {
    const { rows } = await pool.query("SELECT * FROM category c")
    return rows;
}

async function getItems(query) {
    if (!query) {
        const { rows } = await pool.query("SELECT i.id, i.name, i.price, i.stock, c.name AS category_name FROM item i JOIN category c ON i.category_id = c.id");
        return rows;
    } else {
        const { rows } = await pool.query("SELECT i.id, i.name, i.price, i.stock, c.name AS category_name FROM item i JOIN category c ON i.category_id = c.id WHERE c.name ILIKE $1", [query]);
        return rows;
    }
}

async function getItemNameOnId(id) {
    const { rows } = await pool.query("SELECT i.name FROM items i WHERE i.id = $1", [id])
    return rows[0];
}

async function createItem(name, price, stock, category) {
    const { rows } = await pool.query("SELECT id FROM category WHERE name = $1", [category])
    const [ { id: categoryId} ] = rows;
    await pool.query("INSERT INTO item (name, price, stock, category_id) VALUES ($1, $2, $3, $4)", [name, price, stock, categoryId]);
}

async function createCategory(name) {
    await pool.query("INSERT INTO category (name) VALUES ($1)", [name]);
}

async function updateCategory(newName, id) {
    await pool.query(`UPDATE category SET name = $1 WHERE id = $2`, [newName, id])
}

async function updateItem(fields, values, index) {
    await pool.query(`UPDATE item SET ${fields.join(", ")} WHERE id = $${index}`, values)
}

async function deleteItem(id) {
    await pool.query("DELETE FROM item WHERE id = $1", [id]);
}

async function deleteCategory(id) {
    await pool.query("UPDATE item SET category_id = 1 WHERE category_id = $1", [id])
    await pool.query("DELETE FROM category WHERE id = $1", [id]);
}

module.exports = {
    getItemCount,
    getCategoryCount,
    getItemsOutOfStock,
    getTotalStockValue,
    getCategories,
    getItems,
    getItemNameOnId,
    createItem,
    createCategory,
    updateCategory,
    updateItem,
    deleteItem,
    deleteCategory
}