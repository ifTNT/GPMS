// Mongoose connection and schema defination

const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const ExhibitionSchema = new Schema({});
const ProjectSchema = new Schema({});
const ProfileSchema = new Schema({});

const Exhibition = mongoose.model( 'Exhibition', ExhibitionSchema );
const Profile = mongoose.model( 'Profile', Profile );
const Project = mongoose.model( 'Project', Project );

mongoose.connect( 'mongodb://localhost/GPMS_db' ).then(()=>{
  console.log("Database connection successful");
});

export {
  Exhibition, Profile, Project
}