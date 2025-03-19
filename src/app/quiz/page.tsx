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
import { UserAnswersProps } from "../types/quiz.types";
import QuizCard from "./components/quiz-card";
import Link from "next/link";
import { useFetchQuiz } from "../hook/fetch-women";
import { PageTransition } from "@/components/common/page-transition";
import { motion } from "framer-motion";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerSelected, setAnswerSelected] = useState<null | string>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswersProps[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const { data: quizData, isLoading, isError } = useFetchQuiz();

  if (isLoading) return <PageTransition />;
  if (isError) return <div>Erro ao buscar os dados</div>;

  const quizSelectedQuestion = quizData?.[currentQuestion];
  const isLastQuestion = currentQuestion === (quizData?.length ?? 0) - 1;
  const disabledNextButton = answerSelected === null;

  const nextQuestion = () => {
    if (answerSelected === null) return;

    const isCorrect = quizSelectedQuestion?.answers.find(
      (a) => a.answer === answerSelected
    )?.isCorrect;

    setUserAnswers((prev) => [
      ...prev,
      {
        question: quizSelectedQuestion?.question,
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
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        {!quizFinished && (
          <QuizCard
            answerSelected={answerSelected}
            currentQuestion={currentQuestion}
            disabledNextButton={disabledNextButton}
            isLastQuestion={isLastQuestion}
            nextQuestion={nextQuestion}
            quiz={quizData ?? []}
            quizSelectedQuestion={
              quizSelectedQuestion || {
                question: "Carregando...",
                description: "",
                answers: [],
              }
            }
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
                de <span className="font-bold">{quizData?.length} </span>{" "}
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
    </motion.div>
  );
}
