import { Router } from "express";

const jobApplicationController = Router();

jobApplicationController.post("/apply_job/:id", (req, res) => {
  try {
    const id= req.params.id;
  } catch (error) {
    console.log("the error from posting job application is", error);
  }
});
