const express = require('express');
const fs = require('fs');
const path = require("path");

const app = express();
const PORT = 4000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/recipes', function(req, res) {
    try {
        const filePath = path.join(__dirname, 'test-recipes.json');
        const file = fs.readFileSync(filePath);
        const recipesJson = JSON.parse(file);

        res.json(recipesJson.recipes);
    } catch (err) {
        res.send("ERROR: " + err);
    }
});

app.listen(PORT, () => console.log("App started on port " + PORT));