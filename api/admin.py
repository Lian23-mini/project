from django.contrib import admin
from .models import Cart,Product,UserProfile,Payment

# Register your models here.

admin.site.register([Cart,Product,UserProfile,Payment])