import authService from "./auth.service.js";

// == signup ==
const signup = async (req, res) => {
    try {
        const { user, token } = await authService.signup(req.body);


        res.status(201).json({
            message: "User created successfully",
            user,
            token,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// == signin ==
const signin = async (req, res) => {
    try {
        const { user, token } = await authService.signin(req.body)
        

        res.status(200).json({
            message: "User signed in successfully",
            user,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export default {
    signup,
    signin,
};