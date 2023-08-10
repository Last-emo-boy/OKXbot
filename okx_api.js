const axios = require('axios');

async function get_crypto_price(crypto) {
  const url = `https://www.okx.com/api/v5/market/ticker?instId=${crypto.toUpperCase()}-USDT`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const data = response.data;
      if (data.code === '0') {
        const price_data = data.data[0];
        const last_price = price_data.last;
        const bid_price = price_data.bidPx;
        const ask_price = price_data.askPx;
        const open_24h = price_data.open24h;
        const high_24h = price_data.high24h;
        const low_24h = price_data.low24h;
        const vol_24h = price_data.vol24h;
        return `${crypto.toUpperCase()} 价格: ${last_price} USDT, 买价: ${bid_price}, 卖价: ${ask_price}\n开盘价: ${open_24h}, 24小时最高: ${high_24h}, 24小时最低: ${low_24h}, 24小时交易量: ${vol_24h}`;
      } else {
        return `获取 ${crypto.toUpperCase()} 价格失败: ${data.msg}`;
      }
    } else {
      return '查询价格时出错';
    }
  } catch (error) {
    console.error(error);
    return '查询价格时出现异常';
  }
}

module.exports = { get_crypto_price };
