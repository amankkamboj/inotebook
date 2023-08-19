const jwt = require("jsonwebtoken");
const JSON_SECRET = "Aman!Kamboj!1232#";

const fetchuser =(req,res,next) => {
    //Get the user from jwt token
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({error: "Please authenticate using valid token."})
    }
    try {
        const data = jwt.verify(token,JSON_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "Please authenticate using valid token."})
    }
}

module.exports=fetchuser;