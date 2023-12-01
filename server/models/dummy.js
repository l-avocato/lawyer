const {
  User,
  Lawyer,
  Admin,
  Appointment,
  Case,
  Availability,
  Category,
  Chat,
  Conversation,
  Media,
  Notification,
  Payment,
  Phase,
  Rating,
  Receipt,
  Report,
  TaskList,
  User_Lawyer,
  Edge,
  Files,
  Folder,
  Note,
  Process,
} = require("./index");

const dummyLawyersData = [
  {
    fullName: "Nour Habibi",
    email: "nour@example.com",
    password: "securepass123",
    corfirmedPassword: "securepass123",
    adress: "789 Elm St, Tunis",
    phoneNumber: 3456789012,
    ImageUrl: "hgfghhhg",
    gender: "Female",
    birthDate: "1988-07-22",
    CIN: 456789012,
    langitude: 34.567,
    latitude: 78.901,
    IsBlocked: false,
    isAvailable: true,
    price: 100,
    certifications: "Civil Rights Certification",
    field: "Civil Law",
    IsVerified: true,
    categoryId:1
  },
  {
    fullName: "Seif Mezigh",
    email: "seifmezigh@example.com",
    password: "strongpassword456",
    corfirmedPassword: "strongpassword456",
    adress: "567 Pine St, Tunis",
    phoneNumber: 5678901234,
    ImageUrl:"sdfvgbnm",
    gender: "Male",
    birthDate: "1980-03-10",
    CIN: 123987456,
    langitude: 45.678,
    latitude: 90.123,
    IsBlocked: false,
    isAvailable: true,
    price: 90,
    certifications: "Corporate Law Certification",
    field: "Corporate Law",
    IsVerified: true,
    categoryId:2
  },
  {
    fullName: "Hadil Habibi",
    email: "hadilhabibi@example.com",
    password: "eva123pass",
    corfirmedPassword: "eva123pass",
    adress: "234 Maple St, Tunis",
    phoneNumber: 6789012345,
    ImageUrl:"gfnnb",
    gender: "Female",
    birthDate: "1995-12-05",
    CIN: 789012345,
    langitude: 56.789,
    latitude: 12.345,
    IsBlocked: false,
    isAvailable: true,
    price: 110,
    certifications: "Immigration Law Certification",
    field: "Immigration Law",
    IsVerified: true,
    categoryId:2
  },
  {
    fullName: "Ahmed Irmani",
    email: "ahmedirmani@example.com",
    password: "davidpass789",
    corfirmedPassword: "davidpass789",
    adress: "890 Oak St, Woodland",
    phoneNumber: 8901234567,
    ImageUrl:"dfghj"
,    gender: "Male",
    birthDate: "1983-09-15",
    CIN: 234567890,
    langitude: 67.89,
    latitude: 23.456,
    IsBlocked: false,
    isAvailable: true,
    price: 120,
    certifications: "Intellectual Property Law Certification",
    field: "Intellectual Property Law",
    IsVerified: true,
    categoryId:3
  },
  {
    fullName: "Elyes Fattoum",
    email: "elyesfattoum@example.com",
    password: "gracepass987",
    corfirmedPassword: "gracepass987",
    adress: "123 Birch St, L'Aouina",
    phoneNumber: 9012345678,
    ImageUrl:"fghjgh",
    gender: "Male",
    birthDate: "1987-04-18",
    CIN: 345678901,
    langitude: 78.901,
    latitude: 34.567,
    IsBlocked: false,
    isAvailable: true,
    price: 80,
    certifications: "Environmental Law Certification",
    field: "Environmental Law",
    IsVerified: true,
    categoryId:4
  },
  {
    fullName: "Mounir Ben Salha",
    email: "mounirbensalha@example.com",
    password: "gracepass987",
    corfirmedPassword: "gracepass987",
    adress: "123 Birch St, Tunis",
    phoneNumber: 9012345678,
    ImageUrl:"hgfghj",
    gender: "Male",
    birthDate: "1987-04-18",
    CIN: 345678901,
    langitude: 78.902,
    latitude: 34.569,
    IsBlocked: false,
    isAvailable: true,
    price: 180,
    certifications: "Environmental Law Certification",
    field: "Environmental Law",
    IsVerified: true,
    categoryId:5
  },
  {
    fullName: "Abir Moussi",
    email: "abirmoussi@example.com",
    password: "gracepass987",
    corfirmedPassword: "gracepass987",
    adress: "123 Birch St, Tunis",
    phoneNumber: 9012345678,
    ImageUrl: "sdfghj",
    gender: "Female",
    birthDate: "1987-04-18",
    CIN: 345678901,
    langitude: 78.905,
    latitude: 34.567,
    IsBlocked: false,
    isAvailable: true,
    price: 160,
    certifications: "Environmental Law Certification",
    field: "Environmental Law",
    IsVerified: true,
    categoryId:5
  },
  {
    fullName: "Seifeddin Makhlouf",
    email: "seifmakhlouf@example.com",
    password: "gracepass987",
    corfirmedPassword: "gracepass987",
    adress: "123 Birch St, Tunis",
    phoneNumber: 9012345678,
    ImageUrl:
      "dfghjkl",
    gender: "Male",
    birthDate: "1987-04-18",
    CIN: 345678901,
    langitude: 78.907,
    latitude: 34.566,
    IsBlocked: false,
    isAvailable: true,
    price: 90,
    certifications: "Environmental Law Certification",
    field: "Environmental Law",
    IsVerified: true,
    categoryId:6
  },
  {
    fullName: "Maha Benessib",
    email: "mahabenessib@example.com",
    password: "gracepass987",
    corfirmedPassword: "gracepass987",
    adress: "123 Birch St, Tunis",
    phoneNumber: 9012345678,
    ImageUrl:"sdfghjk",
    gender: "Female",
    birthDate: "1987-04-18",
    CIN: 345678901,
    langitude: 78.907,
    latitude: 34.566,
    IsBlocked: false,
    isAvailable: true,
    price: 90,
    certifications: "Environmental Law Certification",
    field: "Environmental Law",
    IsVerified: true,
    categoryId:8
  },
  {
    fullName: "Sana Bey",
    email: "sanabeyy@example.com",
    password: "gracepass987",
    corfirmedPassword: "gracepass987",
    adress: "123 Birch St, Tunis",
    phoneNumber: 9012345678,
    ImageUrl:
      "dfghjkl",
    gender: "Female",
    birthDate: "1987-04-18",
    CIN: 345678901,
    langitude: 78.907,
    latitude: 34.566,
    IsBlocked: false,
    isAvailable: true,
    price: 90,
    certifications: "Environmental Law Certification",
    field: "Environmental Law",
    IsVerified: true,
    categoryId:7
  },
];

