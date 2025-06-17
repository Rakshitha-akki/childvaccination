const jwt = require('jsonwebtoken');

// Sample payload (you can use user ID, role, etc.)
const payload = {
  userId: "123456",
  role: "parent"
};

// Secret key (should be stored securely, e.g. in env vars)
const secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJyb2xlIjoicGFyZW50IiwiaWF0IjoxNzQ2NDQxMzE3LCJleHAiOjE3NDY0NDQ5MTd9.H0SI0nKKeFJ1vVlWgM3tQnauB7VmzlK505xHkGNxRr4";

// Generate token (expires in 1 hour)
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log("JWT Token:", token);
