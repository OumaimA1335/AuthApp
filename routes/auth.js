const router = require('express').Router();
const { User } = require('../models/user');
const  bcrypt  = require('bcrypt');
const joi = require('joi');
router.post('/auth', async (req, res) => {

    const { error } = validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(401).send({ message: "Invalid Email " });
    }
    else {
       
        const validPasswpord = await bcrypt.compare(req.body.password,user.password);
        if (!validPasswpord) {
            return res.status(401).send({ message: "Invalid Password" });
        }
        else {
            const token = user.generateAuthToken();
            return res.status(200).send({ data: token, message: "Logged in successfully" });
        }

    }
})

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),


    });
    return schema.validate(data);
}
module.exports = router;