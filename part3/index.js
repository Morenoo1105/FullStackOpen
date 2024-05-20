const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);
app.use(cors());

morgan.token("content", (request) =>
  request.method === "POST" && request.body.name
    ? JSON.stringify(request.body)
    : null
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
];

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Sir!</h1>");
});

app.get("/info", (req, res) => {
  res.send(
    `<p>
    Phonebook has info for ${phonebook.length} people.</p> 
    <p>${new Date()}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.send(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);

  if (!person) res.status(404).send("Person not found");

  res.send(person);
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name)
    return res.status(400).json({
      error: "Name missing",
    });

  if (phonebook.find((p) => p.name === person.name))
    return res.status(400).json({
      error: "Name must be unique",
    });

  if (!person.phone)
    return res.status(400).json({
      error: "Phone number missing",
    });

  const id = Math.floor(Math.random() * 10000);
  person.id = id;
  phonebook = phonebook.concat(person);

  res.send(phonebook);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);

  res.status(204).end();
});
