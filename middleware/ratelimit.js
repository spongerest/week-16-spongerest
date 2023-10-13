const { rateLimit } = require('express-rate-limit')

exports.loginLimiter = rateLimit({
	windowMs: 10 * 1 * 1000,
	limit: 5, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 

})