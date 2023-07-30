const router = require('express').Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    const id = req.params.id;
    try {
        if(id){
            const users = await User.findById(id);
            res.status(200).json(users);
        }
        else{
            const users = await User.find();
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

router.get("/create", (req, res) => {
    res.send("Create User FrontEnd");
});

router.post("/store", async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(200).json({user});
    }
    catch (error){
        res.status(500).json({error : error.message});
    }
});

router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const {name, username, email, password, phone} = req.body;
    try {
        await User.updateOne(
            {_id : id},
            {
                $set : {
                    name : name,
                    username : username,
                    email : email, 
                    password : password,
                    phone : phone,
                }
            }
        )
        const user = await User.findById(id);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

router.get("/status-change/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(user){
            user.status = 1 - user.status;
            await user.save();
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error : error.message});   
    }
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.deleteOne({_id : id});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error : error.message}); 
    }
});

module.exports = router;