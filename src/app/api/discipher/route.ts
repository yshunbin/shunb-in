import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: Request) {
  try {
    const { clientName, discType, painPoint, useLocalTone } = await request.json();

    if (!apiKey) {
      // Fallback if no API key is provided so the app doesn't completely crash for testing
      return NextResponse.json({
        error: "GEMINI_API_KEY is not set in environment variables. Please add it to your .env file."
      }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const toneDescription = useLocalTone 
      ? "warm, friendly, conversational Singaporean Financial Advisor style (can include subtle local warmth like 'Hey', casual professional vibe)" 
      : "professional, formal, polite financial advisor style";

    const discContexts: Record<string, string> = {
      D: "Dominant: Direct, results-driven, bottom-line focused, hates fluff, values time and ROI.",
      I: "Influential: Enthusiastic, social, relationship-driven, big-picture thinker, focuses on lifestyle, status, and peer success.",
      S: "Steady: Patient, safety-conscious, risk-averse, warm, values security, family protection, and low-pressure step-by-step guidance.",
      C: "Conscientious: Analytical, detail-oriented, data-driven, cautious, wants facts, numbers, systematic evaluation, and proof."
    };

    const prompt = `
You are an expert Financial Advisor copywriter. Generate exactly 3 distinct, high-conversion WhatsApp outreach message variations to secure an appointment.

Client Name: ${clientName || "there"}
DISC Profile: ${discType} - ${discContexts[discType]}
Pain Point / Topic: ${painPoint}
Tone: ${toneDescription}

Rules:
1. Return ONLY a valid JSON array of 3 strings (e.g., ["message 1", "message 2", "message 3"]).
2. Do not include markdown code blocks (like \`\`\`json) or any extra text, just the raw JSON array.
3. Make sure each message is tailored specifically to the DISC profile's psychology and the chosen pain point.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Clean up potential markdown formatting if the model adds it
    let cleanJson = responseText;
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const messages = JSON.parse(cleanJson);

    return NextResponse.json({ messages });
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate messages.";
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 });
  }
}
