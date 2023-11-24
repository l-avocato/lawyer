const { Sequelize, DataTypes } = require("sequelize");

const connection = new Sequelize("lavocato", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

try {
  connection.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const User = require("./user.model")(connection, DataTypes);
const Lawyer = require("./lawyers.model")(connection, DataTypes);
const Report = require("./report.model")(connection, DataTypes);
const Media = require("./media.model")(connection, DataTypes);
const Admin = require("./admin.model")(connection, DataTypes);
const Appointment = require("./appointment.model")(connection, DataTypes);
const Availability = require("./availability.model")(connection, DataTypes);
const Case = require("./cases.model")(connection, DataTypes);
const Category = require("./category.model")(connection, DataTypes);
const Chat = require("./chats.model")(connection, DataTypes);
const Conversation = require("./conversation.model")(connection, DataTypes);
const Notification = require("./notification.model")(connection, DataTypes);
const Payment = require("./payment.model")(connection, DataTypes);
const Phase = require("./phases.model")(connection, DataTypes);
const Rating = require("./rating.model")(connection, DataTypes);
const Receipt = require("./receipts.model")(connection, DataTypes);
const TaskList = require("./tasklist.model")(connection, DataTypes);
const User_Lawyer = require("./user_lawyer")(connection, DataTypes);
const Edge = require("./edge.model")(connection, DataTypes);
const Process = require("./process.model")(connection, DataTypes);
const Note = require("./note.model")(connection, DataTypes);
const Files = require("./Files.model")(connection, DataTypes);
const Folder = require("./Folder.model")(connection, DataTypes);

User.belongsToMany(Lawyer, { through: User_Lawyer });
Lawyer.belongsToMany(User, { through: User_Lawyer });

User.hasMany(Report);
Report.belongsTo(User);

User.hasMany(Media);
Media.belongsTo(User);

User.hasMany(Appointment);
Appointment.belongsTo(User);

Lawyer.hasMany(Appointment);
Appointment.belongsTo(Lawyer);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Payment);
Payment.belongsTo(User);

User.hasMany(Case);
Case.belongsTo(User);

Process.hasMany(Payment);
Payment.belongsTo(Process);

Lawyer.hasMany(Payment);
Payment.belongsTo(Lawyer);

Phase.hasMany(Process);
Process.belongsTo(Phase);

Lawyer.hasMany(Note);
Note.belongsTo(Lawyer);

User.hasMany(Note);
Note.belongsTo(User);

User.hasMany(Conversation);
Conversation.belongsTo(User);

User.hasMany(Notification);
Notification.belongsTo(User);

Lawyer.hasMany(Availability);
Availability.belongsTo(Lawyer);

// Lawyer.hasOne(Lawyer);
// Lawyer.belongsTo(Category);

Lawyer.hasMany(Rating);
Rating.belongsTo(Lawyer);

Lawyer.hasMany(TaskList);
TaskList.belongsTo(Lawyer);

Lawyer.hasMany(Media);
Media.belongsTo(Lawyer);

Note.hasMany(Media);
Media.belongsTo(Note);

Category.hasOne(Lawyer);
Lawyer.belongsTo(Category);

Lawyer.hasMany(Chat);
Chat.belongsTo(Lawyer);

Lawyer.hasMany(Conversation);
Conversation.belongsTo(Lawyer);

Lawyer.hasMany(Notification);
Notification.belongsTo(Lawyer);

Lawyer.hasMany(Payment);
Payment.belongsTo(Lawyer);

Lawyer.hasMany(Receipt);
Receipt.belongsTo(Lawyer);

Phase.hasMany(Note);
Note.belongsTo(Phase);

Case.hasMany(Phase);
Phase.belongsTo(Case);

Case.hasMany(Media);
Media.belongsTo(Case);

Case.hasMany(Note);
Note.belongsTo(Case);

Phase.hasMany(Media);
Media.belongsTo(Phase);

Conversation.hasMany(Chat);
Chat.belongsTo(Conversation);

Conversation.hasMany(Media);
Media.belongsTo(Conversation);

Conversation.hasMany(Notification);
Notification.belongsTo(Conversation);

Phase.hasMany(Folder);
Folder.belongsTo(Phase);

// connection
//   .sync({ alter: true })
//   .then(() => console.log("tables are created"))
//   .catch((err) => console.log(err));

const db = {};
db.User = User;
db.Lawyer = Lawyer;
db.Report = Report;
db.Media = Media;
db.Admin = Admin;
db.Appointment = Appointment;
db.Availability = Availability;
db.Case = Case;
db.Category = Category;
db.Chat = Chat;
db.Conversation = Conversation;
db.Notification = Notification;
db.Payment = Payment;
db.Phase = Phase;
db.Rating = Rating;
db.Receipt = Receipt;
db.TaskList = TaskList;
db.User_Lawyer = User_Lawyer;
db.Edge = Edge;
db.Note = Note;
db.Process = Process;
db.Files = Files;
db.Folder = Folder;

module.exports = db;
