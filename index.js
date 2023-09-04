require("dotenv").config();
const { Client, IntentsBitField } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMessages',
        'MessageContent',
    ]
});

client.on('ready', () => {
    console.log("Biden GPT is online Suiiiiii!");
});

const openai = new OpenAI({
    apiKey: process.env.API_KEY, 
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    if(message.content.startsWith("!")) return;

    const response = await openai.chat.completions
    .create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'ChatGPT is no longer open and i cant afford to pay for a little fun lol'
            },  
            {
                role: 'user',
                content: message.content,
            }
        ],
    })

    message.reply(response.choices[0].message.content);
});

client.login(process.env.TOKEN);