# backend/books/serializers.py
from rest_framework import serializers
from .models import Book, Review

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publication_date', 'isbn']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'book', 'user', 'rating', 'review_text', 'created_at', 'updated_at']