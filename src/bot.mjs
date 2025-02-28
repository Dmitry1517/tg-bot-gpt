import TeleBot from "telebot"
//import fetch from "node-fetch";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

bot.on(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Отправь мне ссылку на видео с YouTube, и я скачаю его для тебя.");
});

//bot.on("text", msg => msg.reply.text(msg.text + ' (Я тестовый Ботик)'))

export default bot

