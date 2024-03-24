# create package.json
npm init -y

# install express Js
npm i express  

# .env 環境參數 file 載入
npm install dotenv --save

# install nodemon (熱重啟)
npm i -D nodemon

# ES6modules package.json 加入 "type": "module" (import、export部分)

# 啟動偵錯 package.json => script 加入 "start:dev": "nodemon ./src/app.mjs"
npm run start:dev 