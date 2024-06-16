import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeBlog, upVoteBlog } from "../reducers/blogReducer";
import storage from "../services/storage";

const SingleBlogView = ({ notify }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [blog, setBlog] = useState();

  useEffect(() => {
    blogService
      .getSingleBlog(id)
      .then((blog) => {
        setBlog(blog);
      })
      .catch((error) => {});
  }, [id]);

  const likeBlog = async () => {
    console.log(blog);

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(upVoteBlog(blog.id, updatedBlog));
    setBlog(updatedBlog);

    notify(`You liked ${blog.title} by ${blog.author}`);
  };

  const canRemove = blog?.user ? blog?.user.username === storage.me() : true;

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
      navigate("/");
    }
  };

  return (
    <div className="max-w-md">
      <div className="flex flex-row items-center gap-8">
        <h2 className="text-2xl mb-2 font-bold text-emerald-400 underline underline-offset-4 decoration-2">
          {blog?.title}
        </h2>
        {canRemove && (
          <button
            className="bg-rose-400 font-bold text-white text-sm px-4 py-1 rounded-full"
            onClick={handleDelete}
          >
            Delete?
          </button>
        )}
      </div>
      <ul>
        <li className="my-2 flex flex-col">
          Author
          <span className="text-emerald-400 font-bold text-lg">
            {blog?.author}
          </span>
        </li>
        <li className="my-2 flex flex-col">
          Url
          <a
            target="_blank"
            rel="noreferrer"
            href={blog?.url}
            className="after:content-['↗️'] text-emerald-400 font-bold hover:underline underline-offset-2"
          >
            {blog?.url}
          </a>
        </li>
        <li className="my-2 flex flex-col">
          <button
            className="rounded-full border-emerald-400 border-2 text-emerald-400 font-bold text-lg w-fit px-8 py-1 hover:bg-emerald-400 hover:text-white transition-all"
            onClick={likeBlog}
          >
            👍 {blog?.likes}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SingleBlogView;
