from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager

# Create your models here.


def id_upload_to(instance, filename):
    return f'refugee/{instance.folder_name}/{filename}'

class ValidationImage(models.Model):
    file = models.ImageField(upload_to=id_upload_to, null=True, default=None, blank=True)
    folder_name = models.CharField(max_length=128, default='')
    unhrc_number = models.CharField(max_length=128, default='')

    def __str__(self):
        return str(self.id)

    def save(self):
        super().save()
        return self
    

DESIGNATION_CHOICES = [
    ['RF', 'Refugee'],
    ['DR', 'Doctor']
]

class User(AbstractBaseUser):

    email = models.EmailField(max_length=256, primary_key=True)

    name = models.CharField(max_length=256)
    phone_number = models.CharField(max_length=32)
    city = models.CharField(max_length=128)
    country = models.CharField(max_length=128)
    date_of_birth = models.DateField()

    doctor_id = models.ImageField(upload_to='upload/doctor', null=True, default=None, blank=True)
    refugee_card = models.ForeignKey(ValidationImage, null=True, default=None, on_delete=models.CASCADE, blank=True)

    role = models.CharField(max_length=2, choices=DESIGNATION_CHOICES, default='DR')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    is_verified_doctor = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone_number', 'city', 'country', 'date_of_birth']

    def get_short_name(self):
        return self.name.split(' ')[0]

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, perm, obj=None):
        return True

    def __str__(self):
        return self.email

