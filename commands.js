const { get_crypto_price } = require('./okx_api');
const subscriptions = require('./subscriptions');

async function handle_subscription(msg, crypto, threshold) {
  const user_id = msg.talker().contact_id;
  if (!subscriptions[user_id]) {
    subscriptions[user_id] = [];
  }
  subscriptions[user_id].push({ crypto, threshold });
  await msg.say(`订阅成功: 当 ${crypto.toUpperCase()} 价格达到 ${threshold} USDT 时，将通知你。`);
}

async function send_report(msg, crypto, interval) {
  const user_id = msg.talker().contact_id;

  const report_job = async () => {
    const price_info = await get_crypto_price(crypto);
    const user = await bot.Contact.find({ id: user_id });
    await user.say(`${crypto.toUpperCase()} 定时报告:\n${price_info}`);
  };

  setInterval(report_job, interval * 60 * 1000);
  await msg.say(`订阅成功: 每 ${interval} 分钟发送一次 ${crypto.toUpperCase()} 的价格报告。`);
}

async function handle_command(msg) {
  const content = msg.text();
  if (content.startsWith("/subscribe ")) { // Example command: /subscribe BTC 30000
    const [_, crypto, threshold] = content.split();
    await handle_subscription(msg, crypto, parseFloat(threshold));
  } else if (content.startsWith("/report ")) { // Example command: /report BTC 60
    const [_, crypto, interval] = content.split();
    await send_report(msg, crypto, parseInt(interval));
  } else if (content.startsWith("/")) {
    const crypto = content.slice(1);
    const price_info = await get_crypto_price(crypto);
    await msg.say(price_info);
  }
}

module.exports = { handle_command };
