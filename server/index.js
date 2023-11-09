const express = require('express');

require("./models/index")
const routerPhase= require('./routes/phases.route')



let app = express();

app.use(express.json())


app.use("/api/phase",routerPhase);


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

