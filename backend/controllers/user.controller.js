import User from "../models/user.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import Listing from '../models/listing.js'
export const test=(req,res)=>{
res.json({
  message:"Hello World"
})
}
export const updateUser=async(req,res,next)=>{
  if(req.user.id !== req.params.id)return next(errorHandler(401,"you can only update your own account!"))
    try {
  if (req.body.password) {
    req.body.password=bcryptjs.hashSync(req.body.password,10)

    
  }

  const updateUser=await User.findByIdAndUpdate(req.params.id,{
    $set:{
      userName:req.body.userName,
            email:req.body.email,
      password:req.body.password,
      avatar:req.body.avatar,

    }
  },
  {new:true}
);

const {password,...rest}=updateUser._doc;
res.status(200).json(rest);
      
    } catch (error) {
      next(error)
      
    }

}

export const deleteUser=async(req,res,next)=>{
  if(req.user.id!==req.params.id)
    return next(errorHandler(401,'You can only Delete your Own Account'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('user has been deleted');
  } catch (error) {
    next(error)
  }


}

export const getUserListings=async(req,res,next)=>{
  if(req.user.id === req.params.id){
    try{
      const listings=await Listing.find({userRef:req.params.id});
      res.status(200).json(listings);

    }catch(error){
      next(error);
    }
  }else{
          return next(errorHandler(401,'You can only view your own listings!'));

  }

}