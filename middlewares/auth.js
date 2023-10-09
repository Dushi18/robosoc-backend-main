const jwt = require("jsonwebtoken")

const checkAuthenticity = (req,res,next)=>{
    try {
        let jwtToken = req.cookies['ROBOSOC_TOKEN']
        if(!jwtToken){
            return res.status(403).json({msg : "Forbidden"})
        }
        let {username} = jwt.decode(jwtToken)
        if(username===process.env.ADMIN){
            next()
        }
        else return res.status(403).json({msg : "Forbidden"})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

const login = (req,res)=>{
    try {
        let {username, password} = req.body 
        if(username===process.env.ADMIN && password===process.env.PASSWORD){
            let jwtToken = jwt.sign({username},process.env.SECRET_KEY,{expiresIn: "24h"})
            res.cookie('ROBOSOC_TOKEN', jwtToken, {maxAge: 60 * 60 * 1000 * 24, httpOnly : true });//age of cookie = 1hour
            return res.status(200).json({msg : "Login successful"})
        }
        return res.status(401).json({msg : "Unauthorized Access"})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

module.exports = {login,checkAuthenticity}