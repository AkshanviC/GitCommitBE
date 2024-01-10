const express = require("express");
const router = express.Router();

// to get a commit
router.get("/", () => {
  console.log("API check");
});
router.get("/:owner/:repo/commits/:id", async (req, res) => {
  console.log(req.params, "data");
});

//to get a diff
router.get("/:owner/:repo/commits/:id/diff", async (req, res) => {});

module.exports = router;
