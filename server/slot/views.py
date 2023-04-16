from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from django.http import HttpResponse, HttpResponseForbidden
from django.shortcuts import render

from .serializers import AvailableSlotSerializer, ScheduledSlotSerializer, PrescriptionSerializer
from .models import AvailableSlot, ScheduledSlot, Prescription

from .permissions import IsDoctor, IsRefugee
from .models import ScheduledSlot
from .job import createToken

from datetime import datetime

# Create your views here.


class SlotView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, model, role):
        user = request.user

        if model=='available':
            if not user.is_verified_doctor or user.role!='DR':
                return Response(status=status.HTTP_400_BAD_REQUEST)
            queryset = AvailableSlot.objects.filter(doctor=user).all()
            serializer = AvailableSlotSerializer(queryset, many=True)

        elif model=='scheduled':
            if role=='refugee':
                queryset = ScheduledSlot.objects.filter(patient=user).all()
            elif role=='doctor':
                queryset = ScheduledSlot.objects.filter(doctor=user).all()
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = ScheduledSlotSerializer(queryset, many=True)
        
        elif model=='prescription':
            if role=='refugee':
                queryset = Prescription.objects.filter(patient=user).all()
            elif role=='doctor':
                queryset = Prescription.objects.filter(doctor=user).all()
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = PrescriptionSerializer(queryset, many=True)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)        

        return Response(serializer.data, status=status.HTTP_200_OK)


class AvailableDoctorSlots(APIView):
    permission_classes = [IsAuthenticated&IsRefugee]

    def post(self, request):
        date = request.data.get('date')
        queryset = AvailableSlot.objects.distinct('time')
        date = datetime.strptime(date, '%Y-%m-%d')
        
        data = []
        for item in queryset:
            if item.time.date()==date.date():
                data.append(item.time.strftime('%H:%M'))

        return Response(data, status=status.HTTP_200_OK)


class DoctorFreeSlotAdd(APIView):
    permission_classes = [IsAuthenticated&IsDoctor]

    def post(self, request):
        user = request.user

        if not user.is_verified_doctor or user.role!='DR':
            return Response({'error': 'You are not authorised to visit this page!'}, status=status.HTTP_400_BAD_REQUEST)

        date = request.data.get('date')
        timeArr = request.data.get('time')

        for time in timeArr:
            instance = AvailableSlot(doctor=user, time=datetime.strptime(f"{date}_{time}", "%Y-%m-%d_%H:%M"))
            instance.save()

        return Response(status=status.HTTP_201_CREATED)


class PatientFinaliseSlot(APIView):
    permission_classes = [IsAuthenticated&IsRefugee]

    def post(self, request):
        if ScheduledSlot.objects.filter(patient=request.user, time__gte=datetime.now()).exists():
            return Response({'error': 'Slot already reserved, you can only have one reserved slot at a time!'}, status=status.HTTP_403_FORBIDDEN)

        date = request.data.get('date')
        time = request.data.get('time')
        
        free_slot_instance = AvailableSlot.objects.filter(time=datetime.strptime(f"{date}_{time}", "%Y-%m-%d_%H:%M")).first()
        if free_slot_instance is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        instance = ScheduledSlot(doctor=free_slot_instance.doctor, time=free_slot_instance.time, patient=request.user)
        instance.save()

        free_slot_instance.delete()

        return Response(status=status.HTTP_201_CREATED)


class SlotPatientAllPrescriptions(APIView):
    permission_classes = [IsAuthenticated&IsDoctor]

    def get(self, request, id):
        slot = ScheduledSlot.objects.filter(id=id).first()
        if slot is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        prescription_queryset = Prescription.objects.filter(patient=slot.patient).all()
        serializer = PrescriptionSerializer(prescription_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CancelScheduledSlot(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = request.data.get('id')
        instance = ScheduledSlot.objects.filter(id=id).first()

        if instance is None or (instance.patient!=request.user and instance.doctor!=request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        instance.delete()
        return Response(status=status.HTTP_200_OK)


class CancelDoctorFreeSlot(APIView):
    permission_classes = [IsAuthenticated&IsRefugee]

    def post(self, request):
        id = request.data.get('id')
        instance = AvailableSlot.objects.filter(id=id).first()

        if instance is None or instance.doctor!=request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        instance.delete()
        return Response(status=status.HTTP_200_OK)


class MeetingDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        instance = ScheduledSlot.objects.filter(id=id).first()

        if instance is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if instance.role=='DR':
            return Response({
                'id': instance.id,
                'doctor': instance.doctor.name,
                'patient': instance.patient.name,
                'time': instance.time
            }, status=status.HTTP_200_OK)
        
        return Response({
            'id': instance.id,
            'doctor': instance.doctor.name,
            'patient': instance.patient.name,
            'time': instance.time
        }, status=status.HTTP_200_OK)


def callView(request, slug):
    # token_cookie = request.COOKIES.get('token')

    # try:
    #     token_object = Token.objects.get(key=token_cookie)
    # except:
    #     return HttpResponseForbidden('Authentication Error!')

    # user = token_object.user

    slot = ScheduledSlot.objects.filter(id=slug).first()
    # if slot is None or slot.patient!=user and slot.doctor!=user:
    #     return HttpResponse('Invalid ID')

    creds = createToken(slot)

    return render(request, 'slot/index.html', context={'token': creds['token'], 'channel': creds['channel'], 'uid': creds['uid']})


class NextSlotForDoctor(APIView):
    permission_classes = [IsAuthenticated&IsDoctor]

    def get(self, request):
        instance = ScheduledSlot.objects.filter(doctor=request.user, time__gt=datetime.now()).first()
        if instance is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = ScheduledSlotSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SlotsAttendedTodayByDoctor(APIView):
    permission_classes = [IsAuthenticated&IsDoctor]

    def get(self, request):
        count = ScheduledSlot.objects.filter(doctor=request.user, time__lte=datetime.now(), time__gt=datetime.now().date()).count()
        return Response({'count': count}, status=status.HTTP_200_OK)


class AgoraToken(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = request.data.get('id')
        slot = ScheduledSlot.objects.filter(id=id).first()
        
        if slot is None:
            return Response({'error': 'Invalid Id!'}, status=status.HTTP_400_BAD_REQUEST)
        
        if slot.doctor is not request.user and slot.patient is not request.user or slot.time>datetime.now() or (datetime.now()-slot.time).seconds>300:
            return Response({'error': 'Unauthorised!'}, status=status.HTTP_403_FORBIDDEN)
        
        creds = createToken(slot)

        return Response({'token': creds['token'], 'channel': creds['channel'], 'uid': creds['uid']}, status=status.HTTP_200_OK)

