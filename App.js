// 引用linebot SDK
var linebot = require('linebot');

// 這邊用來填寫你的Line Channel資料
var bot = linebot({
    channelId: '你的CHANNEL_ID',
    channelSecret: '你的CHANNEL_SECRET',
    channelAccessToken: '你的CHANNEL_ACCESS_TOKEN'
});

// 有人傳送訊息給我們的Bot時
bot.on('message', function (event) {
    // event.message.text 是使用者傳給bot的訊息
    // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
    event.reply(event.message.text).then(function (data) {
        // 當訊息成功回傳後的處理
    }).catch(function (error) {
        // 當訊息回傳失敗後的處理
    });
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備完成]');
});