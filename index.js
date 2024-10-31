//建立網站伺服器基礎設定
const express=require("express");
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require('path');
const app=express();
const session=require("express-session");
app.set(session({
    secret:"anything",
    rsave:false,
    saveUninitialized:true
}));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("pubic"));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL-encoded 表单数据
app.use(bodyParser.json()); // 解析 JSON 数据
app.use(express.json())

// 設定靜態資源資料夾
app.use('/js', express.static(path.join(__dirname, 'js'))); // 確保 js 資料夾在專案根目錄下



// 建立需要的路由
app.get("/", function (req, res) {
    res.render("index.ejs");
});
app.get("/member", function(req, res) {
    res.render("member.ejs");
});
// 連線到 /error?msg=錯誤訊息
app.get("/error", function(req, res){
    const msg=req.query.msg;
    res.render("error.ejs", {msg:msg});
});

app.get("/firstTimeForm", function(req, res) {
    const idNumber = req.query.idNumber
    if (idNumber) {
        const filePath = path.join(__dirname, `${idNumber}`, `${idNumber}_firstTimeForm.json`);

        // 读取对应的 JSON 文件
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.render("firstTimeForm.ejs", { idNumber, userData: null }); // 文件未找到，返回空数据
            }

            // 解析 JSON 数据
            const userData = JSON.parse(data);
            res.render("firstTimeForm.ejs", { idNumber, userData }); // 传递用户数据
        });
 
    } else {
        res.render("firstTimeForm.ejs")
    }
});

// 處理 POST 请求
app.post('/submit', (req, res) => {
    const formData = req.body;
    const idNumber = formData.idNumber; // 使用身份證字號作為文件名

    if (!idNumber) {
        return res.status(400).send('身份證字號不可為空');
    }

    const dirPath = path.join(__dirname, `${idNumber}`);
    const filePath = path.join(dirPath, `${idNumber}_firstTimeForm.json`);

    // 確認資料夾是否存在，若不存在則創建
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // 寫入 JSON 文件
    fs.writeFile(filePath, JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.error('寫入文件時出錯:', err);
            return res.status(500).send('無法存儲資料');
        }
        res.send('資料已成功儲存');
    });
});

app.post('/get-user-data', (req, res) => {
    const idNumber = req.body.idNumber; // 表單送過來的 ID
    const filePath = path.join(__dirname, `${idNumber}`, `${idNumber}.json`);

    // 確認檔案是否存在
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: '檔案不存在或無法讀取' });
        }
        res.json(JSON.parse(data)); // 回傳 JSON 資料
    });
});



// 啟動伺服器 http://localhost:3000/
app.listen(3000, function() {
    console.log("Server Started");
});