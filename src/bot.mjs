import TeleBot from "telebot"
//import fetch from "node-fetch";

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
    await bot.sendMessage(chatId, "Скачиваю видео...");
  } else {
    await bot.sendMessage(chatId, `Вы написали: ${text}`);
  }
})



export default bot

