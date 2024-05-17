const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ data }) => (
  <p>
    {data.name} {data.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((item, index) => <Part key={index} data={item} />);

const Total = ({ parts }) => (
  <h4>
    Number of exercises {parts.reduce((n, { exercises }) => n + exercises, 0)}
  </h4>
);

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <section>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </section>
      <hr />
    </>
  );
};

export default Course;
