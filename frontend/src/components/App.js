import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from "react-router-dom";
import PokemonList from './PokemonList/PokemonList.js';
import { Grid, Typography } from '@material-ui/core';
import PokemonPage from './PokemonPage/PokemonPage.js';
import Navigation from './Navbar/Navbar.js'

const App = () => {

    const renderPokedex = () => {
        return (
            <div>
                <Navigation />
                <div className="container mt-4">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <PokemonList /> 
                        </Grid>
                    </Grid>
                </div>
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