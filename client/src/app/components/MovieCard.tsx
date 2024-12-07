import React from "react";
import { Movie } from "../interfaces/Movie.interface";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: "var(--card-color)",
    borderRadius: "16px",
    padding: "16px",
    width: "250px",
    color: "#ffffff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const imageContainerStyle: React.CSSProperties = {
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "16px",
    maxHeight: "45vh",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "45vh",
    objectFit: "fill",
  };

  const textStyle: React.CSSProperties = {
    height: "45vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  };

  const titleStyle: React.CSSProperties = {
    margin: "8px 0",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const yearStyle: React.CSSProperties = {
    marginTop: "3vh",
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.7)",
  };

  return (
    <div className="pressable" style={containerStyle}>
      <div style={imageContainerStyle}>
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} style={imageStyle} />
        ) : (
          <p style={textStyle}>No Image Uploaded</p>
        )}
      </div>
      <h3 style={titleStyle}>{movie.title}</h3>
      <p style={yearStyle}>{movie.publishedYear}</p>
    </div>
  );
};

export default MovieCard;
