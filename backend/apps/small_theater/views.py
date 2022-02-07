from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# Create your views here.
#from .models import User,Prefer_ott_content_genre

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializer import SmallTheaterSerializer
from .models import SmallTheater
from urllib import parse
from django.db.models import Q
from rest_framework.permissions import AllowAny

# 여기 삭제하지 말아주세용..
# class SmallTheaterList(APIView): # 소극장 목록 보기
#     # http://127.0.0.1:8000/small-theater?search-genre1=드라마&search-genre2=공포&title=마블
#     permission_classes=(AllowAny,)
#     def get(self,request,**kwargs):
#         search_genre1 = request.GET.get('search-genre1')
#         search_genre2 = request.GET.get('search-genre2')
#         search_title =request.GET.get('title')
#         for key in request.GET.keys():
#             if request.GET.get(key)!=None:
#                 parse.unquote(request.GET.get(key)) #None이 아니면 한글로 바꿔라
#         # 1. genre1,genre2,title 셋 다 None인 경우
#         if (search_genre1==None) & (search_genre2==None) & (search_title==None):
#             final_queryset = SmallTheater.objects.all().order_by('-published_date') # /small-theater
#         # 2. title이 있는 경우(__contains오류 떄문에 얘만 따로)
#         elif search_title: 
#             queryset = SmallTheater.objects.filter(Q(theater_genre1=search_genre1) | Q(theater_genre2=search_genre1) | Q(theater_genre1=search_genre2) | Q(theater_genre2=search_genre2) | Q(title__contains=search_title)) #단어포함 title__contains = 어쩌구
#             final_queryset = queryset.order_by('-published_date') #published_date하면 오름차순
#         # 3. genre1,genre2,title 중 하나라도 있는 경우
#         else:
#             queryset = SmallTheater.objects.filter(Q(theater_genre1=search_genre1) | Q(theater_genre2=search_genre1) | Q(theater_genre1=search_genre2) | Q(theater_genre2=search_genre2) | Q(title=search_title)) 
#             final_queryset = queryset.order_by('-published_date')
#         target_theater_serializer = SmallTheaterSerializer(final_queryset, many=True)
#         return Response(target_theater_serializer.data, status=status.HTTP_200_OK)

class SmallTheaterList(APIView): # 소극장 목록 보기
    # http://127.0.0.1:8000/api/small-theater?search-keyword=드라마
    permission_classes=(AllowAny,)
    def get(self,request,**kwargs):
        search_keyword = request.GET.get('search-keyword')
        for key in request.GET.keys():
            if request.GET.get(key)!=None:
                parse.unquote(request.GET.get(key)) #None이 아니면 한글로 바꿔라
        # 1. genre1,genre2,title 셋 다 None인 경우
        if (search_keyword==None):
            final_queryset = SmallTheater.objects.all().order_by('-published_date') # /small-theater
        # 2. title이 있는 경우(__contains오류 떄문에 얘만 따로)
        elif search_keyword: 
            queryset = SmallTheater.objects.filter(Q(theater_genre1=search_keyword) | Q(theater_genre2=search_keyword) | Q(title__contains=search_keyword)) #단어포함 title__contains = 어쩌구
            final_queryset = queryset.order_by('-published_date') #published_date하면 오름차순
        # 3. genre1,genre2,title 중 하나라도 있는 경우
        # else:
        #     queryset = SmallTheater.objects.filter(Q(theater_genre1=search_genre1) | Q(theater_genre2=search_genre1) | Q(theater_genre1=search_genre2) | Q(theater_genre2=search_genre2) | Q(title=search_title)) 
        #     final_queryset = queryset.order_by('-published_date')
        target_theater_serializer = SmallTheaterSerializer(final_queryset, many=True)
        return Response(target_theater_serializer.data, status=status.HTTP_200_OK)

class SmallTheaterDetail(APIView): # 소극장 상세보기
    # http://127.0.0.1:8000/small-theater/3
    permission_classes=(AllowAny,)
    def get(self,request,**kwargs): #http://localhost:8000/small-theater/{small_theater.id}
        target_theater_id = kwargs.get('id') # 4 (int)
        queryset = SmallTheater.objects.filter(id=target_theater_id) # get은 하나만 가져옴 not iterable이슈 있음
        target_theater_serializer = SmallTheaterSerializer(queryset, many=True)
        return Response(target_theater_serializer.data, status=status.HTTP_200_OK)

