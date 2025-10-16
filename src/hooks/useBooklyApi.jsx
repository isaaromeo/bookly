import { useApi } from "./useApi";

//En vez de hacer un hook para cada endpoint los juntamos en un objeto
//para mutaciones no podemos utilizar useAPi necesitamos una funcion a parte
import { useMutation } from "./useMutation";



export const useBooklyApi = {
  //books
  useBook: (bookId) =>
    useApi(bookId ? `/books/${bookId}` : null, {
      cacheKey: bookId ? `book-${bookId}` : null,
    }),

  useBooks: () => useApi("/books", { cacheKey: "all-books" }),

  useBooksByGenre: (genre) => useApi(genre ? `/books/genre/${genre}` : null),

  useBooksByAuthor: (author) =>
    useApi(author ? `/books/author/${author}` : null),

  //users
  useUser: (userId) =>
    useApi(userId ? `/user/${userId}` : null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  //   useUserLibrary: (userId) =>
  //     useApi(userId ? `/user/${userId}/library` : null, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     }),
  //   useUserTBR: (userId) =>
  //     useApi(userId ? `/user/${userId}/tbr` : null, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     }),

  //reviews
  useBookReviews: (bookId) => useApi(bookId ? `/reviews/${bookId}` : null),
  useUserReviews: (userId) =>
    useApi(userId ? `/user/${userId}/reviews` : null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),

  //   usePostReview: () => {
  //     const { mutate, loading, error, data } = useMutation();
  //     return { mutate, loading, error, data };
  //   },
  usePostReview: () => {
    const { mutate, loading, error, data } = useMutation();

    const postReview = (bookId, reviewData, userId) => {
      return mutate(`/reviews`, {
        method: "POST",
        body: {
          ...reviewData,
          book: bookId,
          user: userId,
        },
      });
    };

    return {
      postReview,
      loading,
      error,
      data,
    };
  },

  //search
  useSearch: (query, type = "books") =>
    useApi(query ? `/search/${type}?q=${encodeURIComponent(query)}` : null),
};
