from django.urls import path

from .views import CreateUserView,LoginUserView,ListContentView # csv다운 시 주석하기
#from apps.user.views import csvToModel -> csv다운할 때 주석해제
app_name='apps.user'

urlpatterns=[
    path('register',CreateUserView.as_view()), #csv주석
    #path('register-contents/',CreateContentView.as_view()) #csv주석
    path('login',LoginUserView.as_view()), #csv 주석
    path('contents-list',ListContentView.as_view()) #csv 주석
    #path('',csvToModel) -> 주석해제하고 나머지 path들 주석처리 , views에서 CBV들 주석처리
]


