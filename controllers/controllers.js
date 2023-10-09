const {individuals, projects, achievements} = require('../models/model')
const fs = require('fs');
const path = require('path')

const getAllMembers = async(req,res)=>{
    try {
        let {query} = req
        if(!query){
            let members = await individuals.find({})
            return res.status(200).json({data : members})
        }
        let members = await individuals.find(query)
        if(members){
            return res.status(200).json({data : members})
        }
        return res.status(404).json({msg : "No such members"})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

const addNewMember = async(req,res)=>{
    try {
        let {name,position,techStack,passOutYear,instaLink,githubLink,linkedinLink} = req.body
        if(!name || !position || !techStack || !passOutYear){
            if(req.filename===undefined){
                return res.status(400).json({message : 'Full details not provided'})
            }
            const filePath = path.join(__dirname, '..', 'images', req.filename)
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Deleted file: ${filePath}`);
            }
            });
            return res.status(400).json({message : 'Full details not provided'})
        }
        if(req.filename===undefined){
            return res.status(400).json({message : 'Image not provided'})
        }
        let newMember = await individuals.create({
            name,
            position : position.toLowerCase(),
            techStack,
            image : req.filename,
            passOutYear,
            instaLink,
            githubLink,
            linkedinLink
        })
        return res.status(201).json({msg: 'Member added'})
    } catch (error) {
        if(req.filename){
            const filePath = path.join(__dirname, '..', 'images', req.filename)
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Deleted file: ${filePath}`);
            }
            });
        }
        res.status(500).json({error : error.message})
    }
}

const editMember = async(req,res)=>{
    try {
        let {id,name,position,techStack,instaLink,linkedinLink,githubLink,passOutYear} = req.body
        // console.log(req.body)
        let memberToBeEdited = await individuals.findById(id)
        if(!memberToBeEdited){
            if(req.filename){
                const filePath = path.join(__dirname, '..', 'images', req.filename)
                fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted file: ${filePath}`);
                }
                });
            }
            return res.status(404).json({msg:"No such member"})
        }
        if(req.filename!==undefined){
            const filePath = path.join(__dirname, '..', 'images', memberToBeEdited.image)
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Deleted file: ${filePath}`);
            }
            });
            memberToBeEdited.image = req.filename
        }
        if(name){
            memberToBeEdited.name = name
        }
        if(techStack){
            memberToBeEdited.techStack = techStack
        }
        if(position){
            memberToBeEdited.position = position.toLowerCase()
        }
        if(passOutYear){
            memberToBeEdited.passOutYear = passOutYear
        }
        if(githubLink){
            memberToBeEdited.githubLink = githubLink
        }
        if(linkedinLink){
            memberToBeEdited.linkedinLink = linkedinLink
        }
        if(instaLink){
            memberToBeEdited.instaLink = instaLink
        }
        await memberToBeEdited.save()
        return res.status(200).json({msg:"Member updated successfully"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error : error.message})
    }
}

