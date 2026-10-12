
import authService from "./auth.service.js";

const signup = async (req, res) => {
    try {
        const { user, token } = await authService.signup(req.body);

        return res.status(201).json({
            message: "User created successfully",
            user,
            token,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Signup failed",
        });
    }
};

const signin = async (req, res) => {
    try {
        const { user, token } = await authService.signin(req.body);

        return res.status(200).json({
            message: "User signed in successfully",
            user,
            token,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Signin failed",
        });
    }
};

const googleSignin = async (req, res) => {
    try {
        const { credential } = req.body;

        const { user, token } =
            await authService.googleSignin(credential);

        return res.status(200).json({
            message: "Google sign-in successful",
            user,
            token,
        });
    } catch (error) {
        console.error("Google authentication error:", error.message);

        return res.status(401).json({
            message: error.message || "Google authentication failed",
        });
    }
};

export default {
    signup,
    signin,
    googleSignin,
};
