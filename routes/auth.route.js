import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import {
    otpCodeSchema,
    signUpSchema,
    validateForgotPassword,
    validateLoginUserSchema,
    validateResetForgotPassword,
  } from "../validator/authValidators.js";
import Validate from '../validator/index.js';
  
const router = express.Router();

router.post('/register',
Validate(signUpSchema),
 AuthController.register.bind(AuthController));

router.post( "/otp-verification",
    Validate(otpCodeSchema),
    AuthController.verifyOtpHandler.bind(AuthController)
  );
  
router.post('/login',
 Validate(validateLoginUserSchema),
AuthController.login.bind(AuthController));
  
  router.post(
    "/forgot_password",
    Validate(validateForgotPassword),
    AuthController.forgotPassword.bind(AuthController)
  );

  router.patch(
    "/reset_password",
    Validate(validateResetForgotPassword),
    AuthController.resetPassword.bind(AuthController)
  );

  router.post(
    "/resend-otp",
    Validate(validateForgotPassword),
    AuthController.resendOtp.bind(AuthController)
  );

  router.post('/generate-api-key', 
  AuthController.generateApiKey.bind(AuthController));

  router.patch('/invalidate-api-key',
   AuthController.invalidateApiKey.bind(AuthController));
  

export default router;
