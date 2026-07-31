import mongoose, { disconnect } from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code:{
            type: String,
            required: true,
            uppercase: true,
            unique: true,
        },
        discountType:{
            type: true,
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
            difault: true,
            main:0


        },
        expiry:{
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