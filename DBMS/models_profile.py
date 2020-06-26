from djongo import models

MAX_USER_ID = 20
MAX_DESCRIPTION = 500
MAX_NORMAL_STR = 100
MAX_BASE64 = 2**20
LEN_SHA1 = 40


class Notification(models.Model):
    date = models.DateTimeField()
    content = models.CharField(max_length=MAX_DESCRIPTION)
    read = models.BooleanField()

    class Meta:
        abstract = True


class Profile(models.Model):

    userId = models.CharField(max_length=MAX_USER_ID)
    userPassword = models.CharField(max_length=LEN_SHA1)
    avatar = models.CharField(max_length=MAX_BASE64)
    name = models.CharField(max_length=MAX_USER_ID)
    mail = models.CharField(max_length=MAX_NORMAL_STR)
    website = models.CharField(max_length=MAX_NORMAL_STR)
    lab = models.CharField(max_length=MAX_NORMAL_STR)
    roll = [
        ('GUEST', 'guest'),
        ('MEMBER', 'member'),
        ('LEADER', 'leader'),
        ('TEACHER', 'teacher'),
        ('ADMIN', 'admin')
    ]

  # Yuck! Python Circular Import.
    import DBMS.models_project as models_project

    group = models.ArrayField(models_project.Project)
    collection = models.ArrayField(models_project.Project)
    notification = models.EmbeddedField(Notification)
