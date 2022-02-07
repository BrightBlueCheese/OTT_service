from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# Create your views here.
#from .models import User,Prefer_ott_content_genre
import csv # csv 읽기 
from datetime import date # birthday
import datetime # '1999-04-27' https://freedata.tistory.com/59 https://stackoverflow.com/questions/51725557/how-to-get-year-from-datefield-at-django
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import ReviewScore, ReviewScoreT
from apps.user.models import User,PreferOttContentGenre
from django.db.models import Q # objects.filter할 때 여러 객체일 경우
from rest_framework.permissions import IsAuthenticated, AllowAny #토큰 있는지 확인 
from .serializer import ThirdReviewScoreSerializer ,FifthReviewScoreSerializer
from config.settings import JWT_AUTH
import jwt

SECRET_KEY=JWT_AUTH['JWT_SECRET_KEY']
ALGORITHM=JWT_AUTH['JWT_ALGORITHM']

# # 3,5,6,7번 csv DB에 넣기
# 삭제하지 마세용!! 최초 1회 실행하기
# def csvToModel(request):
#     with open('apps/contents_analysis/Ver3_naver_review_analysis_altimate.csv','r') as f:
#         # rows = csv.reader(f, delimiter = ',')
#         data=f.readline()
#         rows=csv.reader(f,delimiter = ',')
#         for row in rows:
#             ReviewScore.objects.create(
#                 review_genre = row[0], 
#                 average_male = row[1], 
#                 average_female = row[2], 
#                 average_10s = row[3], 
#                 average_20s = row[4], 
#                 average_30s = row[5], 
#                 average_40s = row[6], 
#                 average_50_up = row[7]
#                 )
#     return HttpResponse('csv 다운받기 성공')

# 삭제하지 마세용!! 최초 1회 실행하기
# def csvToModel(request):
#     with open('apps/contents_analysis/T_Ver3_naver_review_analysis_altimate.csv','r') as f:
#         # rows = csv.reader(f, delimiter = ',')
#         data=f.readline()
#         rows=csv.reader(f,delimiter = ',')
#         for row in rows:
#             ReviewScoreT.objects.create(
#                 people= row[0],
#                 drama= row[1],
#                 comedy= row[2],
#                 action= row[3],
#                 thriller= row[4],
#                 romance= row[5],
#                 crime= row[6],
#                 adventure= row[7],
#                 animation= row[8],
#                 fantasy= row[9],
#                 family= row[10],
#                 sci_fi= row[11],
#                 mystery= row[12],
#                 horror= row[13],
#                 documentary= row[14],
#                 biography= row[15],
#                 history= row[16],
#                 music= row[17],
#                 short= row[18],
#                 sport= row[19],
#                 war= row[20],
#                 musical= row[21],
#                 western= row[22]
#                 )
#     return HttpResponse('csv 다운받기 성공')
def find_age(birthday):
    today = date.today()
    search_age=birthday
    if search_age:
        # search_age = datetime.datetime(search_age,'%Y-%m-%d')
        search_age = today.year - search_age.year # 23
        if search_age<20:
            search_age='average_10s'
        elif 21<=search_age<30:
            search_age='average_20s'
        elif 31<=search_age<40:
            search_age='average_30s'
        elif 41<=search_age<50:
            search_age='average_40s'
        else:
            search_age='average_50_up'
    return search_age

def find_watch_time(watch_time):
    if watch_time==0:
        return '이용하지 않음.'
    elif watch_time==1:
        return '6시 ~ 9시'
    elif watch_time==2:
        return '9시 ~ 12시'
    elif watch_time==3:
        return '12시 ~ 15시'
    elif watch_time==4:
        return '15시 ~ 18시'
    elif watch_time==5:
        return '18시 ~ 21시'
    elif watch_time==6:
        return '21시 ~ 0시'
    elif watch_time==7:
        return '0시 ~ 6시'