const deleteMember = async(req,res)=>{
    try {
        let {id} = req.query
        // console.log(id)
        let memberToBeDeleted = await individuals.findByIdAndDelete(id)
        if(!memberToBeDeleted){
            return res.status(404).json({msg:"No such member"})
        }
        const filePath = path.join(__dirname, '..', 'images', memberToBeDeleted.image)
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err)
            }
            else {
                console.log(`Deleted file: ${filePath}`);
            }
        })
        return res.status(200).json({msg: "Member deleted successfully"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllProjects = async(req,res)=>{
    try {
        let projectsOfSociety = await projects.find({})
        return res.status(200).json({data : projectsOfSociety})
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}

const addNewProject = async(req,res)=>{
    try {
        let {name,description} = req.body
        if(!name || !description){
            if(req.filename===undefined){
                return res.status(400).json({message : 'Full details not provided'})
            }
            const filePath = path.join(__dirname, '..', 'images', req.filename)
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Deleted file: ${filePath}`);
            }
            });
            return res.status(400).json({message : 'Full details not provided'})
        }
        if(req.filename===undefined){
            return res.status(400).json({message : 'Image not provided'})
        }
        let project = await projects.create({
            name : name,
            description : description,
            image : req.filename
        })
        return res.status(201).json({msg : "Project added successfully"})
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}

const editProject = async(req,res)=>{
    try{
        let {id,name,description} = req.body
        let projectToBeEdited = await projects.findById(id)
        if(!projectToBeEdited){
            if(req.filename){
                const filePath = path.join(__dirname, '..', 'images', req.filename)
                fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted file: ${filePath}`);
                }
                });
            }
            return res.status(404).json({msg:"No such project"})
        }
        if(req.filename!==undefined){
            const filePath = path.join(__dirname, '..', 'images', projectToBeEdited.image)
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Deleted file: ${filePath}`);
            }
            });
            projectToBeEdited.image = req.filename
        }
        if(name){
            projectToBeEdited.name = name
        }
        if(description){
            projectToBeEdited.description = description
        }
        await projectToBeEdited.save()
        return res.status(200).json({msg : "Project updated successfully"})
    }catch(error){
        return res.status(500).json({error : error.message})
    }
}

const deleteProject = async(req,res)=>{
    try {
        let {id} = req.query
        let projectToBeDeleted = await projects.findByIdAndDelete(id)
        if(!projectToBeDeleted){
            return res.status(404).json({msg:"No such project"})
        }
        const filePath = path.join(__dirname, '..', 'images', projectToBeDeleted.image)
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err)
            }
            else {
                console.log(`Deleted file: ${filePath}`);
            }
        })
        return res.status(200).json({msg: "Project deleted successfully"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//achievements
const getAllAchievements = async(req,res)=>{
    try {
        let achievementsOfSociety = await achievements.find({}).sort({year : 1})
        return res.status(200).json({data : achievementsOfSociety})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const addNewAchievement = async(req,res)=>{
    try {
        let {name,description,year} = req.body
        if(!name || !description || !year){
            if(req.filename===undefined){
                return res.status(400).json({message : 'Full details not provided'})
            }
            const filePath = path.join(__dirname, '..', 'images', req.filename)
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Deleted file: ${filePath}`);
            }
            });
            return res.status(400).json({message : 'Full details not provided'})
        }
        if(req.filename===undefined){
            return res.status(400).json({message : 'Image not provided'})
        }
        let achievement = await achievements.create({
            heading : name,
            description : description,
            image : req.filename,
            year : year
        })
        return res.status(201).json({msg : "Achievement added successfully"})
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}

const editAchievement = async(req,res)=>{
    try{
        let {id,name,description,year} = req.body
        let achievementToBeEdited = await achievements.findById(id)
        if(!achievementToBeEdited){
            if(req.filename){
                const filePath = path.join(__dirname, '..', 'images', req.filename)
                fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted file: ${filePath}`);
                }
                });
            }
            return res.status(404).json({msg:"No such Achievement"})
        }
        if(req.filename!==undefined){
            const filePath = path.join(__dirname, '..', 'images', achievementToBeEdited.image)
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Deleted file: ${filePath}`);
            }
            });
            achievementToBeEdited.image = req.filename
        }
        if(name){
            achievementToBeEdited.heading = name
        }
        if(description){
            achievementToBeEdited.description = description
        }
        if(year){
            achievementToBeEdited.year = year
        }
        await achievementToBeEdited.save()
        return res.status(200).json({msg : "Achievement updated successfully"})
    }catch(error){
        return res.status(500).json({error : error.message})
    }
}

const deleteAchievement = async(req,res)=>{
    try {
        let {id} = req.query
        let achievementToBeDeleted = await achievements.findByIdAndDelete(id)
        if(!achievementToBeDeleted){
            return res.status(404).json({msg:"No such achievement"})
        }
        const filePath = path.join(__dirname, '..', 'images', achievementToBeDeleted.image)
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err)
            }
            else {
                console.log(`Deleted file: ${filePath}`);
            }
        })
        return res.status(200).json({msg: "Achievement deleted successfully"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllMembers, addNewMember,editMember,deleteMember,
    getAllProjects,editProject,deleteProject,addNewProject,
    getAllAchievements,addNewAchievement,editAchievement,deleteAchievement
}