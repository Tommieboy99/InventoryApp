const { Router } = require("express");
const { manageController, createItem, createCategory, updateItem, updateCategory, deleteItem, deleteCategory} = require("../controllers/manageController");

const manageRouter = Router();

manageRouter.get("/", manageController);

manageRouter.post("/createItem", createItem);
manageRouter.post("/createCategory", createCategory);

manageRouter.post("/updateItem", updateItem);
manageRouter.post("/updateCategory", updateCategory)

manageRouter.post("/deleteItem", deleteItem)
manageRouter.post("/deleteCategory", deleteCategory)

module.exports = manageRouter;