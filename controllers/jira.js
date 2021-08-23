const axios = require("axios");

exports.searchJQL = function(req, res, next) {
    if (!req._body) {
        res.json( {error: "No body supplied."} );
    } else {
        let userMail = "karaman@crowddesk.de";
        let apiToken = "GObLSA7f69jIQPbKGF1A5F0C";
        let userDataAsBase64 = Buffer.from(userMail + ":" + apiToken).toString("base64");
        let keys = Object.keys(req.body);

        if (!keys.includes("jql")) {
            res.json({ error: "No JQL for request passed." })
        } else {
            try {
                axios.post("https://crowddeskdev.atlassian.net" + "/rest/api/2/search",
                    {
                        "expand": ["names"],
                        "jql": req.body.jql,
                        "maxResults": 300,
                        "fieldsByKeys": false,
                        "fields": ["*all"],
                        "startAt": 0
                    },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "X-Atlassian-Token": "nocheck",
                            "Authorization": `Basic ${userDataAsBase64}`
                        }
                    })
                    .then(response => {
                        res.json({success: true, data: response.data.issues});

                    })
                    .catch(error => {
                        res.json({success: false, data: error.response.data.errorMessages.join(", ")});
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }
}

exports.getAllBoards = function(req, res, next) {
    let userMail = "karaman@crowddesk.de";
    let apiToken = "GObLSA7f69jIQPbKGF1A5F0C";
    let userDataAsBase64 = Buffer.from(userMail + ":" + apiToken).toString("base64");

    try {
        axios.get("https://crowddeskdev.atlassian.net" + "/rest/agile/1.0/board",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-Atlassian-Token": "nocheck",
                    "Authorization": `Basic ${userDataAsBase64}`
                }
            })
            .then(response => {
                res.json({success: true, data: response.data.values});

            })
            .catch(error => {
                res.json({success: false, data: error.response.data.errorMessages.join(", ")});
            })
    } catch (error) {
        console.log(error);
    }
}

exports.getSprints = function(req, res, next) {
    let userMail = "karaman@crowddesk.de";
    let apiToken = "GObLSA7f69jIQPbKGF1A5F0C";
    let userDataAsBase64 = Buffer.from(userMail + ":" + apiToken).toString("base64");
    let keys = Object.keys(req.body);

    try {
        axios.get("https://crowddeskdev.atlassian.net" + "/rest/agile/1.0/board/" + req.query.boardId + "/sprint",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-Atlassian-Token": "nocheck",
                    "Authorization": `Basic ${userDataAsBase64}`
                }
            })
            .then(response => {
                res.json({success: true, data: response.data.values});

            })
            .catch(error => {
                res.json({success: false, data: error.response.data.errorMessages.join(", ")});
            })
    } catch (error) {
        console.log(error);
    }
}