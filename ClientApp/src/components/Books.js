import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DashboardLayout from "./DashboardLayout";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editBook, setEditBook] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [noResults, setNoResults] = useState(false);

  const token = Cookies.get("token");

  // Load books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
        setFilteredBooks(response.data);
        setNoResults(false); // Reset noResults when data is fetched
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [token]);

  // Handle search
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredBooks(books);
      setNoResults(false); // Reset noResults when search query is empty
    } else {
      const filtered = books.filter((book) => {
        const title = book.title?.toLowerCase() || "";
        const description = book.description?.toLowerCase() || "";
        const category = book.category?.toLowerCase() || "";
        return (
          title.includes(searchQuery.toLowerCase()) ||
          description.includes(searchQuery.toLowerCase()) ||
          category.includes(searchQuery.toLowerCase())
        );
      });
      setFilteredBooks(filtered);
      setNoResults(filtered.length === 0); // Set noResults based on filtered length
    }
  }, [searchQuery, books]);

  // Delete book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Open edit modal
  const openEditModal = (book) => {
    setEditBook(book);
    setTitle(book.title);
    setDescription(book.description);
    setCategory(book.category);
    setPrice(book.price);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditBook(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setPrice("");
  };

  // Update book
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = {
        ...editBook,
        title,
        description,
        category,
        price: parseFloat(price),
      };
      await axios.put(
        `http://localhost:5000/api/books/${editBook.id}`,
        updatedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedBooks = books.map((book) =>
        book.id === editBook.id ? updatedBook : book
      );
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      closeEditModal();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Book List</h2>
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          {noResults && (
            <div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">No results found</strong>
              <span className="block sm:inline"> for "{searchQuery}"</span>
            </div>
          )}
          <ul className="space-y-4">
            {filteredBooks.length > 0
              ? filteredBooks.map((book) => (
                  <li
                    key={book.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      {/* Flex row for book details */}
                      <div className="flex-1 flex flex-row justify-between items-center">
                        <div className="flex flex-col flex-grow">
                          <h3 className="text-xl font-bold">
                            Title:{ book.book_name}
                          </h3>
                          <p className="text-gray-700">
                            Description: {book.description}
                          </p>
                          <p className="text-gray-500">
                            Category: {book.category}
                          </p>
                          <p className="text-gray-500">
                            Price: ${book.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <button
                            onClick={() => openEditModal(book)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteBook(book.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              : !noResults && <p className="text-gray-500">Loading...</p>}
          </ul>
        </div>

        {editBook && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Book
                  </button>
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Books;
