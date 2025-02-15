from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EmailSubscriberSerializer

class EmailSubscribeView(APIView):
    def post(self, request):
        serializer = EmailSubscriberSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(
                    {"message": "Thank you for subscribing!"},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                return Response(
                    {"message": "This email is already subscribed."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)