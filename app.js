const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded( { extended: true} ));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    
    console.log(`Inventory App - listening on port ${PORT}!`)
})