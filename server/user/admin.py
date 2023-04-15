from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User, ValidationImage

# Register your models here.


class ValidationImageModel(admin.ModelAdmin):
    list_display = ('id', 'file', 'unhrc_number')


class UserModel(admin.ModelAdmin):
    list_display = ('email', 'name', 'role', 'phone_number', 'city', 'country', 'date_of_birth', 'is_verified_doctor')
    list_filter = ('role', )
    search_fields = ('name', 'email', 'phone_number', 'city', 'country')
    list_display_links = ('email', )
    list_editable = ('is_verified_doctor', )


admin.site.register(User, UserModel)
admin.site.register(ValidationImage, ValidationImageModel)
admin.site.unregister(Group)
