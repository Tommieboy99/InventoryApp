const db = require("../db/queries");

async function manageController (req, res) {
    const mode = req.query.mode || "create";
    const itemId = Number(req.query.id);
    const items = await db.getItems();
    const categories = await db.getCategories();

    if ((mode === "edit" || mode === "delete") && itemId) {
        res.render("manage", { mode, items, itemId, categories })
    } else {
        res.render("manage", { mode, items, itemId, categories })
    }
}

async function createItem (req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const stock = req.body.stock;
    const category = req.body.category;

    await db.createItem(name, price, stock, category);
    res.redirect("/")
}

async function createCategory (req, res) {
    const name = req.body.name;

    await db.createCategory(name);
    res.redirect("/")
}

async function updateItem (req, res) {
    const id = req.body.name;
    const newName = req.body.newName;
    const newPrice = req.body.newPrice;
    const newStock = req.body.newStock;
    const newCategory = req.body.newCategory;

    let fields = [];
    let values = [];
    let index = 1;

    if (newName && newName.trim() !== "") {
        fields.push(`name = $${index++}`);
        values.push(newName);
    }

    if (newPrice && newPrice.trim() !== "") {
        fields.push(`price = $${index++}`);
        values.push(newPrice)
    }

    if (newStock && newStock.trim() !== "") {
        fields.push(`stock = $${index++}`);
        values.push(newStock);
    }

    if (newCategory !== "") {
        fields.push(`category_id = $${index++}`)
        values.push(newCategory)
    }

    values.push(id);

    db.updateItem(fields, values, index)
    res.redirect("/")
}

async function updateCategory (req, res) {
    const id = req.body.name;
    const newName = req.body.newName;

    await db.updateCategory(newName, id)
    res.redirect("/");
}

async function deleteItem (req, res) {
    
    const password = req.body.password;

    if (password !== process.env.ADMIN_PASSWORD) {
        console.log('wrong password')
        return;
    }

    const id = req.body.name;

    await db.deleteItem(id);
    res.redirect("/");
}

async function deleteCategory (req, res) {
    
    const password = req.body.password;

    if (password !== process.env.ADMIN_PASSWORD) {
        console.log('wrong password')
        return;
    }
    
    const id = req.body.name;

    await db.deleteCategory(id);
    res.redirect("/")
}

module.exports = {
    manageController,
    createItem,
    createCategory,
    updateItem,
    updateCategory,
    deleteItem,
    deleteCategory
}