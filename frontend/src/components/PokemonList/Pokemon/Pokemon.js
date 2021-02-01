import { Typography } from '@material-ui/core';
import React from 'react';
import { Grid, Paper, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Pokemon = (props) => {

    const classes = useStyles();
    const chips = props.types.map(type => {
        return <Chip label={type.type.name} />
    })

    return (
            <Grid item xs={3}>
                <Paper elevation={3} className={classes.paper}>
                    <img src={props.sprite}></img>
                    <Typography variant='h5'>{props.name}</Typography>
                    <div className="flex">
                        {chips}
                    </div>
                </Paper>
            </Grid>
    )
}

export default Pokemon;