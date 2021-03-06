const express = require("express");
const { v4: uuid_v4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistingCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Statement not found" });
  }

  request.customer = customer;

  next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

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

app.get("/statement", verifyIfExistingCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.get("/account", (request, response) => {
  return response.json(customers);
});

app.get("/statement/date", verifyIfExistingCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});

app.post("/deposit", verifyIfExistingCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);
  return response.status(201).json(statementOperation);
});

app.post("/withdraw", verifyIfExistingCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);
  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds" });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);
  return response.status(201).send();
});

app.put("/account", verifyIfExistingCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(200).send();
});

app.delete("/account", verifyIfExistingCPF, (request, response) => {
  const { customer } = request;
  const { cpf } = request.headers;

  const balance = getBalance(customer.statement);

  const customerIndex = customers.findIndex((customer) => customer.cpf === cpf);

  if (customerIndex < 0) {
    return response.status.json({ error: "Customer Not found" });
  }
  if (balance > 0) {
    return response 
      .status(401)
      .json({
        error:
          "It is not possible to delete an account with a positive balance",
      });
  }

  customers.splice(customerIndex, 1);
  return response.status(200).send();
});

app.get("/balance", verifyIfExistingCPF, (request, response) => {
  const { customer } = request;
  const balance = getBalance(customer.statement);

  response.json(`Seu saldo ?? de R$${balance}`);
});

app.listen(3333, () => {
  console.clear();
  return console.log("Running Server ???? ");
});
