import AuthService from '../services/auth.service.js';
import { RequestError, IdenticalError, InternalServerError, InvalidError, ErrorNotFound } from '../lib/appError.js';

class AuthController {
    async register(req, res, next) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return next(new RequestError("Fill all fields"));
        }

        try {
            const newUser = await AuthService.register(username, email, password);
            res.status(201).json({
                success: true,
                message: 'User registered successfully. OTP sent to email.',
                data: newUser,
            });
            console.log(newUser);
        } catch (error) {
            console.log(error)
            
             if (error instanceof ErrorNotFound || error instanceof InvalidError) {
                res.status(400).json({ success: false, message: error.message });
            } else if (error instanceof IdenticalError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                next(new InternalServerError('Internal Server Error'),error);
            }
        }
    }

    async verifyOtpHandler(req, res, next) {
        const { body } = req;
        const { email } = req.query;
    
        try {
            // Call the OTP verification service
            const verifyUser = await AuthService.userOtpVerifcation({ body, email });
            
            // Respond with success if OTP is verified
            res.status(200).json({
                success: true,
                message: 'OTP verified successfully',
                data: verifyUser,
            });
        } catch (error) {
            console.error("OTP verification failed:", error);
    
            // Handle different types of errors appropriately
            if (error instanceof ErrorNotFound || error instanceof InvalidError) {
                res.status(400).json({ success: false, message: error.message });
            } else if (error instanceof IdenticalError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
             next(new InternalServerError('Something went wrong '),error);;
            }   
    }
}


async generateApiKey(req, res, next) {
    const { userId } = req.body;
    if (!userId) {
        return next(new RequestError('User ID is required'));
    }

    try {
        const apiKey = await AuthService.generateApiKey(userId);
        res.status(200).json({
            success: true,
            message: 'API key generated successfully',
            data: { apiKey },
        });
    } catch (error) {
        if (error instanceof ErrorNotFound) {
            res.status(404).json({ success: false, message: error.message });
        } else if (error instanceof IdenticalError) {
            res.status(409).json({ success: false, message: error.message });
        } else {
            next(new InternalServerError('Internal Server Error'));
        }
    }
}

async invalidateApiKey(req, res, next) {
    const { userId } = req.body;
    if (!userId) {
        return next(new RequestError('User ID is required'));
    }

    try {
        await AuthService.invalidateApiKey(userId);
        res.status(200).json({
            success: true,
            message: 'API key invalidated successfully',
        });
    } catch (error) {
        if (error instanceof ErrorNotFound) {
            res.status(404).json({ success: false, message: error.message });
        } else {
            next(new InternalServerError('Internal Server Error'));
        }
    }
}
    
    async login(req, res,next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new RequestError('Email and password are required'));
        }

        try {
            const response = await AuthService.login({ email, password });
            res.status(200).json({
                success: true,
                message: 'OTP sent to your email',
                data: response,
            });
            console.log("login response",response)
        } catch (error) {
            console.log(error);
              // Handle different types of errors appropriately
              if (error instanceof ErrorNotFound || error instanceof InvalidError) {
                res.status(400).json({ success: false, message: error.message });
            } else if (error instanceof IdenticalError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                next(new InternalServerError('Something went wrong with login process',error));
            }
        }
    }

    async verifyOtp(req, res,next) {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return next(new RequestError('Email and OTP are required'));
        }

        try {
            const response = await AuthService.verifyOtp({ email, otp });
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: response,
            });
            console.log("verify otp response",response)
        } catch (error) {
            console.log(error);
              // Handle different types of errors appropriately
              if (error instanceof NotFoundError || error instanceof InvalidError) {
                res.status(400).json({ success: false, message: error.message });
            } else if (error instanceof IdenticalError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                next(new InternalServerError('Something went wrong with otp verification process'),error);
            }
        }
    }

  
        async forgotPassword(req, res,next) {
            try {
                const response = await AuthService.forgotPassword(req.body);
                res.status(200).json({
                    success: true,
                    message: 'OTP sent for password reset',
                    data: response,
                });
            console.log("forgot password response",response);

            } catch (error) {
                console.error("Forgot Password failed:", error);
                next(new InternalServerError('Something went wrong with forgotpassword process',error));
            }
        }
    
        async resetPassword(req, res,next) {
            const { email } = req.query;
            try {
                const response = await AuthService.resetPassword(req.body, email);
                res.status(200).json({
                    success: true,
                    message: 'Password reset successful',
                    data: response,
                });
            console.log("reset password  response",response);

            } catch (error) {
                console.error("Reset Password failed:", error);
               
                next(new InternalServerError('Something went wrong with reset password process'),error);
            }
        }
    
        async resendOtp(req, res,next) {
            try {
                const response = await AuthService.resendOtp(req.body);
                res.status(200).json({
                    success: true,
                    message: 'OTP resent successfully',
                    data: response,
                });
            console.log("resend otp response",response)

            } catch (error) {
                console.log("Resend OTP failed:", error);
                next(new InternalServerError('Something went wrong with resnd otp process'),error);

                
            }
        }
    
 
    

}

export default new AuthController();
