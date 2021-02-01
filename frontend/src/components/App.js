import React from 'react';
import PokemonList from './PokemonList/PokemonList.js';
import { Grid, Typography } from '@material-ui/core';

const App = () => {

    return (
        <div className="container">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h1">Pokemon</Typography>
                </Grid>
                <Grid item xs={12}>
                    <PokemonList /> 
                </Grid>
            </Grid>
        </div>
    )
}

export default App;