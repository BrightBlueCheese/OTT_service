from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from .models import User,PreferOttContentGenre
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings

class PreferOttContentGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model=PreferOttContentGenre
        fields='__all__'


#회원가입
class CreateUserSerializer(serializers.ModelSerializer):

    prefer_ott_content_genres = serializers.PrimaryKeyRelatedField(queryset=PreferOttContentGenre.objects.all(), many=True)
    class Meta:
        model= User
        fields=[
            'username',
            'password',
            'nickname',
            'birthday',
            'gender',
            'watch_time',
            'prefer_ott_content_genres',
        ]
        extra_kwargs={'password':{'write_only':True}}
        #serializer relations. FK나 m2m field가 바뀜. -> pk related table 생성됨.
        
    def create(self,validated_data):
        genre_data=validated_data.pop('prefer_ott_content_genres')
        user=User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        #genre엔 preferottgenre_id가 하나씩 들어있음
        for genre in genre_data:
            user.prefer_ott_content_genres.add(genre)

        return user


#접속 유지 확인용
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','username')


JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
#로그인
#ModelSerializer로 구현 한번 해보는걸로 하자.
class LoginUserSerializer(serializers.Serializer):
    username=serializers.CharField(max_length=50)
    password=serializers.CharField(max_length=128,write_only=True)
    token=serializers.CharField(max_length=255,read_only=True)


    def validate(self,data):
        username=data.get('username',None)
        password=data.get('password',None)
        user=authenticate(username=username,password=password)

        if user is None:
           raise serializers.ValidationError('해당 아이디는 없는 아이디입니다.')

        try:
            payload=JWT_PAYLOAD_HANDLER(user)
            jwt_token=JWT_ENCODE_HANDLER(payload)
            update_last_login(None,user)

        except User.DoesNotExist:
            raise serializers.ValidationError("아이디나 비밀번호가 맞지 않습니다.")

        login_serialize={
            'username':user.username,
            'token':jwt_token,
        }
        return login_serialize

