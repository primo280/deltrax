export function searchAnswer(content: string, question: string): string {
    const lowercasedContent = content.toLowerCase();
    const lowercasedQuestion = question.toLowerCase();
  
    // Rechercher la question dans le contenu
    const matchIndex = lowercasedContent.indexOf(lowercasedQuestion);
  
    if (matchIndex !== -1) {
      // Extraire une portion du texte autour de la correspondance
      const start = Math.max(0, matchIndex - 100);
      const end = Math.min(lowercasedContent.length, matchIndex + 300);
      return content.slice(start, end).trim();
    }
  
    // Réponse par défaut si aucune correspondance
    return "Je n'ai pas trouvé de réponse à votre question dans le document.";
  }
  