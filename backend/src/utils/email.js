const nodemailer = require('nodemailer');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

exports.sendWelcomeEmail = async (to, username) => {
  // Generate welcome message with AI
  let welcomeText = `Welcome to Vortexa, ${username}!`;
  if (process.env.OPENAI_API_KEY) {
    const prompt = `Write a short, friendly welcome email for a new user named ${username} joining a Reddit-like social app.`;
    const resp = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 80
    });
    welcomeText = resp.data.choices[0].message.content;
  }
  // Send email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to Vortexa!',
    text: welcomeText
  });
};
