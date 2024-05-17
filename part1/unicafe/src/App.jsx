import { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ text, onPress }) => <button onClick={onPress}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positive = (good / total) * 100 || 0;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={"👍 Good"} value={good} />
        <StatisticLine text={"🤷 Neutral"} value={neutral} />
        <StatisticLine text={"👎 Bad"} value={bad} />
        <StatisticLine text={"Total"} value={total} />
        <StatisticLine text={"Average"} value={average} />
        <StatisticLine text={"Positive rating"} value={positive + "%"} />
      </tbody>
    </table>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodVote = () => setGood(good + 1);
  const neutralVote = () => setNeutral(neutral + 1);
  const badVote = () => setBad(bad + 1);

  return (
    <div>
      <Title title={"Give Feedback"} />
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Button text={"👍 Good"} onPress={goodVote} />
        <Button text={"🤷 Neutral"} onPress={neutralVote} />
        <Button text={"👎 Bad"} onPress={badVote} />
      </div>
      <Title title={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
