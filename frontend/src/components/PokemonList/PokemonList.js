import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon/Pokemon.js';
import { Grid, CircularProgress } from '@material-ui/core';
import { Pagination } from "@material-ui/lab"


const PokemonList = () => {
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true);
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');

    const fetchPokemons = (url) => {
        setLoading(true);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPokemons(data['results']);
            setNext(data['next']);
            setPrevious(data['previous']);
            setLoading(false);
        })
    }

    useEffect(() => {
        const url = 'http://127.0.0.1:8000/api/pokemon-list/';
        fetchPokemons(url);
    }, [])

    const nextClickHandler = () => {
        if (next !== null) {
            fetchPokemons(next);
        }
    }

    const previousClickHandler = () => {
        if (previous !== null) {
            fetchPokemons(previous);
        }
    }
 
    const pokemonArr = pokemons.map(pokemon => {
        return (
            <Pokemon types={pokemon.types} name={pokemon.name} sprite={pokemon.sprite} />
        )
    })

    return (
        <div>
            <Grid container spacing={3}>
                 {loading ? (<div className="spinner">
                    <CircularProgress />
                </div>) : pokemonArr}
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <nav>
                    <ul class="pagination">
                        <li class="page-item page-link" onClick={previousClickHandler}>Previous</li>
                        <li class="page-item page-link" onClick={nextClickHandler}>Next</li>
                    </ul>
                </nav>
                </Grid>
            </Grid>
        </div>
    )
}

export default PokemonList;