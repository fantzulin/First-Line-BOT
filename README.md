# First-Line-BOT
這是我第一次透過node.js建置Line BOT, 紀錄一下過程和遇到的issue, 也許有人也發生過。首先這次的初次建立參考了[An Sheng Huang](https://medium.com/pyradise/%E4%BD%BF%E7%94%A8node-js%E5%BB%BA%E7%BD%AE%E4%BD%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E5%80%8Bline-bot-590b7ba7a28a)的教學, 大家如果覺得我的不夠詳細也可以參照一下他的範例, 他有一些圖示說明可參考。

### Step1 您的環境要先安裝 [Node.js](https://nodejs.org/en/)
這邊建議安裝新版的Node.js, 第一次使用時一直出現 `400 bad request Error`, 後來嘗試追問很多問題, 最後透過更新最新版本Node.js解決了問題, 所以這邊建議大家都用新版的Node.js, 可以優先選擇下載左邊的 **Recommended For Most Users**, 此文件針對**version 10.15.3**。

**OSX** upgrade方式我是使用brew更新, 但他把我一堆東西順便一起更新了, 會耽誤一些些時間..., 如果大家有更好做法可以提出, 謝謝。

**Windows** upgrade方式我是一樣從官方下載.msi檔安裝, 路徑跟舊的版本選一樣他就會將舊的版本蓋過, 很方便。

打開終端機輸入以下指令即可查閱目前Node.js 版本

**OSX**

```$ node --version```

**Windows**

```node --version```

----

### Step2 註冊一個 [LINE Channel](https://developers.line.biz/en/)
先登入你的LINE帳號, 接著選擇**Create New Provider**, 將Provider名稱建立, 接著選擇**Messaging API**, 將App名稱建立, 建立好後就可以進去**Channel Settings**裡了。

這裡有幾項比較重要的資訊需要記下

**Channel ID**

**Channel Secret**

**Channel Access Token**(有時效性, 最多保留24hr, 超過時間就需要再創建)

----

### Step3 開始第一個LINE Bot Node.js
請先安裝LINE BOT 的SDK, 這邊你第一次需要先執行```npm init```, 他會建立一個package.json file, 步驟我也沒多做設定, 就一直enter進行, 最後再來執行下面的指令。

**OSX**

```$ npm install linebot --save```

**Winsows**

```npm install linebot --save```

準備好一個空的資料夾, 建立第一個Node.js

**App.js**

```
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
```
這邊引用[An Sheng Huang](https://medium.com/pyradise/%E4%BD%BF%E7%94%A8node-js%E5%BB%BA%E7%BD%AE%E4%BD%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E5%80%8Bline-bot-590b7ba7a28a)的教學範例,　希望大家能幫他clap幾下。

再我們的專案裡, 執行一下我們的node.js

**OSX**

```$node app.js```

**Windows**

```node app.js```

----

#### Step4 使用[ngrok](https://ngrok.com/)測試Bot

Line BOT 需要一個https的Webhook, ngrok會提供一個URL作為連接, 先註冊一個帳號, 接著Download官方zip檔, 接著解壓縮再雙擊, 網站上會顯示你的**account's authtoken**, 接著就在你解壓縮下的資料夾run起來

**OSX**

```$ ./ngrok http 3000```

**Windows**

```'ngrok.exe http 3000```

終端機應該就會顯示以下內容, x代碼需要大家記下, 後面需要在**LINE Channel Settings**設定

```Forwarding                    https://xxxxxxxx.ngrok.io -> http://localhost:3000```

#### Step5 設定LINE BOT 的Webhook

初次使用記得將**Use webhooks**選擇**Enabled**, 我一開始就是沒開啟失敗了幾次, 接著將下方的**Webhook URL**填上, 也就是**xxxxxxxx.ngrok.io**這一段, 記得後面要再加上```/linewebhook```, 還記得我們的App.js最後設定webhook的地方寫到

```
// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備完成]');
});
```
App.js裡的bot所監聽的路徑是```bot.listen('/linewebhook', 3000)```

所以webhook URL必須填入完整路徑```xxxxxxxx.ngrok.io/linewebhook```

輸入後就可以按下**verify**, 如果有出現**Success**, 就OK了!你就可以加自己的BOT, LINE他一下, 沒意外他應該會把一樣的訊息丟回來給你。這邊如果webhook URL如果沒成功記得將**Use webhooks**選擇**Enabled**, 並且確定自己的**Node.js**為新版, 我就是因為這兩個原因一直噴`400 bad request Error`, 希望大家都有順利成功!

這次的初次練習參考了[An Sheng Huang](https://medium.com/pyradise/%E4%BD%BF%E7%94%A8node-js%E5%BB%BA%E7%BD%AE%E4%BD%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E5%80%8Bline-bot-590b7ba7a28a)的教學範例, 他的文章還有搭配一些圖說明, 非常清楚, 大家也可以從上面做參考, 也給他一些clap回應吧!這是一個初次的小記錄, 方便我記錄當初遇到的問題, 也分享給大家試試看。
