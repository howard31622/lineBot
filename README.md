lineBot
===
linebot + heroku  with node.js

# 教學
  * 連結line bot
  * 連結heroku
  * 小東西==>製作一個隨機網頁
# 連結line bot
# 連結heroku
這個地方是大家很容易被搞崩的地方
* 下載並安裝 Heroku CLI、Git
* 開啟剛剛下載的範例程式碼資料夾，在路徑上輸入 cmd
* 使用終端或命令行應用程序登錄到 Heroku
    
```
   heroku login 
```

初始化 git

    git config --global user.name "你的名字"
    git config --global user.email 你的信箱
    
注意：你的名字 和 你的信箱 要換成各自的 名字 和 信箱

初始化 git

    git init
注意：僅第一次使用時要輸入

用 git 將資料夾與 heroku 連接

    heroku git:remote -a {HEROKU_APP_NAME}
注意：{HEROKU_APP_NAME} 是 Heroku 應用的名稱

輸入以下指令，將程式碼推上 Heroku，如果有跳出錯誤請重新輸入

    git add .
    git commit -m "Add code"
    git push -f heroku master
每當需要更新 Bot 時，請重新輸入上述指令

# 小東西==>隨機網頁
