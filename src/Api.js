import axios from "axios";

const API_KEY = 'My-key';

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
});

export const searchBooks = async (query, category, sorting, startIndex, maxResults, count) => {
  try {
    const response = await instance.get("volumes", {
      params: {
        key: API_KEY,
        q: query + (category ? `+subject:${category}` : ''), // Слово для поиска и категория
        orderBy: sorting, // Вид сортировки
        startIndex: startIndex, // Начальная позиция для пагинации
        maxResults: maxResults, // Максимальное количество результатов
      },
    });
    count = response.data.totalItems;
    const totalItems = response.data.totalItems || 0;
    const items = response.data.items || [];
    return {items, totalItems};
  } catch (error) {
    console.error("Ошибка при поиске книг:", error);
    return [];
  }
};
