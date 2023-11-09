const express = require('express');
const PhaseRoute = require("./routes/phases.route")

require("./models/index")
let app = express();

app.use(express.json())




let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

