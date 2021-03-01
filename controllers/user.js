import UserMessage from "../models/userMessage.js";
import ActiveUsers from "../models/activeUsers.js";
import jwt from 'jsonwebtoken';

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

export const loginUser = async (req,res) => {
    const user = req.body;

    console.log("Login User");
    console.log(user);

    try{
        const existingUser = await UserMessage.findOne(user);
        let existingUserObj = existingUser.toObject();


        if (existingUser === null){
            console.log("Not found");
        }else{
            await UserMessage.findByIdAndUpdate(existingUser._id, {active: true});

            // Generate token for each user session
            const token = jwt.sign({ id: existingUser._id,employeeID: existingUser.employeeID}, 'key', {expiresIn: '1hr'});

            // Create a new document in active users
            let fullName = (`${existingUser.fName} ${existingUser.lName}`);

            const activeUser = new ActiveUsers({
                _id: existingUser._id,
                employeeID: existingUser.employeeID,
                name: fullName,
                userType: existingUser.userType,
                manager: existingUserObj.manager,
                sessionKey: token,
            });

            console.log(activeUser);

            try{
                await activeUser.save();
                res.status(200).json({result: activeUser, token});
            }catch(error){
                console.log(error.message)
            }

        }
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    console.log(user)
    console.log("Create User")


    const User = new UserMessage(user);

    try{
        await User.save();

        res.status(201).json(User);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}

export const logoutUser = async (req, res) =>{
    const user = req.body;
    let userFound;

    console.log("Logging Out User")
    console.log(user);
    // const logUser = new ActiveUsers(user);

    // delete user from activeUser collection
    try{
        userFound = await ActiveUsers.findOneAndDelete({sessionKey: user.sessionKey});
        console.log(userFound);
    }catch(error){
        console.log("User Not Found");
        res.status(404).json({message: error.message});
    }
    //userFound could be null

    console.log("Changing status to inactive")
    // change active status of user to false
    try{
        await UserMessage.findByIdAndUpdate(userFound._id, {active: false});
    }catch(error){
        console.log(error.message)
        res.status(404).json({message: error.message});
    }

    res.json({ message: 'User Logged Out'});
}