const TelegramBot = require('node-telegram-bot-api');

// Replace this with your actual bot token
const TOKEN = '7255332775:AAFssemVhMBYLvvTfcPW-l3HSwyFKgkeVCQ';

// Initialize the bot in webhook mode
const bot = new TelegramBot(TOKEN, { polling: false });

// Set webhook URL (update it with your Vercel domain after deployment)
const WEBHOOK_URL = `https://<your-vercel-project>.vercel.app/api/bot`;

// Set webhook
bot.setWebHook(WEBHOOK_URL)
  .then(() => console.log('Webhook set successfully!'))
  .catch(err => console.error('Error setting webhook:', err));

// Webhook handler
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    bot.processUpdate(req.body);
    res.status(200).send('OK');
  } else {
    res.status(404).send('Not Found');
  }
};

// Bot logic
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hello! You said: ${msg.text}`);
});
