import React, { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initializeBlogs } from "../reducers/blogReducer";
import NewBlog from "../components/NewBlog";
import Togglable from "../components/Togglable";
import { Link } from "react-router-dom";

const HomeView = ({ notify }) => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogFormRef = createRef();

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
    notify(`Blog created: ${blog.title}, ${blog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>

      <ul className="rounded-xl border-2 border-emerald-400 w-fit px-4 py-2">
        {[...blogs].sort(byLikes).map((blog, index) => (
          <li key={blog.id} className="w-full">
            <Link
              to={`/blogs/${blog.id}`}
              className="text-inherit hover:text-emerald-400 hover:underline underline-offset-2"
            >
              <span className="text-emerald-400 font-bold">{blog.title}</span>{" "}
              by {blog.author}
            </Link>
            {index < blogs.length - 1 && (
              <div className="w-[90%] mx-auto h-px bg-emerald-400/50 my-2" />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomeView;
