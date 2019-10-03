from users.api.views import (UserViewSet,ActivityViewSet,TopicViewSet)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'activity', ActivityViewSet, basename='activity')
router.register(r'topic', TopicViewSet, basename='topic')


urlpatterns = router.urls