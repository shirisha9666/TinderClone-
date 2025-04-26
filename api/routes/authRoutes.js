import express from "express";
import { login, logout, signup } from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/auth.js";
const router=express.Router();


router.post("/signUp",signup)
router.post("/login",login)
router.post("/logout",logout)

router.get("/me",protectRoute,(req,res)=>{
    res.send({
        success:true,
        user:req.user
    })
})

export default router


