from users.api.views import (UserViewSet,ActivityViewSet,TopicViewSet,PostViewSet)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'activity', ActivityViewSet, basename='activity')
router.register(r'topic',TopicViewSet, basename='topic')
router.register(r'post',PostViewSet, basename='post')


urlpatterns = router.urls