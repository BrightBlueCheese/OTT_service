from django.urls import path

# from .views import ThirdAnalysisView,FifthAnalysisView # SixthAnalysisView, SeventhAnalysisView # csv다운 시 주석하기
# from apps.contents_analysis.views import csvToModel # -> csv다운할 때 주석해제
from .views import FirstAnalysisView,ThirdAnalysisView,FifthAnalysisView


urlpatterns=[
    path('1',FirstAnalysisView.as_view()),
    path('3',ThirdAnalysisView.as_view()),
    path('5',FifthAnalysisView.as_view()),
    #path('',csvToModel)
    #path('first-analysis',FirstAnalysisView.as_view()),
    #path('third-analysis',ThirdAnalysisView.as_view()),
    #path('fifth-analysis',FifthAnalysisView.as_view()),
    #path('sixth-analysis',SixthAnalysisView.as_view()),
    #path('seventh-analysis',SeventhAnalysisView.as_view())
    # path('',csvToModel) # -> 주석해제하고 나머지 path들 주석처리 , views에서 CBV들 주석처리
]