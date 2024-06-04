import Otp from '../models/otp.model.js';

const storeOtp = async (email, otp) => {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    const existingOtp = await Otp.findOne({ email });

    if (existingOtp) {
        existingOtp.otp = otp;
        existingOtp.expiresAt = expiresAt;
        await existingOtp.save();
    } else {
        const newOtp = new Otp({ email, otp, expiresAt });
        await newOtp.save();
    }
};

const verifyOtp = async (email, otp) => {
    const storedOtp = await Otp.findOne({ email, otp, expiresAt: { $gt: new Date() } });

    if (storedOtp) {
        await Otp.deleteOne({ email });
        return true;
    } else {
        return false;
    }
};

export { storeOtp, verifyOtp };
