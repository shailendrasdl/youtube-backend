import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import {
  addNewCard,
  createCharges,
  createCustomer,
} from "../../controllers/v1/payment/paymentController.js";

const router = Router();

router.post("/create-customer", [verifyJWT], createCustomer);
router.post("/add-card", [verifyJWT], addNewCard);
router.post("/create-charges", [verifyJWT], createCharges);

export default router;
