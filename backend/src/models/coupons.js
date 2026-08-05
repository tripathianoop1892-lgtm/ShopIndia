//import mongoose, { disconnect } from "mongoose";//
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code:{
            type: String,
            required: true,
            uppercase: true,
            unique: true,
        },
        discountType:{
            type: String,
            enum:["Percentage", "Fixed"],
            default: "Percentage",

        },
        discountValue:{
            type:Number,
            required: true,
            min:0
        },
        mainOrder:{
            type:Number,
            difault: 0,
            min:0,


        },
        maxWsagesPerUser:{
            type:Number,
            default: 1,
            min: 1,

        },
        maxTotalUsage:{
            type:Number,
            default: null,

        },
        usedCount:{
            type:Number,
            default: 0,
        },
      
        couponexpiryDate:{
            type:Date,
            required: true,

        },
        status:{
            type:String,
            enum: ["active","inactive"],
            default: "active",
        },

    },
      {
        timestamps: true,
      }   
);
export default mongoose.model("coupons", couponSchema);