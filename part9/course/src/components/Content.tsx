const Content = ({
  courseParts,
}: {
  courseParts: { name: string; exerciseCount: number }[];
}) => {
  return courseParts.map((part) => (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  ));
};

export default Content;
