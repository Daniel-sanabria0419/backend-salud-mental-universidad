<<<<<<< HEAD
import jwt from "jsonwebtoken";
const JWT_KEY ="hvlesabdviuberoiavioonfeiohfhcyrnlkasn"
export class AuthApplication{
    static generateToken(payload:object):string{
        return jwt.sign(payload,JWT_KEY,{expiresIn:"1h"})
    }
    static verifyToken(token:string):any{
        return jwt.verify(token,JWT_KEY);
    }
=======
import jwt from "jsonwebtoken";
const JWT_KEY ="hvlesabdviuberoiavioonfeiohfhcyrnlkasn"
export class AuthApplication{
    static generateToken(payload:object):string{
        return jwt.sign(payload,JWT_KEY,{expiresIn:"1h"})
    }
    static verifyToken(token:string):any{
        return jwt.verify(token,JWT_KEY);
    }
>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f
}