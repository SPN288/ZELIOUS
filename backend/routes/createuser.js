const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator');

router.post("/createuser", [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('name', "short username").isLength({ min: 5 }),
    check('password', "incorrect password").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ sucess: true }))
            //res.json({ sucess: true });
        } catch (error) {
            console.log(error);
            res.json({ sucess: false });
        }
    })
router.post("/loginuser", [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password', "incorrect password").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userdata = await User.findOne({ email });
        if (!userdata) { return res.status(400).json({ error: "try with correct email" }) }
        if (req.body.password !== userdata.password) { return res.status(400).json({ error: "try with correct email" }) }
        return res.json({ sucess: true });

    } catch (error) {
        console.log(error);
        res.json({ sucess: false });
    }
})
module.exports = router;