from rest_framework import serializers
from .models import SmallTheater

# 리엑트연동까지 https://this-programmer.tistory.com/135
# Serializer 자세한 설명 https://brownbears.tistory.com/71
class SmallTheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmallTheater # models.py속 모델
        fields = ('__all__') # 통신할 데이터필드 -> 모든 필드 하려면 '__all__'해도 됨
        # fields = ('id','published_date'...,)
