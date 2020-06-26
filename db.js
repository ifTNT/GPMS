// Mongoose connection and schema defination

const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const ExhibitionSchema = new Schema({});
const ProjectSchema = new Schema({});
const ProfileSchema = new Schema({});

const Exhibition = mongoose.model( 'Exhibition', ExhibitionSchema );
const Profile = mongoose.model( 'Profile', ProfileSchema );
const Project = mongoose.model( 'Project', ProjectSchema );

mongoose.connect('mongodb://localhost/GPMS_db', {useNewUrlParser: true, useUnifiedTopology: true} ).then(()=>{
  console.log("Database connection successfully established");
});

module.exports = {
  Exhibition, Profile, Project
}