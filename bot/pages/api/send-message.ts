import type { NextApiRequest, NextApiResponse } from "next";
import { findAnswer } from "../../utils/qa";

interface ApiResponse {
  reply: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message manquant" });
    }

    // Trouver la réponse à partir de la base de connaissances
    const reply = findAnswer(message);
    return res.status(200).json({ reply });
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}
