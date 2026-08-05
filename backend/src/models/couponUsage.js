import mongoose from "mongoose";
import coupons from "./coupons";

const couponUsageSchema = new mongoose.Schema(
    {
        couponId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Coupon",
            required:true
        },

        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        orderId:{
             type:mongoose.Schema.Types.ObjectId,
            ref:"Order",

            
        },
        usedAt:{
             type:Date,
             default:Date.now
        },
       
        
    },
{
    timestamps:true
}
);

couponUsageSchema.index(
    {
        couponId:1,
        userId:1
    }
);

export default mongoose.model("CouponUsage", couponUsageSchema);