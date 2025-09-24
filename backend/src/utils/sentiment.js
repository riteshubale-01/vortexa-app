// Sentiment classification using OpenAI API (or HuggingFace)
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.classifySentiment = async (text) => {
  // Fallback: simple rules if no API key
  if (!process.env.OPENAI_API_KEY) {
    const lower = text.toLowerCase();
    if (lower.includes('love') || lower.includes('great')) return { label: 'Positive', confidence: 0.8, explanation: 'Contains positive words.' };
    if (lower.includes('hate') || lower.includes('bad')) return { label: 'Negative', confidence: 0.8, explanation: 'Contains negative words.' };
    return { label: 'Neutral', confidence: 0.5, explanation: 'No strong sentiment detected.' };
  }
  // OpenAI call
  const prompt = `Classify the sentiment of this post as Positive, Neutral, or Negative. Give a confidence (0-1) and a one-line explanation.\nPost: ${text}`;
  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 60
  });
  const content = resp.choices[0].message.content;
  // Parse response (expected: Label:..., Confidence:..., Explanation:...)
  const label = /Label:\s*(\w+)/i.exec(content)?.[1] || 'Neutral';
  const confidence = parseFloat(/Confidence:\s*([0-9.]+)/i.exec(content)?.[1]) || 0.5;
  const explanation = /Explanation:\s*(.*)/i.exec(content)?.[1] || '';
  return { label, confidence, explanation };
};
