const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.send("Olá, mundo!");
});
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


