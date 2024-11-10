const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {createUser,getUsers,loginUser,updateUser,deleteUser} = require("../controllers/userController");




router.get('/',getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/', getUsers);       
router.put('/update/:id', updateUser); 
router.delete('/delete/:id', deleteUser); 
module.exports = router;