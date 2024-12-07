import React, { useState, useEffect } from "react";
import { Movie } from "../interfaces/Movie.interface";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { faSignOut, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { ButtonType } from "../enums/ButtonType.enum";
import { Link } from "react-router-dom";
import { MovieService } from "../services/Movie.service";
import { ToastService } from "../services/ToastService";
import Loader from "../components/Loader";

const MoviesGrid: React.FC = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    MovieService.getAll().then(
      (res) => {
        setMovies(res.data);
        setIsLoading(false);
      },
      (error) => {
        ToastService.error();
        setIsLoading(false);
      }
    );
  }, []);

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    padding: "32px",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "32px",
    padding: "24px",
    maxWidth: "calc((200px + 16px) * 4)",
    margin: "0 auto",
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "80vh",
  };

  const emptyStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "25vh",
  };

  const emptyMoviesComponent = (
    <div style={emptyStyle}>
      <h1>You don't have any Movies</h1>
      <Button
        text="Add a new Movie"
        width={"20vw"}
        type={ButtonType.PRIMARY}
        onClick={() => navigate("/movies/edit")}
      />
    </div>
  );

  const moviesGridComponent = (
    <>
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h1 style={{ margin: 0 }}>My Movies</h1>
          <Button
            text=""
            width={"1vw"}
            icon={faCirclePlus}
            type={ButtonType.SECONDARY}
            onClick={() => navigate("/movies/edit")}
          />
        </div>

        <Button
          text="Logout"
          width={"12vw"}
          icon={faSignOut}
          type={ButtonType.SECONDARY}
          onClick={() => navigate("/")}
        ></Button>
      </div>
      <div style={gridStyle}>
        {movies.map((movie) => (
          <Link
            key={movie._id}
            style={{ width: "250px" }}
            to={`/movies/edit`}
            state={{ movie }}
          >
            <MovieCard key={movie._id} movie={movie} />
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <div style={pageStyle}>
      {isLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        moviesGridComponent
      ) : (
        emptyMoviesComponent
      )}
    </div>
  );
};

export default MoviesGrid;
