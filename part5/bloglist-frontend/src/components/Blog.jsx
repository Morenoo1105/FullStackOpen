import { useState } from "react";

const Blog = ({ blog, handleLike }) => {
  const [isVisible, setVisible] = useState(false);

  if (!isVisible) {
    return (
      <div>
        <div>
          <button id="view" onClick={() => setVisible(true)}>
            View
          </button>
          "{blog.title}" by {blog.author}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        borderColor: "#f9f",
        borderWidth: 2,
        borderStyle: "solid",
        padding: 4,
        marginBottom: 4,
      }}
    >
      <div>
        <button onClick={() => setVisible(false)}>hide</button>
        <h3>
          "{blog.title}" by {blog.author}
        </h3>
      </div>
      <a href={blog.url} target="_blank">
        {blog.url}
      </a>
      <div>
        likes {blog.likes}{" "}
        <button id="like" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {/* <div>{deleteButton()}</div> */}
    </div>
  );
};

export default Blog;
