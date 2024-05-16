

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