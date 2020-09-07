from rest_framework import generics

from .models import Todo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from.serializers import TodoSerializer, UserRegistrationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class TodoListView(generics.ListCreateAPIView):
    queryset = Todo.objects.order_by('-id')
    serializer_class = TodoSerializer

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()
