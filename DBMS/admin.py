from django.contrib import admin

# Register your models here.

from .models import Profile, Exhibition, Project

admin.site.register(Profile)
admin.site.register(Exhibition)
admin.site.register(Project)