const dummyUserData = [
  {
    fullName: "Selim Louhichi",
    email: "selimlouhichi@example.com",
    password: "password123",
    phoneNumber: 1234567890,
    adress: "456 Pine St, Citytown",
    ImageUrl:"dfghnm,",
    gender: "Male",
    birthDate: "1992-03-15",
    CIN: 123456789,
    langitude: 12.345,
    latitude: 45.678,
    IsBlocked: false,
  },
  {
    fullName: "Sana Bey",
    email: "beyysana@example.com",
    password: "securepass456",
    phoneNumber: 9876543210,
    adress: "789 Oak St, Villagetown",
    ImageUrl:"dfghjk",
    gender: "Female",
    birthDate: "1985-08-22",
    CIN: 987654321,
    langitude: 23.456,
    latitude: 67.89,
    IsBlocked: false,
  },
  {
    fullName: "Eya Ben Ghnaya",
    email: "benghnayaeya@example.com",
    password: "strongpass789",
    phoneNumber: 5678901234,
    adress: "234 Maple St, Hamletville",
    ImageUrl:"cvbnm",
    gender: "Female",
    birthDate: "1990-06-10",
    CIN: 345678901,
    langitude: 34.567,
    latitude: 78.901,
    IsBlocked: true,
  },
  {
    fullName: "Yassin Jandoubi",
    email: "yassinjandoubi@example.com",
    password: "evapass123",
    phoneNumber: 6789012345,
    adress: "890 Elm St, Townsville",
    ImageUrl:"cvbnm,",
    gender: "Male",
    birthDate: "1988-12-05",
    CIN: 789012345,
    langitude: 45.678,
    latitude: 90.123,
    IsBlocked: false,
  },
  {
    fullName: "Bellhasn Sehli",
    email: "belhssansehli@example.com",
    password: "davidpass456",
    phoneNumber: 8901234567,
    adress: "123 Birch St, Riverside",
    ImageUrl:"xcvbn",
    gender: "Male",
    birthDate: "1983-04-18",
    CIN: 234567890,
    langitude: 56.789,
    latitude: 12.345,
    IsBlocked: true,
  },
  {
    fullName: "Khaoula Ben Thlija",
    email: "khaoula@example.com",
    password: "davidpass456",
    phoneNumber: 8901234567,
    adress: "123 Birch St, Riverside",
    ImageUrl:"xcvbnm",
    gender: "Female",
    birthDate: "1983-04-18",
    CIN: 234567890,
    langitude: 56.789,
    latitude: 12.345,
    IsBlocked: true,
  },
  {
    fullName: "Firas Bey",
    email: "firasbey@example.com",
    password: "davidpass456",
    phoneNumber: 8901234567,
    adress: "123 Birch St, Riverside",
    ImageUrl:"xcvbnm",
    gender: "Male",
    birthDate: "1983-04-18",
    CIN: 234567890,
    langitude: 56.789,
    latitude: 12.345,
    IsBlocked: true,
  },
  {
    fullName: "Aymen Makhlouf ",
    email: "aymenmakhlouf@example.com",
    password: "davidpass456",
    phoneNumber: 8901234567,
    adress: "123 Birch St, Riverside",
    ImageUrl:"zxcvbn",
    gender: "Male",
    birthDate: "1983-04-18",
    CIN: 234567890,
    langitude: 56.789,
    latitude: 12.345,
    IsBlocked: true,
  },
];

