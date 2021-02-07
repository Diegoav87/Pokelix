import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Pokemon from './Pokemon/Pokemon.js';
import { Grid, CircularProgress } from '@material-ui/core';
import { Pagination } from "@material-ui/lab"
import Alert from '@material-ui/lab/Alert';


const PokemonList = () => {
    const history = useHistory();

    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true);
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [searchPokemon, setSearchPokemon] = useState('-');
    const [searchError, setSearchError] = useState(false);

    const fetchPokemons = (url) => {
        console.log(url)
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
        let url = 'http://127.0.0.1:8000/api/pokemon-list/';

        if (process.env.NODE_ENV === 'production') {
            url = 'https://pokelix.herokuapp.com/api/pokemon-list/';
        }

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

    const handleSearchChange = (e) => {
        setSearchPokemon(e.target.value.toLowerCase())
    }

    const handleSearchPress = () => {
        const url = `http://127.0.0.1:8000/api/get-pokemon/${searchPokemon}/`;
        fetch(url)
        .then(response => {
            if (response.ok) {
                setSearchError(false);
                history.push(`/pokemon/${searchPokemon}`);
            } else {
                setSearchError(true);
                return
            }
        })
    }
 
    const pokemonArr = pokemons.map(pokemon => {
        return (
            <Pokemon types={pokemon.types} name={pokemon.name} sprite={pokemon.sprite} />
        )
    })

    return (
        <div>
            {loading ? (<div className="spinner">
                    <CircularProgress />
                </div>) : (
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {searchError ? (<Alert severity="error">No pokemon found</Alert>) : null}
                                <div className="d-flex mt-2">    
                                    <input className="form-control"  placeholder="Search pokemon..." list="pokemon-list" onChange={handleSearchChange}></input>
                                    <button class="btn btn-primary ml-2" onClick={handleSearchPress}>Search</button>
                                </div>
                            </Grid>
                        </Grid>
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
        )}
        </div>
    )
}

export default PokemonList;