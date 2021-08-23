const fs = require("fs");
const axios = require("axios");
const TurndownService = require('turndown')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.convertHTMLtoMD = function (req, res, next) {
    if (!req._body) {
        res.json( {error: "No body supplied."} );
    } else {
        let keys = Object.keys(req.body);
        if (!keys.includes("html")) {
            res.json( {error: "No HTML as source defined"} );
        } else {
            let turndownService = new TurndownService();
            let md = turndownService.turndown(req.body.html);
            let filename = getRandomInt(10000) + ".md";

            fs.writeFile("public/tmp/" + filename, md, function(err) {
                if(err) {
                    res.json({ success: false });
                    return console.log(err);
                }
                console.log("The file was saved as " + filename);
                res.json({ success: true, fileURL: "tmp/" + filename });
            });
        }
    }
}