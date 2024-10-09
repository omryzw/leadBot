const router = require("express").Router();
const controller = require('../controllers/bot.controller');

router.post('/talk',controller.converseWithUser)

module.exports = router;
