const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ data }) => {
  return (
    <p>
      {data.name} {data.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map((item, index) => <Part key={index} data={item} />);
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises {parts.reduce((n, { exercises }) => n + exercises, 0)}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
