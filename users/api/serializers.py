from rest_framework import serializers
from rest_framework.authtoken.models import Token
from users.models import User, Topic, Material,Activity,Post

class UserSerializer(serializers.ModelSerializer):
    is_superuser = serializers.BooleanField(read_only=True)
    password = serializers.CharField(style={'input_type': 'password'})
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "activities",
            "password",
            "is_user",
            "is_admin",
            "is_active",
            "is_superuser"
        )

class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('key', 'user')

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
