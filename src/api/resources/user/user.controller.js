const { RequestTimeout } = require('http-errors');
const User = require('./user.model');
const userService = require('./user.service');
const jwtMiddleware = require('../../middleware/jwt');


class userController {

    //[POST] api/users/sign-up
    async createUser(req, res, next) {
        try {
            const newUser = new User(req.body);
            console.log("user before hash: " + newUser);

            //hash password
            newUser.password = await userService.hashPass(newUser.password);
            console.log("user after hash: " + newUser);

            newUser.save().then((result) => {
                return res.status(200).json({
                    "msg": "Sign up success"
                });
            }).catch((error) => {
                return res.status(400).json({
                    "msg": `Sign up failed error:${error}`
                });
            })

        } catch (error) {
            return res.status(500).json({
                "msg": `failed error:${error}`
            })
        }
    }

    //[POST] api/users/sing-in
    async signInUser(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(email + " " + password);

            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(401).json({
                    "msg": "username unvalible"
                });
            }

            const author = await userService.comparePass(password, user.password);
            if (!author) {
                return res.status(401).json({
                    "msg": "password uncorrect"
                });
            }

            const token = await jwtMiddleware.madeToken(user._id, "1d");
            return res.status(200).json({
                token
            });


        } catch (error) {
            return res.status(500).json({
                "msg": `failed error:${error}`
            });
        }
    }

    authencate(req,res,next){
        return res.json(
            req.user
        )
    }

}

module.exports = new userController;