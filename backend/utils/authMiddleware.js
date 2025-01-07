// const jwt = require('jsonwebtoken');
// const Parent = require('../models/Parents');
// const Student = require('../models/Students');
// const Tutor = require('../models/Tutors');

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       let user;

//       // Get the user role based on the token
//       if (decoded.role === 'tutor') {
//         user = await Tutor.findById(decoded.id).select('-password');
//       } else if (decoded.role === 'student') {
//         user = await Student.findById(decoded.id).select('-password');
//       } else if (decoded.role === 'parent') {
//         user = await Parent.findById(decoded.id).select('-password');
//       }

//       if (!user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//       req.user = user; // Store user information in the request
//       req.user.role = decoded.role;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = { protect };
// rs