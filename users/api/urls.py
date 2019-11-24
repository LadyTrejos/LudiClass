from users.api.views import (UserViewSet,ActivityViewSet,TopicViewSet,PostViewSet, FavoritesViewSet)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'activity', ActivityViewSet, basename='activity')
router.register(r'topic',TopicViewSet, basename='topic')
router.register(r'post',PostViewSet, basename='post')
router.register(r'favorites', FavoritesViewSet, basename='favorites')

urlpatterns = router.urls