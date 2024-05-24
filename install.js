const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");

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

const oldMenuItemSchema = new mongoose.Schema({
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
    whoRemoved: {
        type: String,
        required: true
    },
    whenRemoved: {
        type: Date,
        required: true
    }
});

const reviewsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    whenMade: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
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
        "description": "täckta i någon av våra hemgjorda såser, buffalo, spicy-honey eller parmesan, serveras med valfri dippsås",
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
    },
    {
        "name": "Surf N Turf",
        "cost": 229,
        "description": "140 gram oxfile serverat med tigerräkor",
        "restrictions": ["fish"],
        "menu": "Kött",
        "category": "Nötkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Bearnaise",
        "cost": 9,
        "description": "",
        "restrictions": ["dairy"],
        "menu": "Tillägg",
        "category": "dippsås",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Curry",
        "cost": 9,
        "description": "",
        "restrictions": ["vegan"],
        "menu": "Tillägg",
        "category": "dippsås",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Sötsur",
        "cost": 9,
        "description": "",
        "restrictions": ["vegan"],
        "menu": "Tillägg",
        "category": "dippsås",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Vitlök",
        "cost": 9,
        "description": "",
        "restrictions": ["vegan"],
        "menu": "Tillägg",
        "category": "dippsås",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Hot chili",
        "cost": 9,
        "description": "",
        "restrictions": ["vegan"],
        "menu": "Tillägg",
        "category": "dippsås",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Cheddar",
        "cost": 9,
        "description": "",
        "restrictions": [],
        "menu": "Tillägg",
        "category": "dippsås",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Chicharon",
        "cost": 89,
        "description": "gjord på sidkött",
        "restrictions": ["pork"],
        "menu": "Kött",
        "category": "Fläskkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Lamm innerfilé",
        "cost": 189,
        "description": "serveras med saffransris",
        "restrictions": [],
        "menu": "Kött",
        "category": "Lammkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Rökt bog",
        "cost": 169,
        "description": "serveras med saffransris",
        "restrictions": ["pork"],
        "menu": "Kött",
        "category": "Fläskkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Fläskkarré",
        "cost": 149,
        "description": "serveras med potatisklyftor och bearnaise",
        "restrictions": ["pork"],
        "menu": "Kött",
        "category": "Fläskkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Entrecôte",
        "cost": 199,
        "description": "serveras med potatisklyftor och bearnaise",
        "restrictions": [],
        "menu": "Kött",
        "category": "Nötkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Bringa",
        "cost": 209,
        "description": "serveras med potatisklyftor  och bearnaise",
        "restrictions": [],
        "menu": "Kött",
        "category": "Nötkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Ryggbiff",
        "cost": 179,
        "description": "serveras med potatisklyftor  och bearnaise",
        "restrictions": [],
        "menu": "Kött",
        "category": "Nötkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "T-bone-steak",
        "cost": 249,
        "description": "serveras med potatisklyftor och bearnaise",
        "restrictions": [],
        "menu": "Kött",
        "category": "Nötkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Spare ribs",
        "cost": 149,
        "description": "täckt med barbeque rub",
        "restrictions": ["pork"],
        "menu": "Ribs",
        "category": "Fläskkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Lamm revben",
        "cost": 149,
        "description": "täckt med barbeque rub",
        "restrictions": [],
        "menu": "Ribs",
        "category": "Lammkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Kamben",
        "cost": 159,
        "description": "täckt med spicy-honey rub",
        "restrictions": ["pork"],
        "menu": "Ribs",
        "category": "Fläskkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Tonfisk",
        "cost": 159,
        "description": "serveras med potatisklyftor och bearnaise",
        "restrictions": ["fisk"],
        "menu": "Fisk",
        "category": "Fisk",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Hummer",
        "cost": 289,
        "description": "injicerad med smörsås, serveras med potatisklyftor och bearnaise",
        "restrictions": ["fisk"],
        "menu": "Fisk",
        "category": "Skaldjur",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Biggie",
        "cost": 229,
        "description": "180g högrevsburgare, karamelliserad lök, cheddarost, saltgurka, tomat, sallad och husets egna dressing, serveras med pommes frites",
        "restrictions": [],
        "menu": "Burgare",
        "category": "Nötkött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Club sandwhich",
        "cost": 179,
        "description": "grillad kycklingbröst, gurka, tomat, sallad och husets egna dressing, serveras med pommes frites",
        "restrictions": [],
        "menu": "Burgare",
        "category": "Kyckling",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Halloumi burger",
        "cost": 179,
        "description": "grillad halloumi, rödlök, saltgurka, sallad och husets egna dressing, serveras med pommes frites",
        "restrictions": ["vegan"],
        "menu": "Burgare",
        "category": "Vegansk",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Panpizza",
        "cost": 99,
        "description": "pepperoni, mozarella och rödlök",
        "restrictions": [],
        "menu": "Barnmeny",
        "category": "Pizza",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Biggie small",
        "cost": 139,
        "description": "90g högrevsburgare, karamelliserad lök, cheddarost, saltgurka, tomat, sallad och husets egna dressing, serveras med pommes frites",
        "restrictions": [],
        "menu": "Barnmeny",
        "category": "Burgare",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Fullhouse",
        "cost": 899,
        "description": "chicharon, spare ribs, t-bone-steak och bringa ",
        "restrictions": ["pork"],
        "menu": "Combo_Tallrickar",
        "category": "Kött",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Waves",
        "cost": 449,
        "description": "tonfisk, tigerräkor och hummer",
        "restrictions": ["fisk"],
        "menu": "Combo_Tallrickar",
        "category": "Fisk",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Coca-cola",
        "cost": 29,
        "description": "",
        "restrictions": [],
        "menu": "Drickor",
        "category": "Läsk",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Tokara",
        "cost": 299,
        "description": "",
        "restrictions": [],
        "menu": "Drickor",
        "category": "Vin",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    },
    {
        "name": "Negroni",
        "cost": 59,
        "description": "",
        "restrictions": [],
        "menu": "Drickor",
        "category": "Cocktails",
        "whoAdded": "Calle Alexanderson",
        "whenAdded": new Date()
    }

]

