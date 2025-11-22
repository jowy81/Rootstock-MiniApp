import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');

const webAppUrl = process.env.WEB_APP_URL || 'https://google.com'; // Fallback for testing

bot.start((ctx) => ctx.reply('Welcome to RTMCRP Bot! Click below to launch the app.', {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Open App", web_app: { url: webAppUrl } }]
        ]
    }
}));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
