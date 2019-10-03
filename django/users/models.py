from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone
from django.forms import ModelForm, PasswordInput
from django.conf import settings
from djongo import models as djongomodels


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, username, password=None):
        """
        Creates and saves a User with the given email, username and password.
        """
        if not email:
            raise ValueError('Los usuarios deben tener un correo electrónico')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_admin(self, email, username, password):
        """
        Creates and saves an admin with the given email, username and password.
        """
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
        )
        user.is_admin = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        """
        Creates and saves a superuser with the given email, username and password.
        """
        user = self.create_user(
            email,
            username = username,
        )
        user.is_staff = True
        user.is_user = False
        user.is_admin = False
        user.is_superuser = True
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, primary_key=True, unique=True)
    email = models.EmailField(unique=True)

    is_user = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'username' ]

    def __str__(self):
        return self.username


class Topic(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Activity(models.Model):
    picture = models.ImageField(upload_to="activity_img")
    name = models.CharField(max_length=120)
    description = models.TextField()
    topics = models.ManyToManyField(Topic, related_name='activity_topic', blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activity_user')


    def __str__(self):
        return self.name

class Material(models.Model):
    file_url = models.FileField(upload_to="local_comments", blank=True)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='material_activity')

# FORMS

class UserForm(ModelForm):
    class Meta:
        model = User
        widgets = {
            'password': PasswordInput(),
        }
        fields = (
            'username',
            'email',
            'is_admin'
        )