//import TeleBot from "telebot"
//import fetch from "node-fetch";

// const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

// bot.on("text", msg => msg.reply.text(msg.text + ' (Я тестовый Ботик)'))

// export default bot

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Токен вашего Telegram-бота
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

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

      // Используем yt-dlp для скачивания видео
      exec(`yt-dlp -o ${filePath} ${text}`, async (error, stdout, stderr) => {
        if (error) {
          console.error("Ошибка при скачивании видео:", error);
          bot.sendMessage(chatId, "Не удалось скачать видео. Попробуйте другую ссылку.");
          return;
        }

        // Отправляем видео пользователю
        await bot.sendVideo(chatId, filePath);

        // Удаляем файл после отправки
        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.error("Ошибка:", error);
      bot.sendMessage(chatId, "Произошла ошибка. Попробуйте еще раз.");
    }
  } else {
    bot.sendMessage(chatId, "Пожалуйста, отправьте корректную ссылку на видео с YouTube.");
  }
});

//Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});