const mongoose = require("mongoose");
const dbName = "pizza";
 mongoose.connect("mongodb+srv://lukaneek:Starwars@pizza.p09d9.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true
})
    .then(() => console.log(`Connected to ${dbName} database!`))
    .catch((err) => console.log(err));                      
