import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const quiz = pgTable("quiz", {
  id: serial("id").primaryKey(),
  quizName: text("quizName").notNull(),
  quizMarks: integer("quizMarks").notNull(),
  quizSubject: text("quizSubject"),
  quizCreated: timestamp("quizCreated").defaultNow(),
});
