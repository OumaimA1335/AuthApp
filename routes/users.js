const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/create", async (req, res, next) => {

    const { error } = validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    try {

        const user1 = await User.findOne({ email: req.body.email });
        if (user1) {
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });
        }
        else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const user = await new User({ ...req.body, password: hashPassword }).save();
            return res.send({ user });
        }

    }
    catch (e) {
        next(e);
    }


});

module.exports = router;