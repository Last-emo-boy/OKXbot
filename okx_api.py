import requests

def get_crypto_price(crypto):
    url = f"https://www.okx.com/api/v5/market/ticker?instId={crypto.upper()}-USDT"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data["code"] == "0":
            price_data = data["data"][0]
            last_price = price_data["last"]
            bid_price = price_data["bidPx"]
            ask_price = price_data["askPx"]
            open_24h = price_data["open24h"]
            high_24h = price_data["high24h"]
            low_24h = price_data["low24h"]
            vol_24h = price_data["vol24h"]
            return (f"{crypto.upper()} 价格: {last_price} USDT, 买价: {bid_price}, 卖价: {ask_price}\n"
                    f"开盘价: {open_24h}, 24小时最高: {high_24h}, 24小时最低: {low_24h}, 24小时交易量: {vol_24h}")
        else:
            return f"获取 {crypto.upper()} 价格失败: {data['msg']}"
    else:
        return "查询价格时出错"