const dummyTaskListData = [
  {
    title: "Meeting with client",
    description:
      "Prepare and submit the project proposal by the end of the week.",
    isCompleted: false,
    deadline: "2023-12-15",
  },
  {
    title: "Court Hearing",
    description:
      "Conduct a thorough review of the project's codebase and provide feedback.",
    isCompleted: true,
    deadline: "2023-11-30",
  },
  {
    title: "Client Meeting",
    description:
      "Schedule and attend a meeting with the client to discuss project updates.",
    isCompleted: false,
    deadline: "2023-12-10",
  },
  {
    title: "Client Meeting",
    description: "Adress and fix reported bugs in the software.",
    isCompleted: false,
    deadline: "2023-12-05",
  },
  {
    title: "Documentation Update",
    description:
      "Update project documentation to reflect recent changes and improvements.",
    isCompleted: true,
    deadline: "2023-11-25",
  },
];

const dummyAdminData = [
  {
    fullName: "Admin User 1",
    email: "admin1@example.com",
    password: "adminpass123",
  },
  {
    fullName: "Admin User 2",
    email: "admin2@example.com",
    password: "adminpass456",
  },
  {
    fullName: "Admin User 3",
    email: "admin3@example.com",
    password: "adminpass789",
  },
  {
    fullName: "Admin User 4",
    email: "admin4@example.com",
    password: "adminpassabc",
  },
  {
    fullName: "Admin User 5",
    email: "admin5@example.com",
    password: "adminpassxyz",
  },
];

const dummyAppointmentData = [
  {
    date: "2023-12-01",
    time: "10:00",
    reason: "Initial Consultation",
    accepted: "accepted",
  },
  {
    date: "2023-11-28",
    time: "02:30",
    reason: "Follow-up Meeting",
    accepted: "declined",
  },
  {
    date: "2023-12-05",
    time: "11:45",
    reason: "Legal Advice Session",
    accepted: "pending",
  },
  {
    date: "2023-11-29",
    time: "03:15",
    reason: "Contract Review",
    accepted: "accepted",
  },
  {
    date: "2023-12-08",
    time: "09:30",
    reason: "Mediation Session",
    accepted: "pending",
  },
];

const dummyAvailabilityData = [
  {
    date: "2023-12-01",
    time: "10:00",
    available: true,
  },
  {
    date: "2023-11-28",
    time: "02:30",
    available: false,
  },
  {
    date: "2023-12-05",
    time: "11:45",
    available: true,
  },
  {
    date: "2023-11-29",
    time: "03:15",
    available: true,
  },
  {
    date: "2023-12-08",
    time: "09:30",
    available: false,
  },
];

