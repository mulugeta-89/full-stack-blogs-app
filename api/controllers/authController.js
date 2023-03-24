const express = require("express")
const db = require("../db")
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const register = (req, res) => {
    const q = "SELECT * FROM user WHERE email=? or username=?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists")

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user(username, email, password) VALUES(?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("user created succesfully")

        })

    })
}

const login = (req, res) => {

    const q = 'SELECT * FROM user where username=?'
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("user not found")

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPasswordCorrect) {
            return res.status(400).json("wrong username or password")
        }
        const {password, ...other} = data[0]

        const token = jwt.sign({ id: data[0].id }, "jwtkey")
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)

        
    })

}

const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("user logged out succesfully")
}

module.exports = {
    register,
    login,
    logout
}