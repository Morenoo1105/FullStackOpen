const express = require("express");

const app = express();

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const PORT = 3001;
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
  const id = req.params.id;
  const person = phonebook.find((person) => person.id == id);

  if (!person) res.status(404).send("Person not found");

  res.send(person);
});
