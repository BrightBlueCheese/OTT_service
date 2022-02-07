from django.db import models
from datetime import datetime
from django.utils import timezone

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
from .validators import NickNameValidator


#django의 기본 그룹, 허가권 관리를 해줘야하는지 잘 모르겠지만,
#일단 해봄.
#,null=True, blank=True

#버전1에서 배열을 db에 어떤 형태로 집어넣어 줘야할지,생각이 안나고
#만약에 풀어 쓴다고해도 다시 genre_list테이블을 만들어서
#거기에 집어넣어준 다음에 OneToOneField를 해줘야 할거같다 버전2채택.


class UserManager(BaseUserManager):
    def create_user(self,username,password,**extra_kwargs):
        if not username:
            raise ValueError('id를 입력하지 않았습니다.')
        user= self.model(
            username=username,
            **extra_kwargs
        )
        user.set_password(password)
        user.save(self._db)
        return user
        
    def create_superuser(self, username,password,**extra_kwargs):
        extra_kwargs.setdefault('is_admin',True)
        extra_kwargs.setdefault('is_superuser',True)
        extra_kwargs.setdefault('is_staff',True)
        user= self.create_user(username,password,**extra_kwargs)
        #user.is_admin=True
        #user.is_superuser=True
        #user.save(self._db)
        return user


class PreferOttContentGenre(models.Model):
    #id=models.AutoField(primary_key=True)
    #user=models.OneToOneField(User,on_delete=models.CASCADE,null=True, blank=True)

    title=models.CharField(max_length=100,null=True, blank=True)

    drama=models.IntegerField(null=True, blank=True)
    comedy=models.IntegerField(null=True, blank=True)
    action=models.IntegerField(null=True, blank=True)
    thriller=models.IntegerField(null=True, blank=True)
    romance=models.IntegerField(null=True, blank=True)
    crime=models.IntegerField(null=True,blank=True)
    adventure=models.IntegerField(null=True, blank=True)
    animation=models.IntegerField(null=True, blank=True)
    fantasy=models.IntegerField(null=True, blank=True)
    family=models.IntegerField(null=True, blank=True)
    sci_fi=models.IntegerField(null=True, blank=True)
    mystery=models.IntegerField(null=True, blank=True)
    horror=models.IntegerField(null=True, blank=True)
    documentary=models.IntegerField(null=True, blank=True)
    biography=models.IntegerField(null=True, blank=True)
    history=models.IntegerField(null=True, blank=True)
    music=models.IntegerField(null=True,blank=True)
    short=models.IntegerField(null=True, blank=True)
    sport=models.IntegerField(null=True, blank=True)
    war=models.IntegerField(null=True, blank=True)
    musical=models.IntegerField(null=True, blank=True)
    reality_tv=models.IntegerField(null=True, blank=True)
    western=models.IntegerField(null=True, blank=True)
    game_show=models.IntegerField(null=True, blank=True)
    talk_show=models.IntegerField(null=True, blank=True)

    img_link=models.CharField(max_length=256,null=True, blank=True)    


class User(AbstractBaseUser,PermissionsMixin):
    class Meta:
        db_table='user'

    #id=models.AutoField(primary_key=True)
    username=models.CharField(max_length=50,unique=True)
    
    nickname_validator=NickNameValidator()
    nickname=models.CharField(
        max_length=50,
        validators=[nickname_validator]
    )

    birthday=models.DateField(null=True, blank=True)
    gender=models.CharField(max_length=50,null=True, blank=True)
    watch_time=models.IntegerField(null=True, blank=True)

    is_active=models.BooleanField(default=True)
    is_admin=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)

    prefer_ott_content_genres=models.ManyToManyField(PreferOttContentGenre)

    objects=UserManager()

    USERNAME_FIELD='username'
    REQUIRED_FIELDS=[]

    def __str__(self):
        return self.nickname





