from django.urls import path
from . import views

urlpatterns = [
    path('pokemon-list/', views.pokemon_list),
]
