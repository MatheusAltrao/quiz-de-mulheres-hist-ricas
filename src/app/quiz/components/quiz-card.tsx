import { QuizProps } from "@/app/types/quiz.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface QuizCardProps {
  currentQuestion: number;
  setAnswerSelected: (answer: string) => void;
  quizSelectedQuestion: QuizProps | undefined;
  answerSelected: string | null;
  nextQuestion: () => void;
  isLastQuestion: boolean;
  disabledNextButton: boolean;
  quiz: QuizProps[];
}

export default function QuizCard({
  answerSelected,
  currentQuestion,
  disabledNextButton,
  isLastQuestion,
  nextQuestion,
  quizSelectedQuestion,
  quiz,
  setAnswerSelected,
}: QuizCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {currentQuestion + 1}. {quizSelectedQuestion?.question}
        </CardTitle>
        <CardDescription>{quizSelectedQuestion?.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {quizSelectedQuestion?.answers.map((answer, index) => (
          <Button
            onClick={() => setAnswerSelected(answer.answer)}
            key={index}
            variant={answerSelected === answer.answer ? "default" : "outline"}
          >
            {answer.answer}
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground ">
          {currentQuestion + 1} pergunta de {quiz.length}
        </p>
        <div className="flex items-center gap-2 justify-end">
          <Button disabled={disabledNextButton} onClick={nextQuestion}>
            {!isLastQuestion && (
              <div className="flex items-center gap-2">
                Próxima <ArrowRight size={20} />
              </div>
            )}
            {isLastQuestion && "Finalizar"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
