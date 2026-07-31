import Medicine from "../models/medicine.js";
import Order from "../models/Order.js";
import user from "../models/user.js";

export const getCustomers = async(req, res) =>{
    try{
        const customers = await user.find({role:"customer"}).select("-password");
        return res.json(customers);
    } catch(err){
        return res.status(500).json({message: "error featching customer"})
    }
}

export const getShopkeeper = async(req, res) =>{
    try{
        const shopkeeper = await user.find({role:"shopkeeper"}).select("-password");
        return res.json(shopkeeper);
    } catch(err){
        return res.status(500).json({message: "error featching shopkeeper"})
    }
}
export const getDistributors = async(req, res) =>{
    try{
        const distributors = await user.find({role:"distributor"}).select("-password");
        return res.json(distributors);
    } catch(err){
        return res.status(500).json({message: "error featching distributors"})
    }
}

    export const getMedicine = async(req, res) =>{
        try{
            const medicines = await Medicine.find().populate("ownerId", "name");
            return res.json(medicines);
        } catch(err){
            return res.status(500).json({message: "error featching medicines"})
        }
    }

      export const getOrders = async(req, res) =>{
        try{
            const orders = await Order.find({});
            return res.json(orders);
        } catch(err){
            return res.status(500).json({message: "error featching orders"})
        }
    }
        export const getCategorySummary = async(req, res) =>{
        try{
            const categorySummary = await Medicine.aggregate([
                {
                    $group: {
                        _id: {
                            $cond: [
                                { $eq: ["$type", ""] },
                                "Uncategorized",
                                { $ifNull: ["$type", "Uncategorized"] }
                            ]
                        },
                        totalMedicine: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id",
                        totalMedicine: 1
                    }
                },
                {
                    $sort: { category: 1 }
                }
            ]);

            return res.json(categorySummary);
        } catch(err){
            console.error(err);
            return res.status(500).json({message: "error featching category summary"})
        }
    }