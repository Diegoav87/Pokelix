from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import get_pokemon_page, get_pokemon

# Create your views here.


@api_view(['GET'])
def pokemon_list(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    print(limit, offset)

    if offset == None or limit == None:
        offset = 0
        limit = 12

    data = get_pokemon_page(int(offset), int(limit))
    return Response(data)


@api_view(['GET'])
def get_single_pokemon(request, name):
    pokemon_name = name

    if pokemon_name == None:
        pokemon_name = 'pikachu'

    data = get_pokemon(pokemon_name)
    return Response(data)
