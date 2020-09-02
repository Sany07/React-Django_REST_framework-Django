from rest_framework import generics

from .models import Todo
from.serializers import TodoSerializer


class TodoListView(generics.ListCreateAPIView):
    queryset = Todo.objects.order_by('-id')
    serializer_class = TodoSerializer

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer