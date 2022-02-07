from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# Create your views here.
from .models import User,PreferOttContentGenre

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView,View
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, GenericAPIView,ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from .serializer import CreateUserSerializer, LoginUserSerializer,PreferOttContentGenreSerializer
import csv
import random

"""
View에도 Model처럼 4계층으로 상속이 진행됨.
APIView -> GenericView -> Concrete View classes -> Viewsets
"""
#title,drama,comedy,action,thriller,romance,crime,adventure,animation,fantasy,family,
# sci-fi,mystery,horror,documentary,biography,history,music,short,sport,war,musical,
# reality-tv,western,game-show,talk-show,img_link

#왜 csv.DictReader로 했을때 인식을 못했을까.. 시간이 남을때 이걸로 다시 실행해보자.
# def csvToModel(request):
#     with open('apps/user/ott_contents.csv','r') as f:
#         # rows = csv.reader(f, delimiter = ',')
#         data=f.readline()
#         rows=csv.reader(f,delimiter = ',')
#         for row in rows:
#             PreferOttContentGenre.objects.create(
#                 title=row[0],
#                 drama=row[1],
#                 comedy=row[2],
#                 action=row[3],
#                 thriller=row[4],
#                 romance=row[5],
#                 crime=row[6],
#                 adventure=row[7],
#                 animation=row[8],
#                 fantasy=row[9],
#                 family=row[10],
#                 sci_fi=row[11],
#                 mystery=row[12],
#                 horror=row[13],
#                 documentary=row[14],
#                 biography=row[15],
#                 history=row[16],
#                 music=row[17],
#                 short=row[18],
#                 sport=row[19],
#                 war=row[20],
#                 musical=row[21],
#                 reality_tv=row[22],
#                 western=row[23],
#                 game_show=row[24],
#                 talk_show=row[25],
#                 img_link=row[26]
#             )
#     return HttpResponse('csv변환 완료')


class ListContentView(ListAPIView):
    serializer_class=PreferOttContentGenreSerializer
    permission_classes=(AllowAny,)
    def get_queryset(self):
        #선호 장르들에 선호장르 정보 모두 다 가져오기
        queryset=PreferOttContentGenre.objects.all()
        list_to_set=set([])

        while len(list_to_set)!=40:
            i=random.randrange(0,129)
            temp=queryset[i]
            list_to_set.add(temp)

        return list_to_set



class CreateUserView(CreateAPIView):
    serializer_class=CreateUserSerializer
    queryset=User.objects.all()
    permission_classes=(AllowAny,)
    



class LoginUserView(APIView):
    serializer_class = LoginUserSerializer
    permission_classes=(AllowAny,)

    def post(self,request):
        #deserialize.
        username=request.data.get('username')
        password=request.data.get('password')

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        response={
            'success':'true',
            'error':'null',
            'status_code':status.HTTP_200_OK,
            'message':'유저 로그인 및 jwt 토큰 발급 완료!',
            'token':serializer.data['token'],
            'data':serializer.errors
        }
        status_code=status.HTTP_200_OK
        return Response(response,status=status_code)
