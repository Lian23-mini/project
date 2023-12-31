from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    image = models.TextField(default="")

    def __str__(self):
        return self.name
    # image = models.ImageField(upload_to='products')
    
class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    products = JSONField(blank=True)
    def __str__(self):
        return f"{self.user.username}'s cart"


class UserProfile(AbstractUser):
    avatar = models.TextField(default="",blank=True)

class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,verbose_name="Cliente")
    amount = models.DecimalField(max_digits=10, decimal_places=2,verbose_name="Cantidad")
    description = models.TextField(blank=True,verbose_name="Description")
    created = models.DateTimeField(default=timezone.now,verbose_name="Fecha",blank=True)
    def __str__(self):
        return f"Pago de {self.user.username}"