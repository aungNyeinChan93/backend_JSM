

const getUsers = async (endPoint, token) => {
    try {
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Users fetched successfully:', data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Example usage
const endPoint = 'http://localhost:4000/api/v1/users';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU4Y2U0ZTRhYzRkNGEyYzA5NjIxMGQiLCJpYXQiOjE3NTA2NTA0NDYsImV4cCI6MTc1MDY1NDA0Nn0.hn9XJaObFy0Pn518ykApldHBqs75H6oTup-6MPy6JJc';

(async () => {
    await getUsers(endPoint, token);
})();

