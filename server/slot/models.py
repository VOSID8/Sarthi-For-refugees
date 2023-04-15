from django.db import models
from user.models import User

# Create your models here.


class AvailableSlot(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='available_slot')
    time = models.DateTimeField()

    def __str__(self):
        return f"{self.doctor}_{self.time}"


class ScheduledSlot(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_slot')
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor_slot')
    time = models.DateTimeField()

    slug = models.CharField(max_length=600, unique=True, null=True, default=None)
    uid = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.patient}_{self.doctor}_{self.time}"


class Prescription(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_prescription')
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor_prescription')
    time = models.DateTimeField()
    text = models.TextField()

    def __str__(self):
        return f"{self.patient}_{self.doctor}_{self.time}"
