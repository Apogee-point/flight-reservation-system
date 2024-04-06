import { Model, Schema , SchemaType } from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
});



//* Methods for UserSchema
UserSchema.methods.getRole = function(){
    return this.role;
}

UserSchema.methods.comparePassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    }catch(error){
        console.error(error.message);
        return false;
    }
}

UserSchema.methods.hashPassword = async function(){
    try{
        const salt = await bcrypt.genSalt(10); //* 10 is the number of rounds to generate the salt
        this.password = await bcrypt.hash(this.password, salt);
    }catch(error){
        console.error(error.message);
    }
}

UserSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password') || user.isNew){
        await user.hashPassword();
        next();
    }
});

const User = Model('User', UserSchema);
module.exports = User;


//* salt is generally a random value that is used as an additional input to a one-way function that hashes data, a password or passphrase.