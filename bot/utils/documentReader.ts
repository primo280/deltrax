import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

export async function extractTextFromPDF(filePath: string): Promise<string> {
  const absolutePath = path.resolve("./public", filePath);
  const dataBuffer = fs.readFileSync(absolutePath);

  const pdfData = await pdf(dataBuffer);
  return pdfData.text; // Contenu texte du PDF
}
