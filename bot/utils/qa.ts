import { knowledgeBase } from "../data/qa";

export function findAnswer(question: string): string {
  const lowercasedQuestion = question.toLowerCase();

  // Recherche exacte
  const exactMatch = knowledgeBase.find(
    (qa) => qa.question.toLowerCase() === lowercasedQuestion
  );
  if (exactMatch) return exactMatch.answer;

  // Réponse par défaut si aucune correspondance n'est trouvée
  return "Désolé, je ne comprends pas votre question. Pouvez-vous reformuler ?";
}
