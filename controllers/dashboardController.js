const db = require('../db/queries');

async function dashboardController (req, res) {
    const category = req.query.category;

    if (!category || category === 'all') {
        const totalItems = await db.getItemCount();
        const totalCategories = await db.getCategoryCount();
        const totalOutOfStock = await db.getItemsOutOfStock();
        const totalStockValue = await db.getTotalStockValue();
        const categories = await db.getCategories()
        const items = await db.getItems();

        res.render("dashboard", { totalItems, totalCategories, totalOutOfStock, totalStockValue, items, categories, selectedCategory: "all" });

    } else {
        const totalItems = await db.getItemCount(category);
        const totalCategories = await db.getCategoryCount(category);
        const totalOutOfStock = await db.getItemsOutOfStock(category);
        const totalStockValue = await db.getTotalStockValue(category);
        const categories = await db.getCategories();
        const items = await db.getItems(category)

        res.render("dashboard", { totalItems, totalCategories, totalOutOfStock, totalStockValue, items, categories, selectedCategory: category });
    }
}

module.exports = {
    dashboardController
}