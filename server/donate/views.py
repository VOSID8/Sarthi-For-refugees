from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseServerError

import requests, os, string
from datetime import datetime
from random import choice

from .models import Transaction

# Create your views here.


pg_url = "https://sandbox.cashfree.com/pg/orders"

headers = {
    "accept": "application/json",
    "x-client-id": settings.CF_CLIENT_ID,
    "x-client-secret": settings.CF_SECRET_KEY,
    "x-api-version": "2022-09-01",
    "content-type": "application/json"
}


def customer_id(name):
    return f"{name.split(' ')[0]}_{datetime.now().strftime('%Y%m%D%H%M%S')}"

def order_id():
    return f"rehmat_{datetime.now().strftime('%Y%m%D%H%M%S')}_{''.join(choice(string.ascii_letters + string.digits) for _ in range(10))}"

class InitialPayment(APIView):
    def post(self, request):
        amount = request.data.get('amount')

        name = request.data.get('name')
        email = request.data.get('name')
        phone_number = request.data.get('phone_number')

        payload = {
            "customer_details": {
                "customer_id": customer_id(name),
                "customer_email": email,
                "customer_phone": phone_number
            },
            "order_meta": {
                "return_url": "http://127.0.0.1:8000/donate/post-payment?order_id={order_id}",
            },
            "order_id":order_id,
            "order_amount": amount,
            "order_currency": "USD"
        }

        response = requests.post(pg_url, json=payload, headers=headers)
        
        if response.status_code!=200:
            with open(os.path.join(settings.BASE_DIR, 'logs/pg_error.txt'), 'a') as f:
                f.write(str(response.text))
                f.write('\n')

            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response_data = response.json()

        instance = Transaction(
            name = name,
            email = email,
            phone_numer = phone_number,
            customer_id = customer_id,
            order_id = order_id,
            amount = amount,
            cf_order_id = response_data['cf_order_id'],
            payment_session_id = response_data['payment_session_id'],
        )
        instance.save()

        return Response({'payment_session_id': response_data['payment_session_id']}, status=status.HTTP_200_OK)
    

def postPayment(request):
    order_id = request.GET.get('order_id', '')
    order = Transaction.objects.filter(order_id=order_id).first()
    if order is None:
        return HttpResponseNotFound("<h1>Order not found</h1>")
    
    if order.is_paid:
        return HttpResponse("success")
    if order.is_paid==False:
        return HttpResponse("failed")

    response = requests.get(f"{pg_url}/{order_id}", headers=headers)

    if response.status_code!=200:
        with open(os.path.join(settings.BASE_DIR, 'logs/pg_error.txt'), 'a') as f:
            f.write(str(response.text))
            f.write('\n')
        return HttpResponseServerError("Oops! Something went wrong.")
    
    response_data = response.json()

    if response_data['order_status']=='PAID':
        order.is_paid = True
        order.save()
        return HttpResponse('<h1>success</h1>')
    
    order.is_paid = False
    order.save()
    return HttpResponse('<h1>failed</h1>')


def redirect(request):
    return render(request, 'order/initiate.html')
