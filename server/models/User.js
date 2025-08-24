// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true},  
//     cartItems: {type: Object, default: {}},
// },{minimize: false})

// const User = mongoose.models.user || mongoose.model('user', userSchema);

// export default User

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  street: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  phone: String,
});

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},  
  cartItems: {type: Object, default: {}},
  addresses: [addressSchema],   // 🔹 add this
},{minimize: false})

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;
