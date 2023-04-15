from rest_framework import serializers
from .models import AvailableSlot, ScheduledSlot, Prescription


class AvailableSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableSlot
        exclude = 'doctor'


class UserNameField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name


class ScheduledSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledSlot
        exclude = ['patient', 'doctor']


class PrescriptionSerializer(serializers.ModelSerializer):
    patient = UserNameField(read_only=True)
    doctor = UserNameField(read_only=True)

    class Meta:
        model = Prescription
        fields = ['id', 'patient', 'doctor', 'time', 'text']