const dummyCasesData = [
  {
    title: "Divorce Case",
    details: "Handling divorce proceedings for Mr. and Mrs. Johnson.",
    step: "Gathering evidence",
    number: 123456,
    state: "in progress",
  },
  {
    title: "Criminal Defense",
    details: "Defending Mr. Smith in a criminal case involving theft charges.",
    step: "Preparing for trial",
    number: 789012,
    state: "pending",
  },
  {
    title: "Corporate Litigation",
    details: "Representing XYZ Corporation in a legal dispute with ABC Inc.",
    step: "Negotiation with opposing party",
    number: 345678,
    state: "closed",
  },
  {
    title: "Personal Injury Claim",
    details: "Pursuing compensation for a client injured in a car accident.",
    step: "Filing the lawsuit",
    number: 901234,
    state: "in progress",
  },
  {
    title: "Real Estate Transaction",
    details:
      "Assisting in the legal aspects of a real estate sale for a residential property.",
    step: "Reviewing contracts",
    number: 567890,
    state: "closed",
  },
];

const dummyCategoryData = [
  { name: "Tax" },
  { name: "Estate Planning" },
  { name: "Employment and Labor" },
  { name: "Criminal" },
  { name: "Business" },
  { name: "Family" },
  { name: "Intellectual Property" },
  { name: "Immigration" },
  { name: "Other" },
];

const dummyChatsData = [
  {
    message: "Hello, how are you?",
    sender: "UserA",
    receiver: "UserB",
  },
  {
    message: "I'm doing well, thank you! How about you?",
    sender: "UserB",
    receiver: "UserA",
  },
  {
    message: "I have a question about our project deadline.",
    sender: "UserA",
    receiver: "UserB",
  },
  {
    message: "Sure, go ahead and ask. I'll do my best to help.",
    sender: "UserB",
    receiver: "UserA",
  },
  {
    message: "Great! Let's meet tomorrow to discuss it further.",
    sender: "UserA",
    receiver: "UserB",
  },
];

const dummyConversationData = [
  {
    name: "Project Discussion",
    participants: "UserA, UserB",
  },
  {
    name: "Team Meeting",
    participants: "UserB, UserC",
  },
  {
    name: "Family Chat",
    participants: "FamilyMember1, FamilyMember2",
  },
  {
    name: "Event Planning",
    participants: "EventOrganizer, Attendee1, Attendee2",
  },
  {
    name: "Tech Enthusiasts Group",
    participants: "TechGeek1, TechGeek2, TechGeek3",
  },
];

const dummyMediaData = [
  {
    type: "Image",
    url: "https://example.com/image1.jpg",
  },
  {
    type: "Video",
    url: "https://example.com/video1.mp4",
  },
  {
    type: "Audio",
    url: "https://example.com/audio1.mp3",
  },
  {
    type: "Document",
    url: "https://example.com/document1.pdf",
  },
  {
    type: "Image",
    url: "https://example.com/image2.jpg",
  },
];

const dummyNotificationData = [
  {
    title: "New Message",
    body: "You have received a new message from UserA.",
    type: "Message",
  },
  {
    title: "Event Reminder",
    body: "Don't forget about the team meeting tomorrow at 3 PM.",
    type: "Reminder",
  },
  {
    title: "System Update",
    body: "A new system update is available. Please restart your device to apply changes.",
    type: "Update",
  },
  {
    title: "Project Deadline Approaching",
    body: "The deadline for ProjectX is approaching. Make sure all tasks are completed.",
    type: "Alert",
  },
  {
    title: "New Friend Request",
    body: "UserB has sent you a friend request. Accept or decline?",
    type: "FriendRequest",
  },
];

const dummyPaymentData = [
  {
    amount: 1000,
    rest: 500,
    paid: 500,
  },
  {
    amount: 1500,
    rest: 1000,
    paid: 500,
  },
  {
    amount: 800,
    rest: 300,
    paid: 500,
  },
  {
    amount: 2000,
    rest: 1500,
    paid: 500,
  },
  {
    amount: 1200,
    rest: 700,
    paid: 500,
  },
];

