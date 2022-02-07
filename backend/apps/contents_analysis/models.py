from django.db import models
from datetime import datetime
from django.utils import timezone
from apps.user.models import User
# Create your models here.

# 3
class ReviewScoreT(models.Model):
    people=models.CharField(max_length=40, null=True, default='')
    drama= models.FloatField(default=0.01) #8.48
    comedy= models.FloatField(default=0.01) #8.48
    action= models.FloatField(default=0.01) #8.48
    thriller= models.FloatField(default=0.01) #8.48
    romance= models.FloatField(default=0.01) #8.48
    crime= models.FloatField(default=0.01) #8.48
    adventure= models.FloatField(default=0.01) #8.48
    animation= models.FloatField(default=0.01) #8.48
    fantasy= models.FloatField(default=0.01) #8.48
    family= models.FloatField(default=0.01) #8.48
    sci_fi= models.FloatField(default=0.01) #8.48
    mystery= models.FloatField(default=0.01) #8.48
    horror= models.FloatField(default=0.01) #8.48
    documentary= models.FloatField(default=0.01) #8.48
    biography= models.FloatField(default=0.01) #8.48
    history= models.FloatField(default=0.01) #8.48
    music= models.FloatField(default=0.01) #8.48
    short= models.FloatField(default=0.01) #8.48
    sport= models.FloatField(default=0.01) #8.48
    war= models.FloatField(default=0.01) #8.48
    musical= models.FloatField(default=0.01) #8.48
    western= models.FloatField(default=0.01) #8.48

# 5,6,7
class ReviewScore(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    # nickname = models.CharField(default='하늘')
    # age = models.CharField(default='10대')      # -> 이렇게 해서 하늘님의 나이가 20대면 
                                                 # -> request.GET.get(age)=='20대' 면 ReviewScoreByAge.objects.get(age='20대')을 보내주고
    review_genre = models.CharField(max_length=20, null=True, default='') #드라마
    average_male = models.FloatField(default=0.01) #8.48
    average_female = models.FloatField(default=0.01)
    average_10s = models.FloatField(default=0.01)
    average_20s = models.FloatField(default=0.01)
    average_30s = models.FloatField(default=0.01)
    average_40s = models.FloatField(default=0.01)
    average_50_up = models.FloatField(default=0.01)
