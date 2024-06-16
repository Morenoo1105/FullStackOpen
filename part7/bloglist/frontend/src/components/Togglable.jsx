import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="mb-4">
      <div style={hideWhenVisible}>
        <button
          className="rounded-full border-2 border-emerald-400 px-4 py-1 bg-emerald-400 text-white hover:opacity-75 cursor-pointer font-semibold transition-all"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="w-fit">
        {props.children}
        <button
          className="w-full text-right mt-4 font-medium text-emerald-400 underline underline-offset-4"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
