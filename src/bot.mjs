import TeleBot from "telebot"
//import fetch from "node-fetch";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

//bot.on("text", msg => msg.reply.text(msg.text + ' (Я тестовый Ботик)'))

bot.on("/start", msg => msg.reply.text(msg.chat.id + " Привет! Отправь мне ссылку на видео с YouTube, и я скачаю его для тебя."))



export default bot

