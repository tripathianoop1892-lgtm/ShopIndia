import user from "../models/user.js";

export const getCustomers = async(req, res) =>{
    try{
        const customers = await user.find({role:"customer"}).select("-password");
        return res.json(customers);
    } catch(err){
        return res.status(500).json({message: "error featching customer"})
    }
}
