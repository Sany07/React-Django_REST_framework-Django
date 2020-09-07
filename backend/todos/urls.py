
from django.urls import path
from .views import  TodoListView, TodoDetailView, UserCreateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,TokenVerifyView
)

urlpatterns = [
    path('todos/', TodoListView.as_view()),
    path('todo/<int:pk>/', TodoDetailView.as_view()),
    path('register/', UserCreateView.as_view()),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]