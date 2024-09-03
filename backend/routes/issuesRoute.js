import express from "express";
import { Issue } from "../models/issueModel.js";

const router = express.Router();

// GET ALL ISSUES
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.send(issues);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET SINGLE ISSUE BY ID
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findOne({ id: req.params.id });
    if (!issue) {
      return res.status(404).send({ error: "Issue not found" });
    }
    res.send(issue);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// CREATE NEW ISSUE
router.post("/", async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    console.log("Created new issue: ", newIssue);
    res.status(201).send(newIssue);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
