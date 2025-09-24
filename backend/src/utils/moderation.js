// Simple moderation using OpenAI or keyword list
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

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
  const resp = await openai.createModeration({ input: text });
  const flagged = resp.data.results[0].flagged;
  if (flagged) {
    return { blocked: true, reason: 'Flagged by AI moderation' };
  }
  return { blocked: false };
};
