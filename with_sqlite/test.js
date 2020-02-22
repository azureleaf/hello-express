let server = require("express")();
server.get("/", function(req, res) {
  res.send("This is Anfield.");
});
server.listen(3000);
