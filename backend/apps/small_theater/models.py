from django.db import models

# Create your models here.
class SmallTheater(models.Model):
    # no = models.AutoField(primary_key=True)
    published_date = models.DateField()
    title = models.CharField(max_length=200, default='')
    theater_owner = models.CharField(max_length=10, null=True) # 우리는 소극장생성은 안하고 가상의 유저들이 있다치고 보여줄 거니까 아마 user랑 연결될 필요 없다고 생각! 단순 Char로 가상의 유저1,유저2,유저3들의 닉네임만 넣어주자
    theater_genre1 = models.CharField(max_length=30, null=True) # 'action' / default=''할까
    theater_genre2 = models.CharField(max_length=30, null=True) # 'romance'
    # 이것도 우리끼리 정의한 호러=1, 로맨스=2, 액션=3 이렇게? 총 1,2,3,4,5,6,7,8 몇 까지 있는 걸까?
    # -> 어차피 소극장 목록에서 액션/로맨스 로만 보여줄거니까 일단 검색 편하게 Char로 
    introduce = models.CharField(max_length=1000, null=True)
    notice = models.CharField(max_length=1000, null=True)

    class Meta:
        # managed = False # 자동 migration
        db_table = 'small_theater'
