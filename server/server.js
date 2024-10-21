const express = require("express"); 
const cors = require("cors");
const app = express();
const User = require("./models/user.model.js")  

  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:3000"
}));

app.get("/", cors(), (req,res) => {
    console.log("something")
    res.json("whatever")
})

app.post("/", async(req,res) => {
    const {email, password} = req.body;
    console.log(req.body);
    try{
        const check=await User.findOne({email:email})
        console.log("user finding: " + check)
        if(!check) {
            res.json("nonexist");
        }
        const isMatch = await check.comparePassword(password);
        if (!isMatch){
            res.json("nonexist");
        }
        else{
            res.json("exists");
        }
    }
    catch(e){
        res.json("nonexist")
    }
})



app.post("/register", async(req,res) => {
    const {email, password, city, state, address} = req.body;

    const data={
        email:email,
        password:password,
        city:city,
        state:state,
        address:address
    }
    try{
        const check = await User.findOne({email: email})
        console.log("user findin 1: " + check)
        if(check) {
            res.json("exists")
        }
        else{
            await User.create(data)
            res.json("nonexist")
        }
    }
    catch(e){
        res.json("nonexist")
    }
})

app.post("/order", async(req, res) => {
    console.log(req.body)
    const {email, toppings, crust, size, method, quantity} = req.body;
    try{
        const user = await User.findOne({email:email})
        console.log({toppings, crust, size, method, quantity});
        user.pizzas.push({toppings, crust, size, method, quantity});
        console.log("adding pizzas to user: " +user);
        const update = await User.findByIdAndUpdate({_id: user._id}, {pizzas:[...user.pizzas]});
        res.json("saved pizza");
    }
    catch (err){
        console.log(err);
    }

})

app.put("/account", async (req, res) => {
    const {email, newEmail, password, city, state, address} = req.body;
    console.log(req.body);
    try{
        const doesUserExistUser=await User.findOne({email:newEmail})
        console.log("user finding: " + doesUserExistUser)
        if(doesUserExistUser) {
            res.json("exists")
        }
        else{
            const user = await User.findOne({email:email});
            console.log("searching for existing user: " + user);
            const update = await User.findByIdAndUpdate({_id: user._id}, {email:newEmail, password:password, city:city, state:state, address:address});
            res.json("nonexist");
        }
    }
    catch(e){
        res.json("nonexist")
    }
})

app.post("/pizzas", async (req, res) => {
    const {email} = req.body;
    console.log(email);
    try{
    const user = await User.findOne({email:email});
    console.log("getyting pizzas: " + user);
    res.json(user);
}
catch(err) {
    console.log(err);
}
})

app.post("/delete", async (req, res) => {
    const {email} = req.body;
    try{
    const user = await User.findOne({email:email});
    const deleteUser = await User.deleteOne(user);
    res.json("user deleted");
    }
    catch (err) {
        console.log(err);
    }
})



require("./config/mongoose.config.js")

app.listen(8000, ()=>console.log("Listening on Port 8000"))