const dummyPhaseData = [
  {
    label: "Initial Review",
    positionX: 100,
    positionY: 50,
    background: "gold",
    color: "#333",
    border: "1px solid #222138",
    width: 180,
    borderRadius: "100px",
  },
  {
    label: "Investigation",
    positionX: 250,
    positionY: 120,
    background: "gold",
    color: "#333",
    border: "1px solid #222138",
    width: 180,
    borderRadius: "100px",
  },
  {
    label: "Legal Proceedings",
    positionX: 400,
    positionY: 200,
    background: "gold",
    color: "#333",
    border: "1px solid #222138",
    width: 180,
    borderRadius: "100px",
  },
  {
    label: "Settlement",
    positionX: 550,
    positionY: 300,
    background: "gold",
    color: "#333",
    border: "1px solid #222138",
    width: 180,
    borderRadius: "100px",
  },
  {
    label: "Closure",
    positionX: 700,
    positionY: 400,
    background: "gold",
    color: "#333",
    border: "1px solid #222138",
    width: 180,
    borderRadius: "100px",
  },
];

const dummyRatingData = [
  {
    stars: 4,
    review: "Great service! Very satisfied with the assistance provided.",
  },
  {
    stars: 5,
    review:
      "Excellent experience. The team went above and beyond my expectations.",
  },
  {
    stars: 3,
    review: "Good service, but there is room for improvement in communication.",
  },
  {
    stars: 5,
    review: "Outstanding support! Would highly recommend.",
  },
  {
    stars: 4,
    review: "Professional and timely. Overall, a positive experience.",
  },
];

const dummyLegalReceiptData = [
  {
    name: "Legal Consultation Fee",
    amount: 300,
  },
  {
    name: "Legal Document Drafting",
    amount: 200,
  },
  {
    name: "Court Filing Fees",
    amount: 150,
  },
  {
    name: "Legal Research Services",
    amount: 400,
  },
  {
    name: "Notary Services",
    amount: 50,
  },
];

const dummyComplaintReportData = [
  {
    type: 1,
    body: "Customer Complaint - Defective Product Received",
  },
  {
    type: 2,
    body: "Employee Behavior Complaint - Unprofessional Conduct",
  },
  {
    type: 1,
    body: "Service Complaint - Delayed Response Time",
  },
  {
    type: 3,
    body: "Product Quality Complaint - Substandard Materials",
  },
  {
    type: 2,
    body: "Facility Cleanliness Complaint - Unhygienic Conditions",
  },
];

const dummyLawyerTaskListData = [
  {
    title: "Client Consultation",
    description:
      "Meet with the client to discuss the legal case and gather information.",
    isCompleted: false,
    deadline: "2023-12-10",
  },
  {
    title: "Legal Research",
    description:
      "Conduct research on relevant laws and precedents related to the case.",
    isCompleted: true,
    deadline: "2023-11-28",
  },
  {
    title: "Draft Legal Documents",
    description:
      "Prepare legal documents, including contracts, pleadings, or agreements.",
    isCompleted: false,
    deadline: "2023-12-05",
  },
  {
    title: "Court Appearance",
    description:
      "Appear in court on behalf of the client for case proceedings.",
    isCompleted: false,
    deadline: "2023-12-15",
  },
  {
    title: "Client Follow-up",
    description:
      "Follow up with the client to provide updates on the case and answer questions.",
    isCompleted: true,
    deadline: "2023-11-30",
  },
];

const filesDummyData = [
  {
    name: "Document1",
    link: "https://res.cloudinary.com/dgztaxbvi/image/upload/v1700154211/bey_balkis_dvaoj4.pdf",
  },
  {
    name: "Image2",
    link: "https://res.cloudinary.com/dgztaxbvi/image/upload/v1700165405/IMG_1432_urnray.heic",
  },
  {
    name: "Video3",
    link: "https://res.cloudinary.com/dgztaxbvi/image/upload/v1700156945/IMG_1432_ef8jec_2_scc2mm.heic",
  },
  {
    name: "File4",
    link: "https://res.cloudinary.com/dgztaxbvi/image/upload/v1700141612/Gentle_Reminder_-_Your_Emirates_Group_Application_1015909848_for_Cabin_Crew_Oppo_x6gluc.pdf",
  },
  {
    name: "Presentation5",
    link: "https://res.cloudinary.com/dgztaxbvi/image/upload/v1700073668/IMG_1404_v9t8k9.heic",
  },
];

