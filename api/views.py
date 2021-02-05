from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import get_pokemon_page, get_pokemon
from rest_framework import status

# Create your views here.


@api_view(['GET'])
def pokemon_list(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    name = request.GET.get('name')

    if offset == None or limit == None:
        offset = 0
        limit = 12

    data = get_pokemon_page(int(offset), int(limit))
    return Response(data)


@api_view(['GET'])
def get_single_pokemon(request, name):
    pokemon_name = name

    if pokemon_name == None or pokemon_name == '-' or pokemon_name == '':
        print(1)
        return Response({'No Data': 'There was not a name in the request'}, status=status.HTTP_400_BAD_REQUEST)

    data = get_pokemon(pokemon_name)

    if data == False:
        return Response({'Not found': 'The pokemon was not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response(data, status=status.HTTP_200_OK)
