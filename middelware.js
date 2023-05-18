const express = require("express");
const port = 4000;
const app = express();
app.use(express.json());

function logger(req, res, next) {
  console.log("this is from middler");
  next();
}
function auth(req, res, next) {
  console.log("Auth");
  next();
}
  app.get('/',(req,res,)=>{
        // res.send("ho ")
        res.sendFile(path.join(__dirname,'../','public','overview.html'))
        // res.sendFile('./../public/overview.html')
    })
app.use("/add-data", (req, res,next) => {
    res.send(
        '<form action="/product" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form>'
        );
        console.log(req.body)
});
app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect('/')
});

app.listen(port, () => {
  console.log("Server is listninig on port 4000");
});
