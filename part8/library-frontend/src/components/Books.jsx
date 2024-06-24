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
  const initialBooks = useQuery(ALL_BOOKS);

  const [getBooks, result] = useLazyQuery(ALL_BOOKS_WITH_GENRE);

  const [bookList, setBookList] = useState([]);

  const changeGenre = (event) => {
    event.preventDefault();
    getBooks({ variables: { genre: event.target.value } });
  };

  useEffect(() => {
    if (result.data) {
      setBookList(result.data.allBooks);
    }
  }, [result]);

  useEffect(() => {
    if (initialBooks.data) {
      const genres = initialBooks.data.allBooks
        .map((book) => book.genres)
        .flat()
        .filter((genre, idx, arr) => arr.indexOf(genre) === idx)
        .sort();
      setGenres(genres);
      setBookList(initialBooks.data.allBooks);
    }
  }, [initialBooks.data]);

  useEffect(() => {
    if (props.show) getBooks({ variables: { genre: "" } });
  }, [props.show]);

  if (!props.show) return null;

  if (initialBooks.loading) return <div>Loading books...</div>;

  return (
    <div>
      <h2>books</h2>
      <div>
        <b>Genre:</b>
        <select
          style={{ marginLeft: 6, marginRight: 6, textTransform: "capitalize" }}
          defaultValue={""}
          onChange={changeGenre}
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre} className="">
              {genre}
            </option>
          ))}
        </select>
        {result.loading && (
          <span>
            <b>Loading books...</b>
          </span>
        )}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((a) => (
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
