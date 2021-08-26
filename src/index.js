const express = require("express");
const { v4: uuid_v4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const id = uuid_v4();

  const customer = {
    id,
    cpf,
    name,
    statement: [],
  };

  customers.push(customer);

  return response.status(201).json(customer);
});

app.listen(3333, () => {
  console.clear();

  return console.log("Running Server 🔥 ");
});
