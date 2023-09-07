import axios from "axios";

const API_KEY = 'AIzaSyC4aPXGSOiRebdvLuHjYe_SAUhzwt50t2E';

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
});

export const searchBooks = async (query, category, sorting, startIndex, maxResults) => {
  maxResults = 30;
  try {
    const response = await instance.get("volumes", {
      params: {
        key: API_KEY,
        q: query + (category ? `+subject:${category}` : ''), // Слово для поиска и категория
        orderBy: sorting, // Вид сортировки
        startIndex, // Начальная позиция для пагинации
        maxResults, // Максимальное количество результатов
      },
    });
    const totalItems = response.data.totalItems || 0;
    const items = response.data.items || [];
    return { items, totalItems };
  } catch (error) {
    console.error("Ошибка при поиске книг:", error);
    return [];
  }
};
