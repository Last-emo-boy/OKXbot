# 微信群聊报价机器人

微信群聊报价机器人是一个基于OKX交易所API的微信群聊机器人，用于查询和跟踪加密货币的价格。

## 功能

- **实时价格查询**：通过发送特定命令，例如`/BTC`，可以查询BTC在OKX交易所的最新价格、买价、卖价、开盘价、24小时最高价、24小时最低价和24小时交易量。
- **价格订阅提醒**：用户可以订阅特定货币的价格提醒，当价格达到特定阈值时，机器人将发送通知。
- **定时价格报告**：用户可以订阅特定货币的定时价格报告，机器人将按照设定的时间间隔发送价格报告。

## 安装与运行

### 1. 克隆仓库

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. 安装依赖库

项目需要以下JavaScript库：

- `axios`
- `wechaty`
- `wechaty-puppet-wechat`

可以通过以下命令安装依赖库：

```bash
npm install axios wechaty wechaty-puppet-wechat
```

### 3. 运行项目

在安装了所有依赖库后，可以通过以下命令运行项目：

```bash
node main.js
```

## 如何使用

在微信群聊中，可以使用以下命令：

- 查询价格：`/CRYPTO`，例如`/BTC`。
- 订阅价格提醒：`/subscribe CRYPTO THRESHOLD`，例如`/subscribe BTC 30000`。
- 订阅定时报告：`/report CRYPTO INTERVAL`，例如`/report BTC 60`。

## 贡献

如果你有任何问题或建议，请随时提交Issue或Pull Request。

## 许可

MIT License