from django.contrib import admin
from .models import Transaction

# Register your models here.


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone_number', 'amount', 'customer_id', 'order_id', 'cf_order_id', 'payment_session_id', 'is_paid')

admin.site.register(Transaction, TransactionAdmin)
