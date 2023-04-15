from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _db


class UserManager(BaseUserManager):
    
    def create_user(self, email, name, phone_number, date_of_birth, city, country, password=None):
        if not email:
            raise ValueError('Email is required!')
        
        user = self.model(
            email = email,
            name = name,
            phone_number = phone_number,
            date_of_birth = date_of_birth,
            city = city,
            country = country,
        )
        user.is_active = True
        user.set_password(password)
        user.save(using = self._db)
        
        return user

    def create_superuser(self, email, name, phone_number, date_of_birth, city, country, password=None):
        user = self.create_user(
            email = self.normalize_email(email),
            name = name,
            phone_number = phone_number,
            date_of_birth = date_of_birth,
            city = city,
            country = country,
            password = password
        )
        
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using = self._db)
        
        return user
