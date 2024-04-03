const jwt = require("jsonwebtoken");

const generateJWT = ( 
    _id: string,
    login: string =  "",
    expiresIn = process.env.EXPIRES_IN,
    jwtSecret = process.env.JWT_SECRET
) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            login,
        };
        console.log("this is", payload);
        jwt.sign(
            payload,
            jwtSecret, 
            {
                expiresIn: expiresIn, 
            }, 
            (error: string, token: string) => {
                if (error) {
                    console.log(error);
                    reject("No se puede generar token");
                } else resolve(token);
            }
        );
    });
};



export default generateJWT;