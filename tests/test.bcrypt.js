import bcrypt, { genSaltSync } from "bcryptjs";

const Bcrypt = {
    hash: async (password, salt) => bcrypt.hash(password, genSaltSync(salt || 10)),
    compare: async (str, hash) => bcrypt.compare(str, hash),
}

// Test data
const hashData = await Bcrypt.hash('anc@123', 15);
console.log(hashData); // $2a$15$<hash_value>
console.log(await Bcrypt.compare('anc@123', hashData)); // true

import { Bcrypt as B } from '../utils/helper.js'

const hashData2 = await B.hash('anc@123', 15);
console.log(hashData2); // $2a$15$<hash_value>
console.log(await B.compare('anc@123', hashData2)); // true
