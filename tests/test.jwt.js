import jwt from 'jsonwebtoken'

const JWT = {
    jwt_sign: (payload, secretKey) => jwt.sign(payload, secretKey),
    jwt_verify: (token, sercetKey) => jwt.verify(token, sercetKey, (err, decode) => {
        if (!err) {
            return decode
        }
        return err
    })
}

export default JWT;

// Usage example:
import { JWT_SECRET } from "../config/env.js"
import { JWT as J } from '../utils/helper.js'

const token = JWT.jwt_sign({ _id: '123123123123' }, JWT_SECRET);
console.log({ token, JWT_SECRET, res: JWT.jwt_verify(token, JWT_SECRET) });

const t2 = J.jwt_sign({ _id: '123321' }, JWT_SECRET);
console.log({ t2, JWT_SECRET, res: J.jwt_verify(t2, JWT_SECRET) });


