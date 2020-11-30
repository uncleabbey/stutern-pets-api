const express = require("express");
const routes = require("./routes");
const { connectMongoose } = require("./models")

const app = express();

connectMongoose("mongodb://localhost/pets")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  return res.send("welcome to the pet api ")
})
app.use(routes)

app.use((req, res, next) => {
  return res.status(404).send("page not found")
})

app.use((error, req, res, next) => {
    const { status, error: err } = error;
  res.status(status);
  return res.json({
    status: "error",
    error: err,
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening at port: ${port}`))