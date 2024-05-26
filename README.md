# API som hanterar data till restaurangen Hot 'N' Heavy
Detta repo innehåller kod till ett API byggt med Express och stöd för CORS. API:et funkar som en mellanhand mellan en MongoDB-databas som har data till en restaurangs webbsida.
CRUD (Create, Read, Update, Delete) är implementerad.

## Installation, databas
Klona ner repot, kör kommandot npm install för att installera de npm-paket som används. 
Skapa en databas i mongoDB(compass) och connect:a till den och lägg sedan in den länken i "mongoose.connect("url")". <br/>
Kör filen install.js för att tömma databasen samt lägga till förskapad data som kan användas på frontend. 

Databasen använder schemas genom mongoose för att formatera data, de schema som används ser ut så här:
```
staffAcountSchema
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


menuItemSchema
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


oldMenuItemSchema
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


reviewsSchema 
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

```
## Användning
Nedan finns de olika sätt API:et kan anropas:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/menu        |Hämtar alla nuvarande rätt på menyn.                                         |
|GET    |/shelvedmenu      |Hämtar alla rätter som tagits bort från menyn.                                            |
|GET    |/currentmenu | Måste ha en JWT i header som sedan kollas om den är korrekt. Skickar tillbaka en länk till en skyddad sida som kräver autentisering genom en JWT.                                          |
|GET    |/checktoken | Måste ha en JWT i header som sedan kollas om den är korrekt. Används bara för att kolla om en JWT är giltig när en skyddad sida laddas in.                                     |
|GET   |/reviews | Hämtar alla reviews från databasen.                          |
|POST |/login | Tar 2 parametrar från body: "username" och "password", om dessa matchar ett konto i databasen skapas en JWT och skickas tillbaka tillsammans med användarkontot parametrarna matchar.                                                      |
|POST |/addtomenu | Måste ha en JWT i header som sedan kollas om den är korrekt. Tar 7 parametrar från body: "user", "name", "cost", "description", "restrictions", "menu" och "category". Om alla dessa skickas in och alla förutom "description" inte är tomma så skapas ett nytt menuItem dokument.                                                    |
|POST |/postreview | Tar 3 parametrar från body: "name", "content" och "stars". Om dessa skickats med och inte är tomma skapas ett nytt review dokument.                                                     |
|PUT |/addbacktomenu | Måste ha en JWT i header som sedan kollas om den är korrekt. Tar 5 parametrar från body: "user", "name", "cost", "menu" och "category". Om dessa skickas med och inte är tomma så kollas det om ett dokument i oldMenuItem matchar dessa och om det finns en matchning så tas detta dokument bort från oldMenuItem och läggs till i menuItem.                                                    |
|DELETE |/removefrommenu | Måste ha en JWT i header som sedan kollas om den är korrekt. Tar 5 parametrar från body: "user", "name", "cost", "menu" och "category". Om dessa skickas med och inte är tomma så kollas det om ett dokument i menuItem matchar dessa och om det finns en matchning så tas detta dokument bort från menuItem och läggs till i oldMenuItem                                                       |

Datan på databasen lagras i BSON och kan se ut såhär (menuItem):
```
{
   _id: "6650afe354897a4089a47774",
   name: "Korean-styled chicken wings",
   description: "täckta i gochujang sås och toppat med sesamfrön och strimlad salladslök, serveras med två valfria dippsåser",
   cost: 119,
   menu: "Kyckling",
   category: "Vingar",
   restrictions: Array (empty),
   whoAdded: "Calle Alexanderson",
   whenAdded: 2024-05-24T15:18:59.752+00:00
}
