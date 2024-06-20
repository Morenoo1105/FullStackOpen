import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ALL_BOOKS_WITH_GENRE = gql`
  query getAllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`;

const Books = (props) => {
  const [genres, setGenres] = useState([]);

  const [filter, setFilter] = useState("");

  const [books, setBooks] = useState([]);
  // const books = useQuery(ALL_BOOKS);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS_WITH_GENRE);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }



  }, [books]);

  useEffect(() => {
    // getBooks().then((res) => {
    //   const genres = res.data.allBooks
    //     .map((book) => book.genres)
    //     .flat()
    //     .filter((genre, idx, arr) => arr.indexOf(genre) === idx)
    //     .sort();

    //   setGenres(genres);
    // });

    // if (books.data) {
    //   const genres = books
    //     .map((book) => book.genres)
    //     .flat()
    //     .filter((genre, idx, arr) => arr.indexOf(genre) === idx)
    //     .sort();

    //   setGenres(genres);
    // }
  }, []);

  useEffect(() => {
    if (filter) {
      getBooks({ variables: { genre: filter } });
    }
  }, [filter]);

  if (!props.show) return null;

  if (books.loading) return <div>Loading books...</div>;

  return (
    <div>
      <h2>books</h2>
      <div>
        <b>Genre:</b>
        <select
          style={{ marginLeft: 6, textTransform: "capitalize" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre} className="">
              {genre}
            </option>
          ))}
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
