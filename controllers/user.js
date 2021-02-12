import UserMessage from "../models/userMessage.js";

export const getUsers = async (req, res) => {
    console.log("Get all users")

    try{
        const userMessage = await UserMessage.find();

        res.status(200).json(userMessage);
    } catch (error){
        res.status(404).json({message: error.message});
    }
}

export const findUser = async (req,res) => {
    const user = req.body;
    console.log("Find a user")
    console.log(user)

    try{
        const userMessage = await UserMessage.findOne(user);

        console.log(userMessage)

        res.status(200).json(userMessage);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const testAPI = async (req, res) => {
    console.log("Test")
}

export const createUser = async (req, res) => {
    const user = req.body;
    console.log(user)
    console.log("Create User")


    const newUser = new UserMessage(user);

    try{
        await newUser.save();

        res.status(201).json(newUser);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}