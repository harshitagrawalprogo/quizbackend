CREATE TABLE "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"quizName" text NOT NULL,
	"quizMarks" integer NOT NULL,
	"quizSubject" text,
	"quizCreated" timestamp DEFAULT now()
);
