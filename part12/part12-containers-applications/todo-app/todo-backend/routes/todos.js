const express = require("express");
const { Todo } = require("../mongo");
const { getAsync, setAsync } = require("../redis");

const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const todos = +(await getAsync("added_todos")) || 0;
  console.log("todos", todos);
  await setAsync("added_todos", todos + 1);

  res.send(todo);
});

const singleRouter = express.Router({ mergeParams: true });

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const target = await Todo.findById(req.params.id);
  res.json(target);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const { text, done } = req.body;

  const returnedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      text,
      done,
    },
    { new: true }
  );

  res.json(returnedTodo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
