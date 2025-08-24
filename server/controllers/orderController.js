// import Order from "../models/Order.js";
// import Product from "../models/Product.js";

// // Place Order COD : /api/order/cod

// export const placeOrderCOD = async (req, res) => {
//     try {
//         const { userId, items, address } = req.body;
//         if(!address || items.length === 0){
//             return res.json({ success: false, message: "Invalid data"})
//         } 
//         //Calculate Amount Using Items
//         let amount = await items.reduce(async(acc, item) => {
//             const product = await Product.findById(item.product);
//             return (await acc) + product.offerPrice * item.quantity;
//         }, 0)

//         // Add Tax Charge (2%)
//         amount += Math.floor(amount * 0.02);

//         await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType: "COD",
//         });

//         return res.json({ success: true, message: "Order Placed Successfully" })
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }

// // GEt orders by User Id : /api/order/user

// export const getUserOrders = async (req, res) => {
//     try {
//         // const { userId } = req.body;
//         const orders = await Order.find({
//             userId: req.userId,
//             $or: [{paymentType: "COD"}, {isPaid: true}]
//         }).populate("items.product").sort({createdAt: -1});
//         res.json({ success: true, orders });
//     } catch (error) {
//         res.json({ success: false, message: error.message});
//     }
// }

// // Get all orders ( for seller / admin ) : /api/order/seller 

// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({
//             $or: [{paymentType: "COD"}, {isPaid: true}]
//         }).populate("items.product").sort({createdAt: -1});
//         res.json({ success: true, orders });
//     } catch (error) {
//         res.json({ success: false, message: error.message});
//     }
// }


import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js"; 

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body; // yaha `address` = addressId

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // Fetch address from user
        const user = await User.findById(userId);
        if (!user) return res.json({ success: false, message: "User not found" });

        const selectedAddress = user.addresses.id(address); // 🔹 addressId se address nikalo
        if (!selectedAddress) {
            return res.json({ success: false, message: "Address not found" });
        }

        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        // 🔹 Save order with embedded address snapshot
        await Order.create({
            userId,
            items,
            amount,
            address: selectedAddress.toObject(),  // 🔹 full object embed karo
            paymentType: "COD",
        });

        return res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Get orders by User Id : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("userId", "name email") // ✅ bring user name + email
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (for seller/admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("userId", "name email") // ✅ bring user name + email
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
