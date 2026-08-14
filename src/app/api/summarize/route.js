import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

/**
 * POST request to generate summary of the given Markdown content.
 * 
 * - Receives JSON payload with Markdown content.
 * - Validates and sanitizes input.
 * - Calls Gemini API for summarization.
 * - Returns structured summary.
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { content } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return Response.json(
        { error: 'No Markdown content provided for summarization.' },
        { status: 400 }
      );
    }

    if (content.length > 50000) {
      return Response.json(
        { error: 'Markdown document is too large to summarize (maximum 50,000 characters).' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable.');
      return Response.json(
        { error: 'AI service is currently unavailable. API key is not configured.' },
        { status: 500 }
      );
    }

    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    });

    const modelName = process.env.GOOGLE_GENERATIVE_AI_MODEL || 'gemini-2.5-flash';

    const prompt = `Summarize the following Markdown document in 3–5 concise bullet points.

Focus on the most important information, purpose, features, technical details, or conclusions.

Return only the bullet points.

Markdown:
${content}`;

    const { text } = await generateText({
      model: google(modelName),
      prompt: prompt,
    });

    if (!text || text.trim().length === 0) {
      return Response.json(
        { error: 'Empty response returned from AI provider.' },
        { status: 500 }
      );
    }

    // Process raw text into clean bullet point strings
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const bullets = lines
      .map((line) => line.replace(/^[\s•\-\*\d\.\)]+/, '').trim())
      .filter((bullet) => bullet.length > 0);

    const finalBullets = bullets.length > 0 ? bullets.slice(0, 5) : [text.trim()];

    return Response.json({ bullets: finalBullets });
  } catch (error) {
    console.error('Error generating summary:', error);
    return Response.json(
      { error: 'Unable to generate summary. Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
