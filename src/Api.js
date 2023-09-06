import axios from "axios";

const API_KEY = 'My-key';

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
});

export const searchBooks = async (query, category, sorting) => {
  try {
    const response = await instance.get("volumes", {
      params: {
        key: API_KEY,
        q: query + (category ? `+subject:${category}` : ''),
        orderBy: sorting,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Ошибка при поиске книг:", error);
    return [];
  }
};
