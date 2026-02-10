const { Router } = require("express");
const { test } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", test);

module.exports = indexRouter;