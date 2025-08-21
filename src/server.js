import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { quiz } from "./db/schema.js";
import { eq } from "drizzle-orm";
import job from "./config/cron.js";

const app = express();

app.use(express.json());
if (ENV.NODE_ENV == "production") {
  job.start();
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/newquiz", async (req, res) => {
  const { quizName, quizMarks, quizSubject } = req.body;
  try {
    const newQuiz = await db.insert(quiz).values({
      quizName,
      quizMarks,
      quizSubject,
    });
    res.status(201).send({ message: "New Quiz Created Successfully !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error !" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const test = await db.delete(quiz).where(eq(quiz.id, id)).returning();
    if (test.length == 0) {
      res.status(404).send({ message: "Quiz Not Found" });
    }
    res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.select().from(quiz).where(eq(quiz.id, id));
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/getall", async (req, res) => {
  try {
    const allQuiz = await db.select().from(quiz);
    res.status(200).send(allQuiz);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { quizName, quizMarks, quizSubject } = req.body;
  try {
    const updatedQuiz = await db
      .update(quiz)
      .set({ quizName, quizMarks, quizSubject })
      .where(eq(quiz.id, id));
    res.status(200).send({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error ! " });
  }
});

app.listen(ENV.PORT, () => {
  console.log("Server is running on port 3000 : http://localhost:3000");
});
