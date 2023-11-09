const { Sequelize , DataTypes} = require('sequelize');

const connection = new Sequelize('lavocato', 'root', 'root', {
    host: 'localhost',
    dialect: "mysql"
  });

  try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
  const User=require("./user.model")(connection,DataTypes)
  const Lawyer= require("./lawyers.model")(connection,DataTypes)
  const Report=require("./report.model")(connection,DataTypes)
  const Media=require("./media.model")(connection,DataTypes)
  const Admin=require("./admin.model")(connection,DataTypes)
  const Appointment=require("./appointment.model")(connection,DataTypes)
  const Availavility= require("./availability.model")(connection,DataTypes)
  const Case= require("./cases.model")(connection,DataTypes)
  const Category= require("./category.model")(connection,DataTypes)
  const Chat= require("./chats.model")(connection,DataTypes)
  const Conversation= require("./conversation.model")(connection,DataTypes)
  const Notification= require("./notification.model")(connection,DataTypes)
  const Payment = require("./payment.model")(connection,DataTypes)
  const Phase= require("./phases.model")(connection,DataTypes)
  const Rating= require("./rating.model")(connection,DataTypes)
  const Receipt= require("./receipts.model")(connection,DataTypes)
  const TaskList = require("./tasklist.model")(connection,DataTypes)
  const User_Lawyer= require("./user_lawyer")(connection,DataTypes)

  
    
  User.belongsToMany(Lawyer,{through:User_Lawyer})
  Lawyer.belongsToMany(User,{through:User_Lawyer})
  
  User.hasMany(Report)
  Report.belongsTo(User)

  User.hasMany(Media)
  Media.belongsTo(User)

  User.hasMany(Appointment)
  Appointment.belongsTo(User)
  
  User.hasMany(Rating)
  Rating.belongsTo(User)

  User.hasMany(Case)
  Case.belongsTo(User)

  User.hasMany(Conversation)
  Conversation.belongsTo(User)
  
  User.hasMany(Notification)
  Notification.belongsTo(User)


  Lawyer.hasMany(Availavility)
  Availavility.belongsTo(Lawyer)

  Lawyer.hasMany(Rating)
  Rating.belongsTo(Lawyer)

  Lawyer.hasMany(TaskList)
  TaskList.belongsTo(Lawyer)

  Lawyer.hasMany(Media)
  Media.belongsTo(Lawyer)

  Lawyer.hasMany(Category)
  Category.belongsTo(Lawyer)

  Lawyer.hasMany(Chat)
  Chat.belongsTo(Lawyer)

  Lawyer.hasMany(Conversation)
  Conversation.belongsTo(Lawyer)

  Lawyer.hasMany(Notification)
  Notification.belongsTo(Lawyer)

  Lawyer.hasMany(Payment)
  Payment.belongsTo(Lawyer)

  Lawyer.hasMany(Receipt)
  Receipt.belongsTo(Lawyer)

  Lawyer.hasMany(Case)
  Case.belongsTo(Lawyer)



  Case.hasMany(Phase)
  Phase.belongsTo(Case)

  Case.hasMany(Media)
  Media.belongsTo(Case)



  Phase.hasMany(Media)
  Media.belongsTo(Phase)

  



  connection.sync({ alter: true })
  .then(() => console.log("tables are created"))
  .catch((err) => console.log(err))


 
 

  module.exports={User,Phase,Case}