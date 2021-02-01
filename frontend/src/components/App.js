import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from "react-router-dom";
import PokemonList from './PokemonList/PokemonList.js';
import { Grid, Typography } from '@material-ui/core';
import PokemonPage from './PokemonPage/PokemonPage.js';

const App = () => {

    const renderPokedex = () => {
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

    return (
        <Router>
            <Switch>
                <Route exact path='/' render={() => {
                    return renderPokedex();
                }} />
                <Route path='/pokemon/:name' component={PokemonPage} />
            </Switch>
        </Router>
    )
}

export default App;