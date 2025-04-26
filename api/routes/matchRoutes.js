import express from "express";
import { getMatches, getuserProfiles, swipeLeft, swipeRight } from "../controllers/matchesController.js";
import { protectRoute } from "../middleware/auth.js";

const router=express.Router();

router.post("/swipe-right/:likedUserId",protectRoute,swipeRight);
router.post("/swipe-left/:dilikedUserId",protectRoute,swipeLeft);
router.get("/",protectRoute,getMatches);
router.get("/user-profiles",protectRoute,getuserProfiles);

export default router
