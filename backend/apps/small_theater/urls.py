from django.urls import path

from .views import SmallTheaterList,SmallTheaterDetail

app_name='apps.small_theater'

urlpatterns=[
    path('', SmallTheaterList.as_view()),
    path('/<int:id>',SmallTheaterDetail.as_view()) # http://127.0.0.1:8000/small-theater/4 앞에 슬래시 없애면 small-theater4로 들어감
]
