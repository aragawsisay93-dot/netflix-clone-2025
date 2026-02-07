
// src/components/Rows/Row/Row.js
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/Axios";
import MovieTrailer from "../../MovieTrailer/MovieTrailer";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useNetflix } from "../../../context/NetflixContext";
import "./Row.css";

function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  const { likes, toggleLike, myList, toggleMyList } = useNetflix();


  // Fetch movies from TMDB
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  // Handle click on a movie poster
  const handleClick = async (movie) => {
    try {
      const response = await axiosInstance.get(
        `/movie/${movie.id}/videos?language=en-US`
      );
      const results = response.data.results;

      // Try to find a trailer or teaser
      const youtubeTrailer = results.find(
        (video) =>
          (video.type === "Trailer" || video.type === "Teaser") &&
          video.site === "YouTube"
      );

      if (youtubeTrailer?.key) {
        setTrailerId(youtubeTrailer.key);
      } else {
        console.warn("Trailer not found, using fallback video.");
        setTrailerId("dQw4w9WgXcQ"); // fallback YouTube video
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerId("dQw4w9WgXcQ"); // fallback
    }
  };

  const handleClose = () => setTrailerId(null);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLarge ? "row__posterLarge" : ""}`}
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.name || movie.title}
            onClick={() => handleClick(movie)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>

      {trailerId && <MovieTrailer videoId={trailerId} onClose={handleClose} />}
    </div>
  );
}

export default Row;
