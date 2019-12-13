const express = require("express");

const Resources = require("./resources-model.js");

const router = express.Router();

router.get("/resources", (req, res) => {
  Resources.find()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to get resources" });
    });
});

router.post("/resources", (req, res) => {
  Resources.add(req.body)
    .then(resource => {
      res.status(201).json({ message: "resource added", resource });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to add resource" });
    });
});

module.exports = router;
