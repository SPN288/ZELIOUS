const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator');

router.post("/createuser", [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('name').isLength({ min: 5 }),
    check('password').isLength({ min: 5 })
], async (req, res) => {
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
        })
        res.json({ sucess: true });
    } catch (error) {
        console.log(error);
        res.json({ sucess: false });
    }
})
module.exports = router;