async function test (req, res) {
    res.render("index", { message: "Hello, world!" });
}

module.exports = {
    test,
}