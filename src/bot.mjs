import TeleBot from "telebot"
//import fetch from "node-fetch";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

bot.on("text", msg => msg.reply.text("Скоро я научусть отвечать!!!"))

export default bot
