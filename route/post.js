const postController = require('../controllers/postcontroller')
const permission = require('../permission/index')
const { Router } = require('express')
const router = Router()

router.post("", permission.is_authenticated, postController.createPost)
router.get("/",(req,res) => {permission.is_authenticated, postController.getPost,
res.send('GET request received');})

module.exports = router