const router = require('express').Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    const { id } = req.query;
    try {
        if(id){
            const user = await User.findById(id);
            res.status(200).json({user : user});
        }
        else{
            const users = await User.find();
            res.status(200).json({users : users});
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
        const existingUser = await User.findOne({
            $or: [
                { email: user.email },
                { phone: user.phone },
                { username: user.username }
            ]
        });
        if (existingUser) {
            if(user.email === existingUser.email)
                return res.status(404).json({ error: "Email already exists" });
            if(user.username === existingUser.username)
                return res.status(404).json({ error: "Username already exists" });
            if(user.phone === existingUser.phone)
                return res.status(404).json({ error: "Phone already exists" });
        }

        await user.save();
        res.status(200).json({user});
    }
    catch (error){
        res.status(500).json({error : "Upps! Something Went Wrong."});
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
        const existingUser = await User.findOne({
            $and: [
                {
                    $or: [
                        { email: email },
                        { phone: phone },
                        { username: username }
                    ]
                },
                { _id: { $ne: id } }
            ]
        });
        if (existingUser) {
            if(email === existingUser.email)
                return res.status(404).json({ error: "Email already exists" });
            if(username === existingUser.username)
                return res.status(404).json({ error: "Username already exists" });
            if(phone === existingUser.phone)
                return res.status(404).json({ error: "Phone already exists" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                name: name,
                username: username,
                email: email,
                password: password,
                phone: phone,
            }
        }, { new: true }); // Set 'new' option to true to return the updated document

        if (!updatedUser) {
            return res.status(404).json({ error: "Upps! Something Went Wrong" });
        }

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({error : "Upps! Something Went Wrong"});
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
        res.status(200).json({message : "Status Changed Successfully."});
    } catch (error) {
        res.status(500).json({error : "Upps! Something Went Wrong"});   
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