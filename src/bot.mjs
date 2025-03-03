import TeleBot from "telebot"
//import fetch from "node-fetch";

const fs = require("fs");
const path = require("path");
const ytdlp = require("yt-dlp-exec").exec;

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

//bot.on("text", msg => msg.reply.text(msg.text + ' (Я тестовый Ботик)'))

bot.on("/start", msg => {
  const chatId = msg.chat.id;
  return bot.sendMessage(chatId, "Привет! Отправь мне ссылку на видео с YouTube, и я скачаю его для тебя.");
})

bot.on("text", async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text.includes("youtube.com") || text.includes("youtu.be")) {
    try {
      //const fileName = `video_${Date.now()}.mp4`;
      // Сообщаем пользователю, что началась загрузка
      await bot.sendMessage(chatId, "Скачиваю видео...");

      // Генерируем уникальное имя файла

      //await bot.sendMessage(`Скачиваю видео ${fileName}`);
      //const filePath = path.join(__dirname, fileName);

      // Скачиваем видео с помощью yt-dlp-exec
      // await ytdlp(text, {
      //   output: filePath,
      //   format: "mp4",
      // });

      // Отправляем видео пользователю
      //await bot.sendVideo(chatId, filePath);

      // Удаляем файл после отправки
      //fs.unlinkSync(filePath);
    } catch (error) {
      await bot.sendMessage(chatId, "Не удалось скачать видео. Попробуйте другую ссылку.");
    }

  } else {
    await bot.sendMessage(chatId, `Вы написали: ${text}`);
  }
})



export default bot

