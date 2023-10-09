const mongoose = require("mongoose")

const dataOfIndividual = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    position : {
        type : String,
        enum : ['alumni','president','vice president','secretary','programming head','treasurer','pr head','external affairs head','electroics head',
                'core coordinator','coordinator','executive']
    },
    techStack : {
        type : String,
        default : "",
    },
    image : {
        type : String,
        default : ""
    },
    linkedinLink : {
        type : String,
        default : ""
    },
    githubLink : {
        type : String,
        default : ""
    },
    instaLink : {
        type : String,
        default : ""
    },
    passOutYear : {
        type : Number,
        required : true
    }
})

const projectsOfSociety = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default  : ""
    },
    description : {
        type : String,
        required : true
    }
})

const achievementsOfSociety = new mongoose.Schema({
    heading : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : ""
    },
    year : {
        type : Number,
        required : true,
    }
})

module.exports = {
    individuals : mongoose.model('individual', dataOfIndividual),
    projects : mongoose.model('projects', projectsOfSociety),
    achievements : mongoose.model('achievements', achievementsOfSociety)
}