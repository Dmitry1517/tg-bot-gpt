//import TeleBot from "telebot"
//import fetch from "node-fetch";



//const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

//bot.on("text", msg => msg.reply.text(msg.text + ' (Я тестовый Ботик)'))

const { Telegraf } = require('telegraf');
const ytdl = require('ytdl-core');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('Send me a YouTube link and I will download the video for you.'));

bot.on('text', async (ctx) => {
  const url = ctx.message.text;

  if (!ytdl.validateURL(url)) {
    return ctx.reply('Please send a valid YouTube link.');
  }

  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;
  const videoPath = path.resolve(__dirname, `${title}.mp4`);

  ctx.reply('Downloading video, please wait...');

  ytdl(url)
    .pipe(fs.createWriteStream(videoPath))
    .on('finish', () => {
      ctx.replyWithVideo({ source: videoPath }).then(() => {
        fs.unlinkSync(videoPath); // Delete the video file after sending
      });
    })
    .on('error', (err) => {
      ctx.reply('Failed to download the video. Please try again later.');
      console.error(err);
    });
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));



export default bot

