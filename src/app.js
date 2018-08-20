const express = require('express');
const fs = require('fs');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/api/days', function(req, res) {
    try {
        const filePath = path.join(__dirname, 'test-days.json');
        const file = fs.readFileSync(filePath);
        const daysJson = JSON.parse(file);
        res.json(daysJson.days);
    } catch (err) {
        res.send("ERROR: " + err);
    }
})

app.post('/api/days', function(req, res) {
    try {
        const filePath = path.join(__dirname, 'test-days.json');
        fs.writeFile(filePath, JSON.stringify({days: req.body}), err => {if (err) { throw err }});

        res.send("Success");
    } catch (err) {
        res.send("ERROR: " + err);
    }
})

app.listen(PORT, () => console.log("App started on port " + PORT));