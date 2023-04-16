from django.db import models

# Create your models here.

class Transaction(models.Model):
    name = models.CharField(max_length=256)
    email = models.EmailField(max_length=256)
    phone_number = models.CharField(max_length=20)
    customer_id = models.CharField(max_length=256)
    order_id = models.CharField(max_length=256)
    cf_order_id = models.CharField(max_length=2500)
    payment_session_id = models.CharField(max_length=3000)
    amount = models.IntegerField()

    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name.split(' ')[0]}_{str(self.amount)}"
