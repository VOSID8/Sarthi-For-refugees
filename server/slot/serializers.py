from rest_framework import serializers
from .models import AvailableSlot, ScheduledSlot, Prescription


class TimeField(serializers.ReadOnlyField):
    def to_representation(self, value):
        return super().to_representation(value)

class AvailableSlotSerializer(serializers.ModelSerializer):
    date_str = serializers.SerializerMethodField()
    time_str = serializers.SerializerMethodField()

    def get_date_str(self, obj):
        return obj.time.strftime('%Y-%m-%d')

    def get_time_str(self, obj):
        return obj.time.strftime('%H:%M')

    class Meta:
        model = AvailableSlot
        fields = ['date_str', 'time_str']


class UserNameField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name


class ScheduledSlotSerializer(serializers.ModelSerializer):
    date_str = serializers.SerializerMethodField()
    time_str = serializers.SerializerMethodField()

    doctor = UserNameField(read_only=True)

    def get_date_str(self, obj):
        return obj.time.strftime('%Y-%m-%d')

    def get_time_str(self, obj):
        return obj.time.strftime('%H:%M')

    class Meta:
        model = ScheduledSlot
        fields = ['id', 'date_str', 'time_str', 'doctor']


class PrescriptionSerializer(serializers.ModelSerializer):
    date_str = serializers.SerializerMethodField()
    time_str = serializers.SerializerMethodField()

    def get_date_str(self, obj):
        return obj.time.strftime('%Y-%m-%d')

    def get_time_str(self, obj):
        return obj.time.strftime('%H:%M')

    patient = UserNameField(read_only=True)
    doctor = UserNameField(read_only=True)

    class Meta:
        model = Prescription
        fields = ['id', 'patient', 'doctor', 'date_str', 'time_str', 'text']
