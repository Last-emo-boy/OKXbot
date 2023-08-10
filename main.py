from wechaty import Wechaty
from commands import handle_command
import schedule
import asyncio

async def on_message(msg):
    await handle_command(msg)

async def run_scheduled_jobs():
    while True:
        schedule.run_pending()
        await asyncio.sleep(1)

bot = Wechaty()
bot.on('message', on_message)
await bot.start()

# Run scheduled jobs for reporting
asyncio.create_task(run_scheduled_jobs())
