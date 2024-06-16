import React, { useState } from "react";

const NewBlog = ({ doCreate, notify }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (author.length === 0 || url.length === 0 || title.length === 0)
      return notify("Please fill every field", "error");

    doCreate({ title, url, author });
    setTitle("");
    setUrl("");
    setAuthor("");
  };

  return (
    <div>
      <h2 className="text-xl mb-2 font-bold text-emerald-400 underline underline-offset-4 decoration-2">
        Creating a New Blog
      </h2>
      <form
        className="flex flex-col items-start max-w-fit"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col">
          Title
          <input
            className="border border-emerald-400 px-2 py-1 mb-2 rounded-xl"
            type="text"
            data-testid="title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <label className="flex flex-col">
          URL
          <input
            className="border border-emerald-400 px-2 py-1 mb-2 rounded-xl"
            type="text"
            data-testid="url"
            value={url}
            onChange={handleUrlChange}
          />
        </label>
        <label className="flex flex-col">
          Author
          <input
            className="border border-emerald-400 px-2 py-1 mb-2 rounded-xl"
            type="text"
            data-testid="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </label>
        <button
          className="bg-emerald-400 opacity-100 hover:opacity-75 cursor-pointer rounded-full font-semibold w-full px-5 py-2 mt-4"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
