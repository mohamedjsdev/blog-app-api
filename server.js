require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/connectdb");
const { notFound, errorHandler } = require("./middlewares/errors");
const app = express();
const port = process.env.PORT || 7777;

// connect to database
connectToDB()

app.use(express.json());

// routes
app.use("/api/auth" , require("./routes/auth.route"));
app.use("/api/users"  , require("./routes/users.route"));
app.use("/api/posts"  , require("./routes/posts.route"));
app.use("/api/comments" , require("./routes/comments.route"));
app.use("/api/category" , require("./routes/category.route"));

// errors 
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});