import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fName: String,
    lName: String,
    password: String,
    userType: String,
    cashierReport:{
        type: String,
    },
})

const UserMessage = mongoose.model('UserMessage', userSchema)

export default UserMessage