def find_genre(user_prefer_genres):
    genre_dict={
        'drama':0,
        'comedy':0,
        'action':0,
        'thriller':0,
        'romance':0,
        'crime':0,
        'adventure':0,
        'animation':0,
        'fantasy':0,
        'family':0,
        'sci_fi':0,
        'mystery':0,
        'horror':0,
        'documentary':0,
        'biography':0,
        'history':0,
        'music':0,
        'short':0,
        'sport':0,
        'war':0,
        'musical':0,
        'reality_tv':0,
        'western':0,
        'game_show':0,
        'talk_show':0,
    }
    for obj in user_prefer_genres:
        if obj.drama==1:
            genre_dict['drama']+=1
        if obj.comedy==1:
            genre_dict['comedy']+=1
        if obj.action==1:
            genre_dict['action']+=1
        if obj.thriller==1:
            genre_dict['thriller']+=1
        if obj.romance==1:
            genre_dict['romance']+=1
        if obj.crime==1:
            genre_dict['crime']+=1
        if obj.adventure==1:
            genre_dict['adventure']+=1
        if obj.animation==1:
            genre_dict['animation']+=1
        if obj.fantasy==1:
            genre_dict['fantasy']+=1
        if obj.family==1:
            genre_dict['family']+=1
        if obj.sci_fi==1:
            genre_dict['sci_fi']+=1
        if obj.mystery==1:
            genre_dict['mystery']+=1
        if obj.horror==1:
            genre_dict['horror']+=1
        if obj.documentary==1:
            genre_dict['documentary']+=1
        if obj.biography==1:
            genre_dict['biography']+=1
        if obj.history==1:
            genre_dict['history']+=1
        if obj.music==1:
            genre_dict['music']+=1
        if obj.short==1:
            genre_dict['short']+=1
        if obj.sport==1:
            genre_dict['sport']+=1
        if obj.war==1:
            genre_dict['war']+=1
        if obj.musical==1:
            genre_dict['musical']+=1
        if obj.reality_tv==1:
            genre_dict['reality_tv']+=1
        if obj.western==1:
            genre_dict['western']+=1
        if obj.game_show==1:
            genre_dict['game_show']+=1
        if obj.talk_show==1:
            genre_dict['talk_show']+=1
    sorted_dict=sorted(genre_dict.items(),key=lambda item: item[1], reverse=True)
    return [sorted_dict[0][0],sorted_dict[1][0],sorted_dict[2][0]]


#1번 -> 프론트분이 png 띄울 것 로그인된 유저가 맞는지만 확인해줬다.
class FirstAnalysisView(APIView):#figma의 유저설명.
    serializer_class=FifthReviewScoreSerializer
    permission_classes=(AllowAny,)

    def post(self,request):
        # token=request.data.get('token')
        # token_str=token.decode('utf-8')
        # payload=jwt.decode(token_str,SECRET_KEY,ALGORITHM)
        #payload에 담겨있는 정보: user_id,username
        user=User.objects.get(id=request.user.id)
        user_username=user.username
        user_age=find_age(user.birthday)
        user_watch_time=find_watch_time(user.watch_time)
        user_prefer_genres=user.prefer_ott_content_genres.all()#PreferOttContentGenre의 id(preferottcontentgenre_id)가 들어있음.
        
        #고른 8개의 포스터 중 장르가 가장 많이 겹치는 장르 3개를 영어 형태로 가져옴.
        user_genres=find_genre(user_prefer_genres)

        response={
            'success':'true',
            'message':'맨 위 텍스트를 위한 데이터',
            'data':{
                'username':user_username,
                'age':user_age,
                'watch_time':user_watch_time,
                'user_genres':user_genres,
            }
        }
        return Response(response,status=status.HTTP_200_OK)

    
#         target_analysis_serializer = ReviewScoreSerializer(final_queryset, many=True)
#         return Response(target_analysis_serializer.data, status=status.HTTP_200_OK)
# # 2번 -> 프론트분이 png 띄울 것 로그인된 유저가 맞는지만 확인해줬다.
# class SecondAnalysisView(APIView):
#     permission_classes=(AllowAny,)
#     # permission_classes=(IsAuthenticated, )
#     def get(self,request):
#         # current_user=request.get['username']  # 현재토큰있는애 - 현재 로그인 된 유저는 current_user다. 변수도 같은 변수 상속?받아서 쓸 수 있기 떄문
#         # user=User.objects.get(username=current_user) # 등록된애 - 지금 로그인 된 유저1의 객체를 가져와라~
#         return JsonResponse('return success 2nd analysis',status=200)

