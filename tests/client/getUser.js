
import axios from 'axios';

const getUser = async (endPoint, id, token) => {
    try {
        const { data } = await axios.get(`${endPoint}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

// example usage
const endPoint = 'http://localhost:4000/api/v1/users';
const id = '6858ce4e4ac4d4a2c096210d';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU4Y2U0ZTRhYzRkNGEyYzA5NjIxMGQiLCJpYXQiOjE3NTA2NTEyMjksImV4cCI6MTc1MDY1NDgyOX0.ul0l7e_lzIS6BLzJ99h89zWnFKpygCiOdqLDyD1ozHY';

(async () => {
    const result = await getUser(endPoint, id, token);
    console.log(result);
})();