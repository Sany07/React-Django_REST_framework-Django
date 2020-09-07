from rest_framework.serializers import ModelSerializer 
from rest_framework import serializers 
from .models import Todo

from django.contrib.auth import get_user_model
# from django.conf import settings

# User = settings.AUTH_USER_MODEL

User = get_user_model()



class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class UserRegistrationSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={
    "input_type": "password"})

    password2 = serializers.CharField(
    style={"input_type": "password"}, write_only=True, label="Confirm password")
    class Meta:
        model = User

        fields =[
            'username',
            'email',
            'password',
            "password2",

        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]
        password2 = validated_data["password2"]

        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {"email": "Email addresses must be unique."})
        if password != password2:
            raise serializers.ValidationError(
                {"password": "The two passwords differ."})
                
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        return user