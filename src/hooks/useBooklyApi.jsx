import { useApi } from "./useApi";

//En vez de hacer un hook para cada endpoint los juntamos en un objeto

export const useBooklyApi = {
  //books
  useBook: (bookId) =>
    useApi(`/books/${bookId}`),

  useBooks: () => useApi("/books"),

  useBooksByGenre: (genre) => useApi(`/books/genre/${genre}`),

  useBooksByAuthor: (author) =>
    useApi(`/books/author/${author}`),

  //users
  useUser: (userId) =>
    useApi(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  //reviews
  useBookReviews: (bookId) => useApi(`/reviews/${bookId}`),

  //search
  useSearch: (query, type = "books") =>
    useApi(`/search/${type}?q=${encodeURIComponent(query)}`),
};
