const express = require("express");
const router = express.Router();
const atlassianController = require("../controllers/jira");

router.get("/boards", atlassianController.getAllBoards);
router.get("/sprints", atlassianController.getSprints);
router.post("/jql", atlassianController.searchJQL);

module.exports = router;