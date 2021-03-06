import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import Navigation from "../Navbar/Navbar.js";

const PokemonPage = (props) => {
  const { name } = useParams();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sprite, setSprite] = useState("");
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHeight(data["height"]);
        setWeight(data["weight"]);
        setSprite(data["sprite"]);
        setTypes(data["types"]);
        setStats(data["stats"]);
        setLoading(false);
      });
  };

  useEffect(() => {
    let url = `http://127.0.0.1:8000/api/get-pokemon/${name}/`;

    if (process.env.NODE_ENV === "production") {
      url = `https://pokelix.herokuapp.com/api/get-pokemon/${name}/`;
    }

    fetchPokemon(url);
  }, []);

  const progressBars = stats.map((stat) => {
    const statPercent = stat.base_stat / 2 + "%";
    return (
      <div className="stat-container">
        <div className="progress-container">
          <h5>{stat.stat.name}</h5>
          <div class="progress">
            <div
              style={{ width: statPercent }}
              class="progress-bar"
              role="progressbar"
              aria-valuenow={stat.base_stat}
              aria-valuemin="0"
              aria-valuemax="200"
            >
              {stat.base_stat}
            </div>
          </div>
        </div>
      </div>
    );
  });

  const typeArr = types.map((type) => {
    return <span className="type-span">{type.type.name}</span>;
  });

  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="mt-2">
          <h1 style={{ textAlign: "center" }}>{name}</h1>
        </div>
        {loading ? (
          <div className="spinner">
            <CircularProgress />
          </div>
        ) : (
          <div>
            <div class="pokemon-grid">
              <div className="poke-img-container">
                <img className="poke-img" src={sprite}></img>
              </div>
              <div className="pokemon-data-grid">
                <h5>Height: {height}</h5>
                <h5>Weight: {weight}</h5>
                <h5>Types</h5>
                <div className="types">{typeArr}</div>
              </div>
            </div>
            <div className="data-grid">
              <h3>Base Stats</h3>
              {progressBars}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonPage;
