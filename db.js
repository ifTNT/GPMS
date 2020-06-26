// Mongoose connection and schema defination

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExhibitionSchema = new mongoose.Schema({
  year: Number,
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    default: "高雄市楠梓區高雄大學路700號圖資2樓"
  },
  mapB64: String,
  poster: String,
  freezed: Boolean
});

const commentsSchema = new mongoose.Schema({ // used in ProjectSchema
  name: String, // 該留言的作者名稱, string
  content: String // 留言內容
});
const stickersSchema = new mongoose.Schema({ // used in ProjectSchema
  stickerId: Number, // 公告的ID, integer
  date: Date, // 公告的日期, date
  name: String, // 公告的發布者, string
  content: String
});
const eventsSchema = new mongoose.Schema({ // used in ProjectSchema
  evnetId: Number, // 事件ID, integer
  date: Date, // 事件日期, date 
  content: String // 事件內容, string
});

const ProjectSchema = new mongoose.Schema({
  year: Number,
  nthGroup: Number,
  topic: String,
  description: String,
  tag: [String],
  grade: Number,
  browse: Number,
  comment: [commentsSchema],
  board: {
    nextStickerId: Number,
    stickers: [stickersSchema]
  },
  calender: {
    nextEventId: Number, // 下一個事件的 ID, 嚴格遞增
    events: [eventsSchema]
  },
  teacher: String,
  leader: String,
  members: [String]
});

const notificationSchema = new mongoose.Schema({
  date: Date, // 通知日期, date
  content: String, // 通知內容, string
  read: Boolean // 是否已讀，booleanF
});

const ProfileSchema = new mongoose.Schema({
  userId: String, // 使用者ID, string
  userPassword: String, // 使用者密碼, sha1 hash後, string
  avatar: String, // 以Bae64編碼過後的使用者頭像, string
  name: String, // 使用者名稱, string
  mail: String, // 使用者電子郵件, string
  website: String, // 使用者個人網站, string
  lab: String, // 實驗室名稱, 老師專屬欄位, 如果是學生則為空字串, string
  roll: {
    type: String,
    enum: ['guest','member','leader','teacher','admin'],
    default: 'guest'
  }, // 使用者的角色, enum Roll
  group: [ProjectSchema],
  collection: [ProjectSchema],
  notification: [notificationSchema]
});

const VoteSchema = new mongoose.Schema({
  year: Number,
  nthGroup: Number, // 第幾組(從1開始), integer
  userId: String
});

const Exhibition = mongoose.model('Exhibition', ExhibitionSchema);
const Profile = mongoose.model('Profile', Profile);
const Project = mongoose.model('Project', Project);

mongoose.connect('mongodb://localhost/GPMS_db').then(() => {
  console.log("Database connection successful");
});

export {
  Exhibition,
  Profile,
  Project
}