const dummyFolders = [
  {
    name: "Documents",
  },
  {
    name: "Images",
  },
  {
    name: "Videos",
  },
  {
    name: "Files",
  },
  {
    name: "Presentations",
  },
];

const notesDummy = [
  {
    comment: "This is a note about a meeting",
    seen: true,
    title: "Meeting Notes",
    type: "notes",
    attachedFile:
      "https://res.cloudinary.com/dgztaxbvi/image/upload/v1700154211/bey_balkis_dvaoj4.pdf",
  },
  {
    comment: "Reminder to submit the report by Friday",
    seen: false,
    title: "Report Submission",
    type: "urgent",
    attachedFile: null,
  },
  {
    comment: "Call John regarding the project",
    seen: true,
    title: "Project Discussion",
    type: "personnel",
    attachedFile:
      "https://res.cloudinary.com/dgztaxbvi/image/upload/v1700141612/Gentle_Reminder_-_Your_Emirates_Group_Application_1015909848_for_Cabin_Crew_Oppo_x6gluc.pdf",
  },
  {
    comment: "Shopping list for the week",
    seen: false,
    title: "Grocery Shopping",
    type: "notes",
    attachedFile: null,
  },
  {
    comment: "Emergency contact numbers",
    seen: true,
    title: "Emergency Contacts",
    type: "urgent",
    attachedFile:
      "https://res.cloudinary.com/dgztaxbvi/image/upload/v1700073668/IMG_1404_v9t8k9.heic",
  },
];

module.exports = {
  notesDummy,
  dummyFolders,
  filesDummyData,
  dummyLawyerTaskListData,
  dummyComplaintReportData,
  dummyLegalReceiptData,
  dummyRatingData,
  dummyPaymentData,
  dummyPhaseData,
  dummyNotificationData,
  dummyMediaData,
  dummyConversationData,
  dummyChatsData,
  dummyLawyersData,
  dummyUserData,
  dummyTaskListData,
  dummyAdminData,
  dummyAppointmentData,
  dummyAvailabilityData,
  dummyCasesData,
  dummyCategoryData,
};

Note.bulkCreate(notesDummy)
  .then(() => {
    console.log("Notes data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Files.bulkCreate(filesDummyData)
  .then(() => {
    console.log("Files data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Folder.bulkCreate(dummyFolders)
  .then(() => {
    console.log("Folder data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

User.bulkCreate(dummyUserData)
  .then(() => {
    console.log("User data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Category.bulkCreate(dummyCategoryData)
  .then(() => {
    console.log("Category data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Appointment.bulkCreate(dummyAppointmentData)
  .then(() => {
    console.log("Appointment data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Availability.bulkCreate(dummyAvailabilityData)
  .then(() => {
    console.log("Availability data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Case.bulkCreate(dummyCasesData)
  .then(() => {
    console.log("Case data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Lawyer.bulkCreate(dummyLawyersData)
  .then(() => {
    console.log("Lawyer data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

TaskList.bulkCreate(dummyLawyerTaskListData)
  .then(() => {
    console.log("Task data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Admin.bulkCreate(dummyAdminData)
  .then(() => {
    console.log("Admin data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Chat.bulkCreate(dummyChatsData)
  .then(() => {
    console.log("Chat data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Report.bulkCreate(dummyComplaintReportData)
  .then(() => {
    console.log("Report data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Phase.bulkCreate(dummyPhaseData)
  .then(() => {
    console.log("Phase data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Rating.bulkCreate(dummyRatingData)
  .then(() => {
    console.log("Rating data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Conversation.bulkCreate(dummyConversationData)
  .then(() => {
    console.log("Conversation data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Media.bulkCreate(dummyMediaData)
  .then(() => {
    console.log("Media data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Notification.bulkCreate(dummyNotificationData)
  .then(() => {
    console.log("Notification data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Receipt.bulkCreate(dummyLegalReceiptData)
  .then(() => {
    console.log("Receipt data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });

Payment.bulkCreate(dummyPaymentData)
  .then(() => {
    console.log("Payment data created successfully.");
  })
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  });
