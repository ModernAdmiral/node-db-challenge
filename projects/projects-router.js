const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

router.get("/projects", (req, res) => {
  Projects.find()
    .then(projects => {
      const completedProjects = projects.map(project => {
        if (project.completed === 0) project.completed = false;
        else if (project.completed === 1) project.completed = true;
        return project;
      });

      res.status(200).json(completedProjects);
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
        const completedTasks = tasks.map(task => {
          if (task.completed === 0) task.completed = false;
          else if (task.completed === 1) task.completed = true;
          return task;
        });

        res.status(200).json(completedTasks);
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
