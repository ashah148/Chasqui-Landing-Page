from rest_framework import serializers
from .models import EmailSubscriber

class EmailSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSubscriber
        fields = ['email']