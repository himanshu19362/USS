const express = require('express');
const { signup , signin  , getByEmail , sendEmail , update , decode , verify , destroy} = require('../../controllers/user');

const router = express.Router();

router.post('/signup' , signup);
router.post('/signin' , signin);
// router.patch('/updatePassword' , updatePassword);
router.get('/user/:email' , getByEmail);
router.post('/email' , sendEmail);
router.put('/user/:id' , update);
router.post('/decode' , decode);
router.post('/verify' , verify);
router.delete('/user/:id' , destroy);

module.exports = router;
