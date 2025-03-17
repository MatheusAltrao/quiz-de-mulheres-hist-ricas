import { useQuery } from "@tanstack/react-query";

export const useFetchQuiz = () => {
  return useQuery({
    queryKey: ["quizData"],
    queryFn: async () => {
      const response = await fetch(
        "https://apis.codante.io/api/legado-feminino/women"
      );
      if (!response.ok) throw new Error("Erro ao buscar os dados");
      const data = await response.json();
      console.log(data.data);
      return generateQuizQuestions(data.data);
    },
  });
};

const generateQuizQuestions = (data: any[]) => {
  const shuffledData = shuffleArray(data).slice(0, 5);

  const getRandomOptions = (correctAnswer: string, allNames: string[]) => {
    let options = allNames.filter((name) => name !== correctAnswer);
    options = shuffleArray(options).slice(0, 3);
    return shuffleArray([correctAnswer, ...options]);
  };

  return shuffledData.map((item) => ({
    question: item.contribuicao,
    description: "Selecione a resposta correta.",
    answers: getRandomOptions(
      item.nome,
      data.map((d) => d.nome)
    ).map((answer) => ({
      answer,
      isCorrect: answer === item.nome,
    })),
  }));
};

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};
