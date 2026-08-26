export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    question,
    context = [],
    routines = {},
  } = req.body || {};

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Question is required" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: "OPENAI_API_KEY is not configured.",
    });
  }

  const recentLogs = Array.isArray(context)
    ? context.slice(-25)
    : [];

  const instructions = `
You are the AI Coach inside a personal mobility and light exercise app.

The user's routines focus on:
- golf mobility
- snowboarding mobility
- tight shoulders
- neck mobility
- ankle mobility
- light bodyweight strength
- morning, night, and office routines

Your job:
- answer questions about the routines
- use recent workout logs when helpful
- recommend gradual progressions
- recommend exercise swaps when appropriate
- explain technique clearly
- explain breathing cues
- help identify patterns such as exercises that repeatedly feel too easy or too difficult

Important safety rules:
- Never diagnose an injury or medical condition.
- Do not encourage forcing the neck, spine, or joints into range.
- If the user reports severe pain, new weakness, numbness, tingling, significant trauma, or worsening neurological symptoms, recommend appropriate medical evaluation.
- Prefer consistency and gradual progression over intensity.
- When recommending a routine change, briefly explain why.
- Keep answers practical, friendly, and concise.
`;

  const userInput = `
Recent workout logs:
${JSON.stringify(recentLogs, null, 2)}

Current routines:
${JSON.stringify(routines, null, 2)}

User question:
${question}
`;

  try {
    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-5.4",
          instructions,
          input: userInput,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenAI request failed",
      });
    }

    const answer =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        ?.find((item) => item.type === "output_text")
        ?.text ||
      "No response text returned.";

    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Coach request failed.",
    });
  }
}