# 3번 ReviewScoreT
class ThirdAnalysisView(APIView): # http://127.0.0.1:8000/api/contents-analysis/third-analysis?search-gender=average_female&search-age=1999-04-27
    permission_classes=(AllowAny,)
    # permission_classes=(IsAuthenticated, )
    def post(self,request):
        # 토큰 current_user=request.GET.get('username')  # 현재토큰있는애
        # 토큰 user=User.objects.get(username=current_user) # 등록된애
        # search_gender_ver1= request.get('gender') #'1' 토큰 아직 안될 때
        # search_gender_ver2 = user.gender 토큰 성공 후
        # token=request.data.get('token')
        # token_str=token.decode('utf-8')
        # payload=jwt.decode(token_str,SECRET_KEY,ALGORITHM)
        user=User.objects.get(id=request.user.id)

        if user.gender=='male':
            search_gender='average_male'
        elif user.gender=='female':
            search_gender='average_female'

        #search_age = request.GET.get('search-age') #'1999-04-27'
        search_age=find_age(user.birthday)

        # search_age_ver2 = request['birthday'] # 이건 훈님이 보내주시는 request로 할 때
        
        # birthday 로직 #############################################################
        # today = date.today()
        # if search_age:
        #     # search_age = datetime.datetime(search_age,'%Y-%m-%d')
        #     search_age = today.year - search_age.year # 23
        #     if search_age<20:
        #         search_age='average_10s'
        #     elif 21<=search_age<30:
        #         search_age='average_20s'
        #     elif 31<=search_age<40:
        #         search_age='average_30s'
        #     elif 21<=search_age<30:
        #         search_age='average_40s'
        #     else:
        #         search_age='average_50_up'
        #############################################################################
        if (search_gender==None) & (search_age==None):
            queryset = ReviewScoreT.objects.all()
        else:
            queryset = ReviewScoreT.objects.filter(Q(people=search_gender)|Q(people=search_age))
        target_analysis_serializer = ThirdReviewScoreSerializer(queryset, many=True)
        response = []
        for i in target_analysis_serializer.data:
            response.append({
                'id':i['id'],
                "people":i['people'],
                "data": [
                    {
                        'genre':'드라마',
                        'rating':i['drama']
                    },
                    {
                        'genre':'코미디',
                        'rating':i['comedy']
                    },
                    {
                        'genre':'액션',
                        'rating':i['action']
                    },
                    {
                        'genre':'스릴러',
                        'rating':i['thriller']
                    },
                    {
                        'genre':'로맨스',
                        'rating':i['romance']
                    },
                    {
                        'genre':'범죄',
                        'rating':i['crime']
                    },
                    {
                        'genre':'모험',
                        'rating':i['adventure']
                    },
                    {
                        'genre':'애니메이션',
                        'rating':i['animation']
                    },
                    {
                        'genre':'판타지',
                        'rating':i['fantasy']
                    },
                    {
                        'genre':'가족',
                        'rating':i['family']
                    },
                    {
                        'genre':'SF',
                        'rating':i['sci_fi']
                    },
                    {
                        'genre':'미스터리',
                        'rating':i['mystery']
                    },
                    {
                        'genre':'공포',
                        'rating':i['horror']
                    },
                    {
                        'genre':'다큐멘터리',
                        'rating':i['documentary']
                    },
                    {
                        'genre':'전기',
                        'rating':i['biography']
                    },
                    {
                        'genre':'역사',
                        'rating':i['history']
                    },
                    {
                        'genre':'음악',
                        'rating':i['music']
                    },
                    {
                        'genre':'단편',
                        'rating':i['short']
                    },
                    {
                        'genre':'스포츠',
                        'rating':i['sport']
                    },
                    {
                        'genre':'전쟁',
                        'rating':i['war']
                    },
                    {
                        'genre':'뮤지컬',
                        'rating':i['musical']
                    },
                    {
                        'genre':'서부',
                        'rating':i['western']
                    }
                ]
            })
        # return Response(target_analysis_serializer.data, status=status.HTTP_200_OK)
        return Response(response, status=status.HTTP_200_OK)

# # 4번 -> 프론트분이 png 띄울 것 로그인된 유저가 맞는지만 확인해줬다.
# class FourthAnalysisView(APIView):
#     permission_classes=(AllowAny,)
#     # permission_classes=(IsAuthenticated, )
#     def get(self,request):
#         # current_user=request.get['username']  # 주석해제 - 현재 로그인 된 유저는 current_user다. 변수도 같은 변수 상속?받아서 쓸 수 있기 떄문
#         # user=User.objects.get(username=current_user) # 주석해제 - 지금 로그인 된 유저1의 객체를 가져와라~
#         return JsonResponse('return success 4th analysis',status=200)


