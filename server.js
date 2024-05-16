const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to mongoDB");
}).catch((err) => {
    console.log("error when connecting to database: " + err);
})

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


const staffAcount = mongoose.model("staffAcount", staffAcountSchema);
const review = mongoose.model("review", reviewsSchema);
const menuItem = mongoose.model("menuItem", menuItemSchema);
const oldMenuItem = mongoose.model("oldMenuItem", oldMenuItemSchema);

// visa menyn
app.get("/menu", async (req, res) => {
    try {
        let result = await menuItem.find({});

        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//logga in, använt samma kod som i labb 4 (anpassad)
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" })
        } else {
            //hämtar user
            const user = await staffAcount.find({ username: username });
            if (user[0] != undefined) { //om user finns kollas lösenord
                if (await bcrypt.compare(password, user[0].password)) {
                    //skapar en JWT
                    const payload = { username: username }
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '0.5h' })
                    const respone = {
                        user: user,
                        token: token
                    }
                    return res.json(respone);
                } else {
                    return res.status(400).json({ message: "incorrect username/password" });
                }
            } else {
                return res.status(400).json({ message: "incorrect username/password" });
            }
        }
    } catch (err) {
        return res.status(400).json(err);
    }
})

// lägger till något på menyn
app.post("/addtomenu", authenticateToken, async (req, res) => {
    try {
        const { user, name, cost, description, restrictions, menu, category } = req.body;

        if (!name || !cost || !restrictions || !menu || !category) {
            return res.status(400).json({ error: "Invalid input, send name, cost, restrictions, menu and category" })
        }

        const item = {
            "name": name,
            "cost": cost,
            "description": description,
            "restrictions": restrictions,
            "menu": menu,
            "category": category,
            "whoAdded": user,
            "whenAdded": new Date()
        }

        let result = await menuItem.insertOne(item);
        return res.json(result);
    } catch (err) {
        return res.status(400).json(err);
    }
})

//om JWT är korrekt skickas det tillbaka länk som används på login sidan för att skicka dig vidare
app.get("/currentmenu", authenticateToken, async (req, res) => {
    res.json({ protectedSite: "current_menu.html" })
})

app.get("/checktoken", authenticateToken, async (req, res) => {
    res.json({ message: "JWT is correct" })
})

//kollar om JWT är korrekt, samma kod som labb 4
function authenticateToken(req, res, next) {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1]; // tar bort bearer

    if (token == null) {
        return res.status(401).json({ message: "not authorized to see this content, pls log in first" })
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).json({ message: "not correct JWT" })
        } else {
            next();
        }
    })
}

//tar bort ett menuItem från menyn och lägger till det i oldMenuItems
app.delete("/removefrommenu", authenticateToken, async (req, res) => {
    try {
        const { user, name, cost, menu, category } = req.body;
        const item = await menuItem.find({ name: name, cost: cost, menu: menu, category: category });

        if (item) {
            const oldItem = {
                "name": item.name,
                "cost": item.cost,
                "description": item.description,
                "restrictions": item.restrictions,
                "menu": item.menu,
                "category": item.category,
                "whoRemoved": user,
                "whenRemoved": new Date()
            }
            oldMenuItem.insertOne(oldItem)
            let result = await menuItem.deleteOne(item);
            return res.json(result);
        } else {
            return res.status(404).json(err);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
})

//Lägger tillbaka ett menuItem som tagits bort från menyn
app.put("/addbacktomenu", authenticateToken, async (req, res) => {
    try {
        const { user, name, cost, menu, category } = req.body;
        const oldItem = await oldMenuItem.find({ name: name, cost: cost, menu: menu, category: category });

        if (oldItem) {
            const item = {
                "name": oldItem.name,
                "cost": oldItem.cost,
                "description": oldItem.description,
                "restrictions": oldItem.restrictions,
                "menu": oldItem.menu,
                "category": oldItem.category,
                "whoAdded": user,
                "whenAdded": new Date()
            }
            menuItem.insertOne(item)
            let result = await oldMenuItem.deleteOne(oldItem);
            return res.json(result);
        } else {
            return res.status(404).json(err);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
})

app.post("/postreview", async (req, res) => {
    try {
        const { name, content, stars } = req.body;
        if (!name || !content || !stars) {
            return res.status(400).json({ error: "Invalid input, send name, content and stars" })
        }
        const newReview = {
            "name": name,
            "whenMade": new Date(),
            "content": content,
            "stars": stars
        }
        let result = await review.insertOne(newReview);
        return res.json(result);
    } catch (err) {
        return res.status(400).json(err);
    }
})

app.listen(port, () => {
    console.log("Server is listening");
})