const express = require("express");
const joi = require("joi");
const app = express();
app.use(express.json());

const customers = [
  { title: "George", id: 1 },
  { title: "Mike", id: 2 },
  { title: "Chuck", id: 3 },
  { title: "Steffine", id: 4 },
  { title: "Kathy", id: 5 }
];
//get
app.get("/", (req, res) => {
  res.send("Welcome to first Rest API");
});

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer)
    res
      .status(400)
      .send(
        `<h2 style="font-family:verdana; color:red">Oops...Cant find what you are lloking for</h2>`
      );
  res.send(customer);
});
//post
app.post("/api/customers", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = {
    id: customers.length + 1,
    title: req.body.title
  };
  customers.push(customer);
  res.send(customer);
});
//put
app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer)
    res
      .status(400)
      .send(
        `<h2 style="font-family:verdana; color:red">Oops...Cant find what you are lloking for</h2>`
      );
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  customer.titlereq.body.title;
  req.send(customer);
});
//Delete
app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer)
    res
      .status(400)
      .send(
        `<h2 style="font-family:verdana; color:red">Oops...Cant find what you are lloking for</h2>`
      );
  const index = customers.indexOf(customer);
  customers.splice(index, 1);
  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    title: joi
      .string()
      .min(3)
      .required()
  };
  return joi.validateCustomer(customer, schema);
}

const port = process.env.Port || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
