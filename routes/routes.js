const router = require('express').Router()

const { getAllMembers, addNewMember, deleteMember, editMember, getAllProjects, addNewProject, 
        editProject, deleteProject, getAllAchievements, addNewAchievement, 
        editAchievement, deleteAchievement } = require('../controllers/controllers')

const { login, checkAuthenticity } = require('../middlewares/auth')
const uploadImage = require('../middlewares/uploadImage')

router.route('/login').post(login)

router.route('/members').get(getAllMembers).post(checkAuthenticity,uploadImage.single('image'),addNewMember)
.put(checkAuthenticity,uploadImage.single('image'),editMember).delete(checkAuthenticity,deleteMember)

router.route("/projects").get(getAllProjects).post(checkAuthenticity,uploadImage.single('image'),addNewProject)
.put(checkAuthenticity,uploadImage.single('image'),editProject).delete(checkAuthenticity,deleteProject)

router.route("/achievements").get(getAllAchievements).post(checkAuthenticity,uploadImage.single('image'),addNewAchievement)
.put(checkAuthenticity,uploadImage.single('image'),editAchievement).delete(checkAuthenticity,deleteAchievement)

module.exports = router