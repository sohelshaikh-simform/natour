const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { default: mongoose } = require("mongoose");
const app = require("./app");

const port = 3000 || process.env.PORT;

mongoose
  .connect("mongodb://localhost:27017/natours", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("success"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Port is listening on port 3000");
});
