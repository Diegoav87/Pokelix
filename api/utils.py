import requests


def get_pokemon(id):
    url = f'https://pokeapi.co/api/v2/pokemon/{id}/'
    response = requests.get(url)
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
    pokemons = []

    for i in range(offset, limit + 1):
        pokemon = get_pokemon(i)
        pokemons.append(pokemon)

    return pokemons
