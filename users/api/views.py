from users.models import User, Topic, Material,Activity,Post
from .serializers import UserSerializer, ActivitySerializer,TopicSerializer,PostSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter,)
    filter_fields = ('name', 'topics__name')
    ordering_fields = ('created_at',)
    search_fields = ('name','topics__name', 'id')

class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter,)
    filter_fields = ('activity',)
    ordering_fields = ('created_at',)
    search_fields = ('activity',)
