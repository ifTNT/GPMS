from djongo import models

MAX_USER_ID = 20
MAX_DESCRIPTION = 500
MAX_NORMAL_STR = 100
MAX_BASE64 = 2**20
LEN_SHA1 = 40


class Exhibition(models.Model):
    year = models.IntegerField()
    date = models.DateField()
    location = models.CharField(max_length=MAX_NORMAL_STR)
    mapB64 = models.CharField(max_length=MAX_BASE64)
    poster = models.CharField(max_length=MAX_BASE64)
    freezed = models.BooleanField()

# =========== Begin Announcing Board ==============


class Sticker(models.Model):
    stickerId = models.IntegerField()
    date = models.DateTimeField()
    name = models.CharField(max_length=MAX_USER_ID)
    content = models.CharField(max_length=MAX_DESCRIPTION)

    class Meta:
        abstract = True


class Board(models.Model):
    nextStickerId = models.IntegerField()
    stickers = models.EmbeddedField(Sticker)

    class Meta:
        abstract = True

# =============End Announcing Board ===============

# =============== Begin Calender ==================


class Event(models.Model):
    eventId = models.IntegerField()
    date = models.DateTimeField()
    content = models.CharField(max_length=MAX_DESCRIPTION)

    class Meta:
        abstract = True


class Calender(models.Model):
    nextEventId = models.IntegerField()
    events = models.ArrayField(Event)

    class Meta:
        abstract = True

# ================= End Calender ==================

# ================== Begin Misc ===================


class Note(models.Model):
    noteText = models.CharField(max_length=MAX_BASE64)


class Comment(models.Model):
    name = models.CharField(MAX_USER_ID)
    content = models.CharField(MAX_DESCRIPTION)

    class Meta:
        abstract = True

# ==================== End Misc ===================


class Project(models.Model):

    year = models.IntegerField()
    nthGroup = models.IntegerField()
    topic = models.CharField(max_length=MAX_NORMAL_STR)
    description = models.CharField(max_length=MAX_DESCRIPTION)
    tag = models.ArrayField(models.CharField(MAX_NORMAL_STR))
    grade = models.IntegerField()
    browse = models.IntegerField()
    comment = models.ArrayField(Comment)
    board = models.EmbeddedField(Board)
    calender = models.EmbeddedField(Calender)
    teacher = models.CharField(max_length=MAX_USER_ID)
    leader = models.CharField(max_length=MAX_USER_ID)
    members = models.ArrayField(models.CharField(max_length=MAX_USER_ID))
    
    # Originally want tu use circular embbded document.
    # But python prevent this :(
  
    #import DBMS.models_profile as models_profile
    #teacher = models.EmbeddedField(models_profile.Profile)
    #leader = models.EmbeddedField(models_profile.Profile)
    #member = models.ArrayField(models_profile.Profile)
