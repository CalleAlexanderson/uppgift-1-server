const mongoose = require("mongoose");
require("dotenv").config();

const staffAcountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    }
});

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    cost: {
        type: Number,
        required: true
    },
    menu: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    restrictions: {
        type: [String],
        required: true
    },
    whoAdded: {
        type: String,
        required: true
    },
    whenAdded: {
        type: Date,
        required: true
    }
});

let menuItems = [
    {
        "name": "Lökringar",
        "cost": 39,
        "description": "serveras med valfri dippsås",
        "restrictions": ["vegan"],
        "menu": "Förrätter",
        "category": "Friterat",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Mozarella sticks",
        "cost": 39,
        "description": "",
        "restrictions": ["dairy"],
        "menu": "Förrätter",
        "category": "Friterat",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Kyckling vingar",
        "cost": 49,
        "description": "serveras med valfri dippsås",
        "restrictions": [],
        "menu": "Förrätter",
        "category": "Friterat",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Scampi",
        "cost": 69,
        "description": "serveras med valfri dippsås",
        "restrictions": ["fish"],
        "menu": "Förrätter",
        "category": "Friterat",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Gurksallad",
        "cost": 35,
        "description": "gurka och strimlad rödlök",
        "restrictions": ["vegan"],
        "menu": "Förrätter",
        "category": "Sallad",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Bondsallad",
        "cost": 39,
        "description": "finhackad lök, gurka, tomat och paprika",
        "restrictions": ["vegan"],
        "menu": "Förrätter",
        "category": "Sallad",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Breadsticks",
        "cost": 29,
        "description": "serveras med valfri dippsås",
        "restrictions": ["vegan"],
        "menu": "Förrätter",
        "category": "Bröd",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Vitlöksbröd",
        "cost": 39,
        "description": "",
        "restrictions": [],
        "menu": "Förrätter",
        "category": "Bröd",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Mini mackor",
        "cost": 69,
        "description": "isbergssallad, tomat, ost och rökt skinka",
        "restrictions": ["dairy"],
        "menu": "Förrätter",
        "category": "Bröd",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Kyckling vingar",
        "cost": 109,
        "description": "täckta i någon av våra hemgjorda såser, buffalo, spicy-honey eller parmesan, serveras med två valfria dippsåser",
        "restrictions": [],
        "menu": "Kyckling",
        "category": "Vingar",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Korean-styled chicken wings",
        "cost": 119,
        "description": "täckta i gochujang sås och toppat med sesamfrön och strimlad salladslök, serveras med två valfria dippsåser",
        "restrictions": [],
        "menu": "Kyckling",
        "category": "Vingar",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Ceasar sallad",
        "cost": 129,
        "description": "",
        "restrictions": ["fish", "dairy"],
        "menu": "Sallader",
        "category": "Sallad",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Banana split",
        "cost": 89,
        "description": "serverad med vispgrädde, chokladsås och krossade nötter",
        "restrictions": ["nuts", "dairy"],
        "menu": "Efterrätter",
        "category": "Glass",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Panna cotta",
        "cost": 59,
        "description": "täckt i en hemgjord nougat kräm",
        "restrictions": ["dairy", "pork", "nuts"],
        "menu": "Efterrätter",
        "category": "Efterrätt",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Lasagne",
        "cost": 159,
        "description": "gjord på en mix av högrev och fläsksida",
        "restrictions": ["pork", "dairy"],
        "menu": "Specialrätter",
        "category": "Specialrätt",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Laddad bakpotatis",
        "cost": 29,
        "description": "serveras med förskost, bacon och gräslök",
        "restrictions": ["dairy"],
        "menu": "Tillägg",
        "category": "Maträtt",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Ranch",
        "cost": 9,
        "description": "",
        "restrictions": ["dairy"],
        "menu": "Tillägg",
        "category": "dippsås",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    }
]

let staffAcounts = [
    {
        "username": "Jec",
        "password": "Password",
        "fullname": "Calle Alexanderson"
    },
    {
        "username": "Kon",
        "password": "Password",
        "fullname": "Julius Sköld"
    },
    {
        "username": "Lars",
        "password": "Password",
        "fullname": "Linus Kindbom"
    }
]

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to mongoDB");
}).catch((err) => {
    console.log("error when connecting to database: " + err);
})

const crypto = require("crypto")
console.log(crypto.randomBytes(64).toString('hex'));


const staffAcount = mongoose.model("staffAcount", staffAcountSchema);
const menuItem = mongoose.model("menuItem", menuItemSchema);

resetDocuments();

async function resetDocuments() {
    const result = await staffAcount.deleteMany({});
    console.log(result);
    const r = await menuItem.deleteMany({});
    console.log(r);
    
    staffAcount.insertMany(staffAcounts)
    menuItem.insertMany(menuItems)
}
