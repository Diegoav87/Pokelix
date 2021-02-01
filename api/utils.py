import requests


def get_pokemon(name):
    response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{name}/')
    data = response.json()
    pokemon_data = {
        "name": '',
        "height": '',
        "weight": '',
        "types": '',
        "stats": '',
        'sprite': ''

    }

    pokemon_data['name'] = data['name']
    pokemon_data['height'] = data['height']
    pokemon_data['weight'] = data['weight']
    pokemon_data['types'] = data['types']
    pokemon_data['stats'] = data['stats']
    pokemon_data['sprite'] = data['sprites']['front_default']

    return pokemon_data


def get_pokemon_page(offset, limit):
    url = f'https://pokeapi.co/api/v2/pokemon/?offset={offset}&limit={limit}'
    response = requests.get(url)
    data = response.json()
    pokemons = []

    for pokemon in data['results']:
        pokemon_data = get_pokemon(pokemon['name'])
        pokemons.append(pokemon_data)

    next_offset = offset + limit
    previous_offset = offset - limit

    pokemon_results = {
        'results': pokemons
    }

    if next_offset <= 1118:
        pokemon_results[
            'next'] = f'http://127.0.0.1:8000/api/pokemon-list/?offset={offset + limit}&limit={limit}'
    else:
        pokemon_results['next'] = None

    if previous_offset >= 0:
        pokemon_results[
            'previous'] = f'http://127.0.0.1:8000/api/pokemon-list/?offset={offset - limit}&limit={limit}'
    else:
        pokemon_results['previous'] = None

    return pokemon_results
