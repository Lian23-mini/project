from ast import Try
from django.shortcuts import render
import json
import stripe
from django.core.mail import send_mail

from django.views import View
from django.shortcuts import redirect

from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import Cart, Product, Payment, UserProfile
from rest_framework.views import APIView

from django.contrib.auth import authenticate

# from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_POST

UserModel = get_user_model()
stripe.api_key = "sk_test_51KjBqNA9KCn8yVMONc3gFAYwrG6HbwHVDeQ3sxLolr9K5iJHSXRmm8FXpkRFtJp7n5WWCjVjmCOlyHYObMnSVRlL00Y6KfPvVR"


# Create your views here.
class LoginView(View):
    def post(self, request):
        jd = json.loads(request.body)
        email = jd["email"]
        password = jd["password"]
        # print(email,password)
        user = authenticate(username=email, password=password)
        if user is not None:
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "avatar": user.avatar,
            }
            return JsonResponse({"success": user_data}, status=200)
        else:
            return HttpResponse("login failed.", status=401)
        # return JsonResponse({"message":"success"})


class CreateUserView(View):
    def post(self, request):
        jd = json.loads(request.body)
        user = UserModel.objects.create_user(username=jd["username"], email=jd["email"])
        user.set_password(jd["password"])
        user.save()
        cart = Cart.objects.create(user=user, products=[])
        return HttpResponse("success", status=200)


class CartView(View):
    def get(self, request, user_id):
        cart = get_object_or_404(Cart, user_id=user_id)
        response_data = {"cart": cart.products}
        # print(response_data)
        return JsonResponse(response_data)

    def put(self, request, user_id):
        jd = json.loads(request.body)
        cart = get_object_or_404(Cart, user_id=user_id)
        cart.products = jd["cart"]
        cart.save()
        return HttpResponse("success", status=200)


class UploadPhotoView(View):
    def post(self, request, user_id):
        jd = json.loads(request.body)
        user = get_object_or_404(UserModel, id=user_id)
        photo = jd["photo"]
        user.avatar = photo
        user.save()
        return HttpResponse("success", status=200)


class ProductView(View):
    def get(self, request):
        products = list(Product.objects.values())
        return JsonResponse({"products": products})


class CheckOutStripeView(View):
    def post(self, request):
        jd = json.loads(request.body)
        client_email = jd["dataForm"]["email"]
        client_name = jd["dataForm"]["names"]

        try:
            payment_intent = stripe.PaymentIntent.create(
                amount=jd["amount"],  # Amount in cents
                currency="mxn",
                description="Example payment",
                payment_method=jd["id_payment"],
                confirm=True,  # Confirm the payment intent immediately
            )
            if payment_intent.status == "succeeded":
                cart = get_object_or_404(Cart, user_id=jd["user_id"])
                cart.products = []
                cart.save()
                try:
                    subject = "Compra Online"
                    message = f"Gracias por tu compra {client_name}! esperamos que vuelvas pronto"
                    from_email = "Carocell1compras@gmail.com"  # Replace with your Gmail email address
                    recipient_list = [
                        client_email
                    ]  # Replace with the recipient's email address

                    send_mail(subject, message, from_email, recipient_list)
                except Exception as e:
                    print(e)
                return HttpResponse("success!", status=200)
            else:
                print("no success response")
                return HttpResponse("payment unsuccessful", status=500)
        except Exception as e:
            print(e)
            return HttpResponse("no payment created", status=500)
