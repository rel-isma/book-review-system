# backend/books/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class BookSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publication_date', 'isbn']