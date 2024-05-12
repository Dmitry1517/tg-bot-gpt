import TeleBot from "telebot"
import fetch from "node-fetch";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

bot.on("text", async (ctx) => {
  try {
    const response = await fetch(
      "https://api.proxyapi.ru/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PROXY_API_TOKEN}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: ctx.message.text,
            },
          ],
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    ctx.reply(`${data.choices[0].message.content}`);
  } catch (error) {
    ctx.reply("Произошла ошибка при запросе к API");
  }
});

export default bot
