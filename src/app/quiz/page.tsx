"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { QUIZ_MOCK } from "../helpers/quiz";
import { UserAnswersProps } from "../types/quiz.types";
import QuizCard from "./components/quiz-card";
import Link from "next/link";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerSelected, setAnswerSelected] = useState<null | string>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswersProps[]>([]);
  const quizSelectedQuestion = QUIZ_MOCK[currentQuestion];
  const isLastQuestion = currentQuestion === QUIZ_MOCK.length - 1;
  const disabledNextButton = answerSelected === null;
  const [quizFinished, setQuizFinished] = useState(false);

  const nextQuestion = () => {
    if (answerSelected === null) return;

    const isCorrect = quizSelectedQuestion.answers.find(
      (a) => a.answer === answerSelected
    )?.isCorrect;

    setUserAnswers((prev) => [
      ...prev,
      {
        question: quizSelectedQuestion.question,
        selected: answerSelected,
        correct: !!isCorrect,
      },
    ]);

    if (isLastQuestion) {
      setQuizFinished(true);
    }

    if (!isLastQuestion) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswerSelected(null);
    }
  };

  return (
    <Container>
      {!quizFinished && (
        <QuizCard
          answerSelected={answerSelected}
          currentQuestion={currentQuestion}
          disabledNextButton={disabledNextButton}
          isLastQuestion={isLastQuestion}
          nextQuestion={nextQuestion}
          quiz={QUIZ_MOCK}
          quizSelectedQuestion={quizSelectedQuestion}
          setAnswerSelected={setAnswerSelected}
        />
      )}

      {quizFinished && (
        <Card>
          <CardHeader>
            <CardTitle>Quiz finalizado!</CardTitle>
            <CardDescription>
              Você acertou{" "}
              <span className="font-bold">
                {userAnswers.filter((a) => a.correct).length}
              </span>{" "}
              de <span className="font-bold">{QUIZ_MOCK.length} </span>{" "}
              perguntas.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {userAnswers.map((answer, index) => (
              <Card
                className={
                  answer.correct
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                }
                key={index}
              >
                <CardHeader>
                  <CardTitle>
                    {answer.correct ? "✅" : "❌"} {answer.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sua resposta:{" "}
                    <span className="font-bold">{answer.selected}</span>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Link href={"/"}>
              <Button variant="outline">
                <ArrowLeft size={18} /> Refazer Quiz
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </Container>
  );
}
