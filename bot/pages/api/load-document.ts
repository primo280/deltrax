import type { NextApiRequest, NextApiResponse } from "next";
import { extractTextFromPDF } from "../../utils/documentReader";

let documentContent = "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Charge le fichier PDF et extrait le texte
      documentContent = await extractTextFromPDF("documents/document.pdf");
      res.status(200).json({ message: "Document chargé avec succès !" });
    } catch (error) {
      console.error("Erreur lors du chargement du document :", error);
      res.status(500).json({ error: "Impossible de charger le document." });
    }
  } else if (req.method === "GET") {
    // Retourne le contenu chargé
    if (!documentContent) {
      return res.status(400).json({ error: "Aucun document chargé." });
    }
    res.status(200).json({ content: documentContent });
  } else {
    res.status(405).json({ error: "Méthode non autorisée." });
  }
}
