import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS_WITH_GENRE } from "./Books";

export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

const Recommended = (props) => {
  const favGen = useQuery(ME);

  const [getFavoriteBooks, result] = useLazyQuery(ALL_BOOKS_WITH_GENRE);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [setBooks, result]);

  useEffect(() => {
    if (favGen.data) {
      getFavoriteBooks({ variables: { genre: favGen.data.me.favoriteGenre } });
    }
  }, [getFavoriteBooks, favGen]);

  if (!props.show) return null;

  if (books.loading) return <div>Loading books...</div>;

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre: <b>{favGen.data.me.favoriteGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default Recommended;
