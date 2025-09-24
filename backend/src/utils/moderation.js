// Simple moderation using OpenAI or keyword list
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const bannedWords = ['abuse', 'hate', 'vulgar', 'offensive', 'racist', 'sexist', 'violence'];

exports.moderateText = async (text) => {
  if (!process.env.OPENAI_API_KEY) {
    for (const word of bannedWords) {
      if (text.toLowerCase().includes(word)) {
        return { blocked: true, reason: `Contains banned word: ${word}` };
      }
    }
    return { blocked: false };
  }
  // OpenAI moderation endpoint
  const resp = await openai.moderations.create({ input: text });
  const flagged = resp.results[0].flagged;
  if (flagged) {
    return { blocked: true, reason: 'Flagged by AI moderation' };
  }
  return { blocked: false };
};
