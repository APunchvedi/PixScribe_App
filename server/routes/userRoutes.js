import express from "express";
import { registerUser, loginUser, paymentRazorpay } from "../Controllers/userController.js";  
import userAuth from "../Middlewares/Auth.js";
import { userCredits } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits",userAuth, userCredits);
userRouter.post("/pay-razor", userAuth, paymentRazorpay);
export default userRouter;

//localhost:4000/api/user/register
//localhost:4000/api/user/login