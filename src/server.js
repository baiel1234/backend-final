import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import bodyParser from "body-parser";

// Импортируем роутеры
import postRouter from "./src/Routes/posts.js";
import helloRouter from "./src/hello.js";

// CDN для кастомного CSS для Swagger UI
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();

// Настройка переменных окружения
dotenv.config();

// Middleware для парсинга JSON и логирования
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// Определение Swagger документации
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.example.com/support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:2001",  // динамический URL для продакшн и локалки
        description: "My API Documentation",
      },
    ],
  },
  apis: ["src/**/*.js"],  // Путь к вашим API-файлам
};

const specs = swaggerJsDoc(options);

// Подключаем Swagger UI для отображения документации
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { customCssUrl: CSS_URL }));

// Роуты
app.use("/", helloRouter);  // Роутер для приветственного ответа
app.use("/posts", postRouter);  // Роутер для работы с постами

// Запуск сервера
const PORT = process.env.PORT || 2001;  // Используем переменную окружения для порта
app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
