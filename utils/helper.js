import jwt from 'jsonwebtoken';
import bcrypt, { genSaltSync } from 'bcryptjs';

// JWT utility functions for signing and verifying JSON Web Tokens (JWT)
export const JWT = {
    jwt_sign: (payload, secretKey) => jwt.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: '1h' }),
    jwt_verify: (token, secretKey) => {
        try {
            return jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        } catch (err) {
            return err;
        }
    }
};

// Bcrypt utility functions for hashing and comparing passwords
export const Bcrypt = {
    hash: async (password, saltRounds = 10) => bcrypt.hash(password, genSaltSync(saltRounds)),
    compare: async (str, hash) => bcrypt.compare(str, hash)
}


