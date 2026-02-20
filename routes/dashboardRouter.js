const { Router } = require("express");
const { dashboardController, actionsController, addItemController, editItemController, deleteItemController} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", dashboardController);

indexRouter.get("/actions", actionsController);
indexRouter.get("/actions/addItem", addItemController);
indexRouter.get("/actions/editItem/:id", editItemController);
indexRouter.get("/actions/deleteItem/:id", deleteItemController);

module.exports = indexRouter;