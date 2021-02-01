import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonPage = (props) => {
    const { name } = useParams();
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sprite, setSprite] = useState('');
    const [types, setTypes] = useState([]);
    const [stats, setStats] = useState([]);

    const fetchPokemon = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setHeight(data['height']);
            setWeight(data['weight']);
            setSprite(data['sprite']);
            setTypes(data['types']);
            setStats(data['stats']);
        })
    }

    useEffect(() => {
        const url = `http://127.0.0.1:8000/api/get-pokemon/${name}/`;
        fetchPokemon(url);
    }, [])

    return (
        <div className='container'>
            <h1>{name}</h1>
            <h3>{height}</h3>
            <h3>{weight}</h3>
            <img src={sprite}></img>
        </div>
    )
}

export default PokemonPage;