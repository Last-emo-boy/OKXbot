from okx_api import get_crypto_price
from subscriptions import subscriptions
import schedule
from wechaty import Contact

async def handle_subscription(msg, crypto, threshold):
    user_id = msg.talker().contact_id
    if user_id not in subscriptions:
        subscriptions[user_id] = []
    subscriptions[user_id].append((crypto, threshold))
    await msg.say(f"订阅成功: 当 {crypto.upper()} 价格达到 {threshold} USDT 时，将通知你。")

async def send_report(msg, crypto, interval):
    user_id = msg.talker().contact_id
    def report_job():
        price_info = get_crypto_price(crypto)
        user = await Contact.find(user_id)
        await user.say(f"{crypto.upper()} 定时报告:\n{price_info}")

    schedule.every(interval).minutes.do(report_job)
    await msg.say(f"订阅成功: 每 {interval} 分钟发送一次 {crypto.upper()} 的价格报告。")

async def handle_command(msg):
    content = msg.text()
    if content.startswith("/subscribe "):  # Example command: /subscribe BTC 30000
        _, crypto, threshold = content.split()
        await handle_subscription(msg, crypto, float(threshold))
    elif content.startswith("/report "):  # Example command: /report BTC 60
        _, crypto, interval = content.split()
        await send_report(msg, crypto, int(interval))
    elif content.startswith("/"):
        crypto = content[1:]
        price_info = get_crypto_price(crypto)
        await msg.say(price_info)
