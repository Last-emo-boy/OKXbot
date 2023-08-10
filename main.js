const { Wechaty } = require('wechaty');
const { handle_command } = require('./commands');

async function onMessage(msg) {
  await handle_command(msg);
}

async function main() {
  const bot = new Wechaty();
  bot.on('message', onMessage);
  await bot.start();
  console.log('微信群聊报价机器人已启动！');
}

main().catch(console.error);
