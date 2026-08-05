//import Coupons from "../../../ShopNowIndia/src/pages/admin/Coupons/coupons";  //
import coupons from "../models/coupons.js";
import coupon from "../models/coupons.js";
import CouponUsage from "../models/couponUsage.js";

const normalizeStatus = (status) =>{
    return status ==="inactive"? "inactive" :"active"
};
export const validateCoupon = async (req, res) => {
    try{
        const { code, amount }= req.body;
        if(!code || !code.trim()){
            return res.status(400).json({success: false, message: "coupon code is required"});
        }
        const subtotal= Number(amount || 0);
        const normalizeCode = code.trim().toUpperCase();
        const coupon = await Coupon.findOne({code: normalizeCode});

        if(!coupon){
            return res.status(404). json({ success: false, message:"Coupon Not found"});
        }
        if (coupon.status !== "active"){
            return res.status(400). json({ success: false, message:"Coupon is inactive"});
        }
        if (coupon.expiryDate && new Date (coupon.expiryDate) < new Date()){
             return res.status(400). json({ success: false, message:"Coupon has expired"});
        }
        if (subtotal <Number(coupon.minOrder || 0)){
             return res.status(400). json({ success: false, message:`Minimum order amount is \u20b9${Number(coupon.minOrder || 0)}`});
        }

        const usage = await CouponUsage.countDocuments({
          couponId: coupon._id,
          userId: req.user._id
        });

        if (usage >= coupon.maxUsagePerUser) {
          return res.status(400).json({
                 success:false,
                 message:"You have already used this coupon."
          });
        }
        if (
          coupon.maxTotalUsage &&
          coupon.usedCount >=coupon.maxTotalUsage
        ){
          return res.status(400).json({
                success:false,
                massage:"Coupon usage Limit reached,"
          });
        }
        let discountAmount =0;
        if(coupon.discountType==="Percentage"){
            discountAmount = (subtotal* Number( coupon.discountValue))/100;
        } else{
            discountAmount= Number(coupon.discountValue);
            
        }
        discountAmount = Math.main (discountAmount, subtotal);
        const finalAmount = Math.max(subtotal-discountAmount, 0);

        return res.json({
            success: true,
            message: "coupon applied successfully",
            data:{
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                discountAmount: Number(discountAmount.toFixed(2)),
                finalAmount: Number(finalAmount.toFixed(2))
            },
        })
    }catch (error){
        console.error(error);
        return res.status(500).json({success: false, message:"Error validating coupon"});
    }
};
export const getDisplayStatus = (coupon) => {
  if (coupon.status === "inactive") return "Inactive";

  if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
    return "Expired";
  }

  return "Active";
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    const data = coupons.map((coupon) => ({
      ...coupon.toObject(),
      displayStatus: getDisplayStatus(coupon.toObject()),
    }));

    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error fetching coupons" });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrder, expiryDate, status, maxUsagePerUser, maxTotalUsage } = req.body;
    const coupon = await Coupon.create({
      maxUsagePerUser:Number( maxUsagePerUser || 1),
      maxTotalUsage: maxTotalUsage ==="" || maxTotalUsage == null ? null : Number (maxTotalUsage)
    });
    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: "Coupon code is required" });
    }

    if (!discountValue && discountValue !== 0) {
      return res.status(400).json({ success: false, message: "Discount value is required" });
    }

    if (!expiryDate) {
      return res.status(400).json({ success: false, message: "Expiry date is required" });
    }

    const normalizedCode = code.trim().toUpperCase();
    const existingCoupon = await Coupon.findOne({ code: normalizedCode });

    if (existingCoupon) {
      return res.status(409).json({ success: false, message: "Coupon code already exists" });
    }

    const coupon = await Coupon.create({
      code: normalizedCode,
      discountType,
      discountValue: Number(discountValue),
      minOrder: Number(minOrder || 0),
      expiryDate: new Date(expiryDate),
      status: normalizeStatus(status),
      maxUsagePerUser: Number(maxUsagePerUser || 1),
      maxTotalUsage: maxTotalUsage ==="" || maxTotalUsage == null ? null:Number(maxTotalUsage),
    });

    return res.status(201).json({ success: true, message: "Coupon created successfully", data: coupon });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error creating coupon" });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, discountType, discountValue, minOrder, expiryDate, status, maxUsagePerUser, maxTotalUsage } = req.body;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    if (code && code.trim()) {
      const normalizedCode = code.trim().toUpperCase();
      const duplicate = await Coupon.findOne({ _id: { $ne: id }, code: normalizedCode });

      if (duplicate) {
        return res.status(409).json({ success: false, message: "Coupon code already exists" });
      }

      coupon.code = normalizedCode;
    }

    if (discountType) coupon.discountType = discountType;
    if (discountValue !== undefined) coupon.discountValue = Number(discountValue);
    if (minOrder !== undefined) coupon.minOrder = Number(minOrder || 0);
    if (expiryDate) coupon.expiryDate = new Date(expiryDate);
    if (status) coupon.status = normalizeStatus(status);
    if (maxUsagePerUser !== undefined) { coupon.maxUsagePerUser=Number(maxUsagePerUser);}
    if (maxTotalUsage !== undefined) {coupon.maxTotalUsage=maxTotalUsage===""? null : Number(maxTotalUsage);}

    await coupon.save();

    return res.json({ success: true, message: "Coupon updated successfully", data: coupon });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error updating coupon" });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    return res.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error deleting coupon" });
  }
};
