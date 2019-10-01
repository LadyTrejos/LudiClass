from users.api.views import (UserViewSet,ActivityViewSet)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'activity', ActivityViewSet, basename='activity')


urlpatterns = router.urls