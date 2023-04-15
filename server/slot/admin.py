from django.contrib import admin
from .models import AvailableSlot, ScheduledSlot, Prescription

# Register your models here.


class AvailableSlotAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor', 'time')
    list_filter = ('time', )
    search_fields = ('doctor__name', 'doctor__email', 'doctor__phone_number')


class ScheduledSlotAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor', 'patient', 'time')
    list_filter = ('time', )
    search_fields = ('doctor__name', 'patient__name', 'doctor__email', 'patient__email', 'doctor__phone_number', 'patient__phone_number')


class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor', 'patient', 'time')
    list_filter = ('time', )
    search_fields = ('doctor__name', 'patient__name', 'doctor__email', 'patient__email', 'doctor__phone_number', 'patient__phone_number')


admin.site.register(AvailableSlot, AvailableSlotAdmin)
admin.site.register(ScheduledSlot, ScheduledSlotAdmin)
admin.site.register(Prescription, PrescriptionAdmin)
