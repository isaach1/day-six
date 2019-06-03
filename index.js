const express = require("express");
const path = require("path");
const logger = ("./src/utilities/middleware/logger");

const app = express(); 

app.use(logger);

// var properties = new Array();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const usersRouter = require("./user/index");
app.use("/api/users", require("./src/api/users-routes"));
app.use("/api/auth", require("./src/api/auth-routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.get("/", (req, res) => {
//     console.log(req.headers);
//     res.send("<p>Hello</p>");
// });

// app.get("/properties", (req, res) => {
//     // properties.push({
//     //     id: 1,
//     //     name: "One",
//     //     location: "Lisbon"
//     // });
//     res.json(properties);
// });

// app.post("/properties", (req, res) => {
//     const property = req.body;
//     properties.push(property);
//     res.json(property);
// });

// app.listen(3000, (err) => {
//     if (err) {
//         console.log("Error, not working");
//         return ;
//     }
    
//     console.log("Server listening port 3000");
// });

// console.log("running, its working");   