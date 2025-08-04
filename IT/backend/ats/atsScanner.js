const fs = require("fs");
const pdfParse = require("pdf-parse");

// Extracts plain text from uploaded PDF or DOCX resumes
async function extractTextFromFile(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const parsed = await pdfParse(dataBuffer);
  return parsed.text;
}

// Calculates a simple keyword match score
function calculateMatchScore(resumeText, keywords) {
  const lowerResume = resumeText.toLowerCase();
  let matchCount = 0;
  keywords.forEach(keyword => {
    if (lowerResume.includes(keyword.toLowerCase())) {
      matchCount++;
    }
  });
  return Math.round((matchCount / keywords.length) * 100);
}

module.exports = { extractTextFromFile, calculateMatchScore };
