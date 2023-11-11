const express = require('express');
const PhaseRoute = require("./routes/phases.route")
var cors = require('cors');


require("./models/index")
const routerPhase= require('./routes/phases.route')
const routerAdmin = require('./routes/admin.route')
const routerAppointment = require('./routes/appointment.route')
const routerAvailability = require('./routes/availability.route')
const routerCase = require('./routes/cases.route')
const routerUser = require('./routes/user.route')
const routerCategory = require('./routes/category.route')
const routerLawyer = require('./routes/lawyers.route')
const routerConversation = require('./routes/conversation.route')
const routerChat = require('./routes/chats.route')
const routerTask = require('./routes/tasklist.route')
const routerPayment = require('./routes/payment.route')
const routerRating = require('./routes/rating.route')
const routerReceipt = require('./routes/receipt.route')
const routerReport = require('./routes/report.route')
const routerMedia = require('./routes/media.route')
const routerNotification = require('./routes/notification.route')
const routerEdge = require("./routes/edges.route")




let app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json())


app.use("/api/phase",routerPhase);

app.use("/api/admin",routerAdmin);

app.use("/api/appointment",routerAppointment);

app.use("/api/availability",routerAvailability);

app.use("/api/case",routerCase);

app.use("/api/user",routerUser);

app.use("/api/category",routerCategory);

app.use("/api/lawyer",routerLawyer);

app.use("/api/conversation",routerConversation);

app.use("/api/chat",routerChat);

app.use("/api/task",routerTask);

app.use("/api/payment",routerPayment);

app.use("/api/rating",routerRating);

app.use("/api/receipt",routerReceipt);

app.use("/api/report",routerReport);

app.use("/api/media",routerMedia);

app.use("/api/notification",routerNotification);

app.use("/api/edge", routerEdge);





let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

