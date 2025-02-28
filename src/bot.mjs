//import TeleBot from "telebot"
//import fetch from "node-fetch";

//const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

//bot.on("text", msg => msg.reply.text(msg.text + ' (Я тестовый Ботик)'))

const Telebot = require("telebot");
const fs = require("fs");
const path = require("path");
const ytdlp = require("yt-dlp-exec").exec;



const bot = new Telebot({
  token: process.env.TELEGRAM_BOT_TOKEN,
  polling: {
    interval: 1000, // Интервал опроса сервера Telegram
  },
});

// Обработка команды /start
bot.on(["/start"], (msg) => {
  //const chatId = msg.chat.id;
  return bot.sendMessage(msg.from.id, "Привет! Отправь мне ссылку на видео с YouTube, и я скачаю его для тебя.");
});

// Обработка текстовых сообщений
// bot.on("text", async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;

//   // Проверяем, является ли сообщение ссылкой на YouTube
//   if (text.includes("youtube.com") || text.includes("youtu.be")) {
//     try {
//       // Сообщаем пользователю, что началась загрузка
//       await bot.sendMessage(chatId, "Скачиваю видео...");

//       // Генерируем уникальное имя файла
//       const fileName = `video_${Date.now()}.mp4`;
//       const filePath = path.join(__dirname, fileName);

//       // Скачиваем видео с помощью yt-dlp-exec
//       await ytdlp(text, {
//         output: filePath,
//         format: "mp4",
//       });

//       // Отправляем видео пользователю
//       await bot.sendVideo(chatId, filePath);

//       // Удаляем файл после отправки
//       fs.unlinkSync(filePath);
//     } catch (error) {
//       console.error("Ошибка:", error);
//       await bot.sendMessage(chatId, "Не удалось скачать видео. Попробуйте другую ссылку.");
//     }
//   } else {
//     // Если это не ссылка на YouTube, просто эхо
//     await bot.sendMessage(chatId, `Вы написали: ${text}`);
//   }
//});

export default bot