let oldMenuItems = [
    {
        "name": "Calamares",
        "cost": 59,
        "description": "serveras med valfri dippsås",
        "restrictions": [],
        "menu": "Förrätter",
        "category": "Friterat",
        "whoRemoved": "Calle Alexanderson",
        "whenRemoved": new Date()
    },
    {
        "name": "Skagenröra toast",
        "cost": 49,
        "description": "",
        "restrictions": ["dairy"],
        "menu": "Förrätter",
        "category": "Bröd",
        "whoRemoved": "Calle Alexanderson",
        "whenRemoved": new Date()
    },
]

let reviews = [
    {
        "name": "Calle Alexanderson",
        "whenMade": new Date,
        "content": "Kyckligen var god",
        "stars": 4
    },
    {
        "name": "Julius Sköld",
        "whenMade": new Date,
        "content": "Alldeles för lite bearnaise",
        "stars": 1
    },
    {
        "name": "Linus Kindbom",
        "whenMade": new Date,
        "content": "För lite kött",
        "stars": 3
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
const oldMenuItem = mongoose.model("oldMenuItem", oldMenuItemSchema);
const review = mongoose.model("review", reviewsSchema);


resetDocuments();

async function resetDocuments() {
    const result1 = await staffAcount.deleteMany({});
    console.log(result1);
    const result2 = await menuItem.deleteMany({});
    console.log(result2);
    const result3 = await oldMenuItem.deleteMany({});
    console.log(result3);
    const result4 = await review.deleteMany({});
    console.log(result4);

    password = await bcrypt.hash("Password", 10);
    console.log(password);

    let staffAcounts = [
        {
            "username": "Jec",
            "password": password,
            "fullname": "Calle Alexanderson"
        },
        {
            "username": "Kon",
            "password": password,
            "fullname": "Julius Sköld"
        },
        {
            "username": "Lars",
            "password": password,
            "fullname": "Linus Kindbom"
        }
    ]
    
    staffAcount.insertMany(staffAcounts)
    menuItem.insertMany(menuItems)
    oldMenuItem.insertMany(oldMenuItems)
    review.insertMany(reviews)
}
