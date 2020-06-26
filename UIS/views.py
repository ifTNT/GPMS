from django.shortcuts import render
from django.http import HttpResponse
from .userInformation import testAddProfile

def testAddUser(request):
  testAddProfile()
  return HttpResponse('Added user')
