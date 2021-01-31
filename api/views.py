from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import get_pokemon_page

# Create your views here.


@api_view(['GET'])
def pokemon_list(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    data = get_pokemon_page(int(offset), int(limit))
    return Response(data)
