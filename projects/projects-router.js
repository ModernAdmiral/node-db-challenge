const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

router.get("/projects", (req, res) => {
  Projects.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to get projects" });
    });
});

router.post("/projects", (req, res) => {
  Projects.add(req.body)
    .then(project => {
      res.status(201).json({ message: "Project added", project });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to add project" });
    });
});

router.get("/projects/:id/tasks", (req, res) => {
  const id = req.params.id;

  Projects.findTasks(id)
    .then(tasks => {
      if (tasks.length) {
        res.status(200).json(tasks);
      } else {
        res
          .status(404)
          .json({ message: "Could not find tasks for given project" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get tasks" });
    });
});

router.post("/projects/:id/tasks", (req, res) => {
  const taskData = req.body;
  const { id } = req.params;

  Projects.findById(id)
    .then(project => {
      if (project) {
        Projects.addTask(taskData, id).then(task => {
          res.status(201).json(task);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new task" });
    });
});

module.exports = router;
