from django.urls import path
from . import views

urlpatterns = [
    path('view/<slug:model>/<slug:role>', views.SlotView.as_view()),
    # view/available/doctor - available slots for logged in doctor
    # view/scheduled/doctor - scheduled slots of logged in doctor
    # view/scheduled/patient - scheduled slots of logged in patient
    # view/prescription/doctor - prescriptions given by logged in doctor
    # view/prescription/patient - prescriptions of logged in patient
    
    path('available-slots/', views.AvailableDoctorSlots.as_view()),
    path('add-free/', views.DoctorFreeSlotAdd.as_view()),
    path('schedule/', views.PatientFinaliseSlot.as_view()),
    path('patient-previous-prescriptions/<int:id>/', views.SlotPatientAllPrescriptions.as_view()),
    path('cancel/', views.CancelScheduledSlot.as_view()),
    path('cancel-doctor-free/', views.CancelDoctorFreeSlot.as_view()),
    path('meeting-details/', views.MeetingDetails.as_view()),
    path('call/<slug:slug>/', views.callView)
]
