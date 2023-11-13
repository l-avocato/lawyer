const { User } = require("./index.js")



const rows = [
    {  fullName: 'cherni dhia', email: 'chernidhia@gmail.com', password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false},
    {  fullName: 'haykel ksiksi', email: 'haykelksiksi@gmail.com', password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false},
    {  fullName: 'layla snousi', email: 'laylasnousi@gmail.com', password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false },
    {  fullName: 'Sarra ghrioui', email: 'Sarraghrioui@gmail.com', password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false },
    {  fullName: 'Tarek jdidi', email: 'Tarekjdidi@gmail.com', password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false },
    {  fullName: 'Mohamed mousa', email:'Mohamedmousa@gmail.com', password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false},
    {  fullName: 'Cyrin arfaoui', email: 'Cyrinarfaoui@gmail.com', password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false },
    {  fullName: 'Firas aabess', email: 'Firasaabess@gmail.com',password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false },
    { fullName: 'Rawen chamsi', email: 'Rawenchamsi@gmail.com', password:"123",phoneNumber:"123456789",adress:"13 wallStreet",ImageUrl:"nothing",gender:"male",birthDate:"07/07/1996",CIN:"10048763", langitude:23.45,latitude:24.25,IsBlocked:false },
  ];



  User.bulkCreate(rows)