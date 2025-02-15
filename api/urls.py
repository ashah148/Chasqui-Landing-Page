from django.urls import path
from .views import EmailSubscribeView

urlpatterns = [
    path('subscribe/', EmailSubscribeView.as_view(), name='email-subscribe'),
]