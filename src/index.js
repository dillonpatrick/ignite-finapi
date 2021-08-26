const express = require("express");
const { v4: uuid_v4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(401).json({ error: "Customer already exists!" });
  }

  const customer = {
    id: uuid_v4(),
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
