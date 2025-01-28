import TelegramBot from 'node-telegram-bot-api';
import { exec } from 'child_process';

const token = '7377099610:AAGj4qDO0YnHbilCuG6lQoPYwK7wqi7qf2s'; // Sostituisci con il token del Bot
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/download (.+) --output (.+) --format (.+)/, (msg, match) => {
  if (!match) return;

  const chatId = msg.chat.id;
  const username = match[1];
  const outputDir = match[2];
  const format = match[3];

  bot.sendMessage(chatId, `Avvio del download per ${username} in formato ${format}...`);

  const command = `node build/app.js ${username} --output ${outputDir} --format ${format}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      bot.sendMessage(chatId, `Errore durante il download: ${error.message}`);
      return;
    }
    if (stderr) {
      bot.sendMessage(chatId, `Warning: ${stderr}`);
    }
    bot.sendMessage(chatId, `Download completato! Output:\n${stdout}`);
  });
});
