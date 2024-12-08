from rest_framework import serializers
from .models import Document

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title','pdf_file', 'pdf_excerpt']

class DocumentWithScoreSerializer(serializers.Serializer):
    document = DocumentSerializer()
    score = serializers.FloatField()