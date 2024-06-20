import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  const [birthYear, setBirthYear] = useState("");

  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authors = useQuery(ALL_AUTHORS);

  if (!props.show) return null;

  if (authors.loading) return <div>Loading authors...</div>;

  const submit = (event) => {
    event.preventDefault();

    changeBirthYear({
      variables: {
        name: event.target.author.value,
        setBornTo: parseInt(birthYear),
      },
    });

    event.target.reset();

    setBirthYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <form onSubmit={submit}>
          <h4>Set birth year</h4>
          <select name="author" defaultValue="choose">
            <option disabled value="choose">
              Choose Author
            </option>
            {authors.data.allAuthors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <div>
            born
            <input
              type="number"
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      )}
    </div>
  );
};

export default Authors;
