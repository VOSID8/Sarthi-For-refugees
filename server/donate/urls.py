from django.urls import path
from . import views

urlpatterns = [
    path('session-id/', views.InitialPayment.as_view()),
    path('post-payment/', views.postPayment),
    path('redirect/', views.redirect)
]
