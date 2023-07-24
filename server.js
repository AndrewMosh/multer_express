const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Установка хранилища Multer для сохранения загруженных файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Инициализация загрузчика Multer
const upload = multer({ storage: storage });

// Разрешаем статический доступ к папке "uploads" с загруженными файлами
app.use(express.static("uploads"));

// Отправка HTML-страницы с формой для загрузки файла
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Обработка загрузки файла
app.post("/uploads", upload.single("avatar"), function (req, res) {
  res.send("Файл успешно загружен");
});

// Запуск сервера на порте 3000
app.listen(3000, function () {
  console.log("Сервер запущен на порту 3000");
});
