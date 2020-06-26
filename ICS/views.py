from django.shortcuts import render
from djongo import BulkWrite
from DBMS.models import Profile
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect, FileResponse
import json

# Create your views here.

def getNotification(request):
    if request.method == "GET":
        uid = request.GET['userId']
        try:
            notifiQue = Profile(userId=uid)
            print(notifiQue)
            return JsonResponse(notifiQue)
        except Exception as e:
            print(e)
            return HttpResponse('the id do not exist')
    else:
        return HttpResponse('invalid request')

def sendNotification(request):  # targetUserId = “”, sourceUserId = “”, content = “”
    notifi = request.POST
    
    # entry = Entry.objects.get(pk=p_key) # Queries the DB once
    # entry.headline = 'The Beatles reconcile'
    # entry.save() # Djongo does not really do a update to MongoDB
    # Entry.objects.create(name='How the beatles reconciled')