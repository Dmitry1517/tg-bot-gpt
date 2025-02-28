//import TeleBot from "telebot"
//import fetch from "node-fetch";

// const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

// bot.on("text", msg => msg.reply.text(msg.text + ' (Я тестовый Ботик)'))

// export default bot

const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");
const ytdlp = require("yt-dlp-exec").exec;

// Токен вашего бота
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработка сообщений
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.includes("youtube.com") || text.includes("youtu.be")) {
    try {
      bot.sendMessage(chatId, "Скачиваю видео...");

      const fileName = `video_${Date.now()}.mp4`;
      const filePath = path.join(__dirname, fileName);

      await ytdlp(text, {
        output: filePath,
        format: "mp4",
      });

      await bot.sendVideo(chatId, filePath);
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("Ошибка:", error);
      bot.sendMessage(chatId, "Не удалось скачать видео. Попробуйте другую ссылку.");
    }
  } else {
    bot.sendMessage(chatId, `Вы написали: ${text}`);
  }
});

console.log("Бот запущен...");