import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    token:{
        type:String,

    },
    //para verificar la cuenta 
    accountStatus:{
        type:Boolean,
        default:false,
    }

}, {
    timestamps:true,
})
//before save, hash the password
usersSchema.pre('save', async function (next){
    if(!this.isModified("password")){
        next();
    } 
    //config the hash function
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);

})
usersSchema.methods.verifyPassword = async function(passEntered){
    return await bcrypt.compare(passEntered, this.password);
}
const Users = mongoose.model('Users', usersSchema)
export default Users
