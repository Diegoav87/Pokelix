from django.urls import path
from . import views

urlpatterns = [
    path('pokemon-list/', views.pokemon_list),
    path('get-pokemon/<str:name>/', views.get_single_pokemon),
]
