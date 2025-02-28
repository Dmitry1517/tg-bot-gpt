//import TeleBot from "telebot"
//import fetch from "node-fetch";

// const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

// bot.on("text", msg => msg.reply.text(msg.text + ' (Я тестовый Ботик)'))

// export default bot

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const ytdlp = require("yt-dlp-exec").exec;
const fs = require("fs");
const path = require("path");

// Токен вашего Telegram-бота
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Инициализация Express.js
const app = express();
app.use(express.json());

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Отправь мне ссылку на видео с YouTube, и я скачаю его для тебя.");
});

// Обработка текстовых сообщений
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Проверяем, является ли сообщение ссылкой на YouTube
  if (text.includes("youtube.com") || text.includes("youtu.be")) {
    try {
      // Сообщаем пользователю, что началась загрузка
      bot.sendMessage(chatId, "Скачиваю видео...");

      // Генерируем уникальное имя файла
      const fileName = `video_${Date.now()}.mp4`;
      const filePath = path.join(__dirname, fileName);

      // Скачиваем видео с помощью yt-dlp-exec
      await ytdlp(text, {
        output: filePath,
        format: "mp4",
      });

      // Отправляем видео пользователю
      await bot.sendVideo(chatId, filePath);

      // Удаляем файл после отправки
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("Ошибка:", error);
      bot.sendMessage(chatId, "Не удалось скачать видео. Попробуйте другую ссылку.");
    }
  } else {
    // Если это не ссылка на YouTube, просто эхо
    bot.sendMessage(chatId, `Вы написали: ${text}`);
  }
});

// Запуск сервера на Vercel
module.exports = app;