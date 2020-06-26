from DBMS.models import Profile, Project
import datetime
import hashlib


def getProfile(userId=""):
    pass


def setProfile(userId="", newProfile={}):
    pass


def testAddProfile():
    testGroup = Project()
    userId = datetime.datetime.today().strftime("%m_%d_%H_%m")
    newProfile = Profile()
    newProfile.userId = userId
    newProfile.userPassword = hashlib.sha1("123".encode("UTF-8"))
    newProfile.avatar = ""
    newProfile.name = "Test{}".format(userId)
    newProfile.mail = "test@mail.nuk.edu.tw"
    newProfile.website = "https://csie.nuk.edu.tw"
    newProfile.lab = "2066"
    newProfile.roll = "MEMBER"
    newProfile.group = [testGroup]
    newProfile.collection = [testGroup]
    newProfile.notification = [
      {
        "date": datetime.datetime.today(),
        "content": "test",
        "read": False
      }
    ]
    newProfile.save()