# 5번 ReviewScore
class FifthAnalysisView(APIView):
    permission_classes=(AllowAny,)
    # permission_classes=(IsAuthenticated, ) #로그인 한 사람만 하게끔(small-theater는 AlloAny였다.)
    def post(self,request):
        # current_user=request.GET.get('username')  # 현재토큰있는애
        # user=User.objects.get(username=current_user) # 등록된애
        # token=request.data.get('token')
        # token_str=token.decode('utf-8')
        # payload=jwt.decode(token_str,SECRET_KEY,ALGORITHM)
        user=User.objects.get(id=request.user.id)
        user_prefer_genres=user.prefer_ott_content_genres.all()
        user_genres=find_genre(user_prefer_genres)

        #search_genre1 = request.GET.get('search-genre1')
        #search_genre2 = request.GET.get('search-genre2')
        #search_genre3 = request.GET.get('search-genre3')
        search_genre1=user_genres[0]
        search_genre2=user_genres[1]
        search_genre3=user_genres[2]
        #

        if (search_genre1==None) & (search_genre2==None) & (search_genre3==None):
            queryset = ReviewScore.objects.all()
        else:
            queryset = ReviewScore.objects.filter(Q(review_genre=search_genre1)|Q(review_genre=search_genre2)|Q(review_genre=search_genre3))
        target_analysis_serializer = FifthReviewScoreSerializer(queryset, many=True)
        response = []
        for i in target_analysis_serializer.data:
            response.append({
                'id':i['id'],
                "review_genre":i['review_genre'],
                "data": [
                    {
                        'genre':'남',
                        'rating':i['average_male']
                    },
                    {
                        'genre':'여',
                        'rating':i['average_female']
                    },
                    {
                        'genre':'10s',
                        'rating':i['average_10s']
                    },
                    {
                        'genre':'20s',
                        'rating':i['average_20s']
                    },
                    {
                        'genre':'30s',
                        'rating':i['average_30s']
                    },
                    {
                        'genre':'40s',
                        'rating':i['average_40s']
                    },
                    {
                        'genre':'50이상',
                        'rating':i['average_50_up']
                    },
                ]
            })
        return Response(response, status=status.HTTP_200_OK)


        # response =[]
        # for i in target_analysis_serializer.data:
        #     response.append({
        #         'id':i['id'],
        #         'review_genre':i['review_genre'],
        #         'data':{
        #             # "average_male":i.average_male,
        #             # "average_female":i.average_female,
        #             "average_10s":i['average_10s'],
        #             "average_20s":i['average_20s'],
        #             "average_30s":i['average_30s'],
        #             "average_40s":i['average_40s'],
        #             "average_50_up":i['average_50_up']
        #         }
        #     }) 
        # response = [i for i in target_analysis_serializer.data]
        response = []
        for i in target_analysis_serializer.data:
            response.append({
                'id':i['id'],
                "review_genre":i['review_genre'],
                "data": [
                    {
                        'genre':'남',
                        'rating':i['average_male']
                    },
                    {
                        'genre':'여',
                        'rating':i['average_female']
                    },
                    {
                        'genre':'10s',
                        'rating':i['average_10s']
                    },
                    {
                        'genre':'20s',
                        'rating':i['average_20s']
                    },
                    {
                        'genre':'30s',
                        'rating':i['average_30s']
                    },
                    {
                        'genre':'40s',
                        'rating':i['average_40s']
                    },
                    {
                        'genre':'50이상',
                        'rating':i['average_50_up']
                    },
                ]
            })
        # return Response(target_analysis_serializer.data, status=status.HTTP_200_OK)
        return Response(response, status=status.HTTP_200_OK)

#아까 response 보여주세요 장르에 왜 나이가 들어가는건가요? 이게 그냥 rating에 해당하는 값을 넣어주는거면 모르겠는데
#위에처럼 FE에 맞게끔 데이터 형식을 완전히 맞춰서 주는건 serializer에서 불가능해요 애초에 genre자체가
#몰라요 해봐야죠
#BE에서 가지고 있지 않아요.
# 6번 ReviewScore -> 5번으로 해결

# 7번 ReviewScore -> 5번으로 해결


