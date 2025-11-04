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

  useBooksByGenre: (genre) =>
    useApi(genre ? `/books/genre/${genre}` : null, {
      cacheKey: genre ? `books-genre-${genre}` : null, 
    }),

  useBooksByAuthor: (author) =>
    useApi(author ? `/books/author/${author}` : null),

  //users
  useUser: (userId) =>
    useApi(userId ? `/user/${userId}` : null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  useUserLibrary: (userId) =>
    useApi(userId ? `/user/${userId}/library` : null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
  useUserTBR: (userId) =>
    useApi(userId ? `/user/${userId}/tbr` : null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),

  useAddToLibrary: () => {
    const { mutate, loading, error, data } = useMutation();

    const addToLibrary = (userId, bookId) => {
      const url = `/user/${userId}/library/${bookId}`;
      console.log("Final URL:", url);

      return mutate(url, {
        method: "POST",
      });
    };

    return {
      addToLibrary,
      loading,
      error,
      data,
    };
  },

  useRemoveFromLibrary: () => {
    const { mutate, loading, error, data } = useMutation();

    const removeFromLibrary = (userId, bookId) => {
      return mutate(`/user/${userId}/library/${bookId}`, {
        method: "DELETE",
      });
    };

    return {
      removeFromLibrary,
      loading,
      error,
      data,
    };
  },

  useAddToTBR: () => {
    const { mutate, loading, error, data } = useMutation();

    const addToTBR = (userId, bookId) => {
      return mutate(`/user/${userId}/tbr/${bookId}`, {
        method: "POST",
      });
    };

    return {
      addToTBR,
      loading,
      error,
      data,
    };
  },

  useRemoveFromTBR: () => {
    const { mutate, loading, error, data } = useMutation();

    const removeFromTBR = (userId, bookId) => {
      return mutate(`/user/${userId}/tbr/${bookId}`, {
        method: "DELETE",
      });
    };

    return {
      removeFromTBR,
      loading,
      error,
      data,
    };
  },

  useUpdateUser: () => {
    const { mutate, loading, error, data } = useMutation();

    const updateUser = (userId, userData) => {
      return mutate(`/user/${userId}`, {
        method: "PUT",
        body: userData,
      });
    };

    return {
      updateUser,
      loading,
      error,
      data,
    };
  },

  useFollowUser: () => {
    const { mutate, loading, error, data } = useMutation();

    const followUser = (followedUserId) => {
      return mutate(`/user/follow/${followedUserId}`, {
        method: "POST",
      });
    };

    return {
      followUser,
      loading,
      error,
      data,
    };
  },

  useUserFollowData: (userId) =>
    useApi(userId ? `/user/${userId}/followData` : null),

  //admin
  useUploadBooksCSV: () => {
    const { mutate, loading, error, data } = useMutation();

    const uploadBooksCSV = (formData) => {
      return mutate("/books/uploadCSV", {
        method: "POST",
        body: formData,
      });
    };

    return {
      uploadBooksCSV,
      loading,
      error,
      data,
    };
  },

  //reviews
  useBookReviews: (bookId) => useApi(bookId ? `/reviews/${bookId}` : null),
  useUserReviews: (userId) =>
    useApi(userId ? `/user/${userId}/reviews` : null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),

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

  useUpdateReview: () => {
    const { mutate, loading, error, data } = useMutation();

    const updateReview = (reviewId, reviewData) => {
      return mutate(`/reviews/${reviewId}`, {
        method: "PUT",
        body: reviewData,
      });
    };

    return {
      updateReview,
      loading,
      error,
      data,
    };
  },

  useDeleteReview: () => {
    const { mutate, loading, error, data } = useMutation();

    const deleteReview = (reviewId, userId) => {
      return mutate(`/reviews/${reviewId}/${userId}`, {
        method: "DELETE",
      });
    };

    return {
      deleteReview,
      loading,
      error,
      data,
    };
  },

  useLikeReview: () => {
    const { mutate, loading, error, data } = useMutation();

    const likeReview = (reviewId) => {
      return mutate(`/reviews/${reviewId}/like`, {
        method: "POST",
      });
    };

    return {
      likeReview,
      loading,
      error,
      data,
    };
  },

  useGetReviewLikes: (reviewId) =>
    useApi(reviewId ? `/reviews/${reviewId}/likes` : null),

  //search
  useSearch: (query, type = "books") =>
    useApi(query ? `/search/${type}?q=${encodeURIComponent(query)}` : null),
};
