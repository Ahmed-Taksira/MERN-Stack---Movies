import React, { useRef, useState } from "react";
import { ButtonType } from "../enums/ButtonType.enum";
import ImageBox from "../components/ImageBox";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Validator } from "../utils/Validator";
import { useNavigate, useLocation } from "react-router-dom";
import { Movie } from "../interfaces/Movie.interface";
import { MovieService } from "../services/Movie.service";
import { ToastService } from "../services/ToastService";
import Loader from "../components/Loader";
import useMovieStore from "../stores/MovieStore";

const EditMovie: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const addMovie = useMovieStore((state) => state.addMovie);
  const editMovie = useMovieStore((state) => state.editMovie);

  let isEdit = location.state?.movie ? true : false;

  let initialMovie: Movie = isEdit
    ? location.state.movie
    : { title: "", publishedYear: "", poster: "" };

  const [title, setTitle] = useState<string>(initialMovie.title);
  const [publishedYear, setPublishedYear] = useState<string>(
    initialMovie.publishedYear.toString()
  );
  const [poster, setPoster] = useState<string>(initialMovie.poster ?? "");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const titleRef = useRef<{ validate: () => boolean }>(null);
  const yearRef = useRef<{ validate: () => boolean }>(null);

  const submit = () => {
    const isTitleValid = titleRef.current?.validate() ?? true;
    const isYearValid = yearRef.current?.validate() ?? true;

    if (isTitleValid && isYearValid) {
      setIsLoading(true);
      const newMovie: Movie = {
        title,
        publishedYear: Number(publishedYear),
        poster,
      };

      if (isEdit) updateMovie(newMovie);
      else createMovie(newMovie);
    }
  };

  const createMovie = (movie: Movie) => {
    MovieService.create(movie).then(
      (res) => {
        ToastService.success("Movie Created Successfully!");

        addMovie(res.data.movie);
        setIsLoading(false);
        navigate("/movies");
      },
      (error) => {
        ToastService.error();
        setIsLoading(false);
      }
    );
  };

  const updateMovie = (movie: Movie) => {
    MovieService.update(initialMovie._id as string, movie).then(
      (res) => {
        ToastService.success("Movie Updated Successfully!");

        editMovie(res.data.updatedMovie);
        setIsLoading(false);
      },
      (error) => {
        ToastService.error();
        setIsLoading(false);
      }
    );
  };

  const titleStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10vh",
    marginTop: "10vh",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: "32px",
    minHeight: "100vh",
  };

  const formStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "400px",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    marginTop: "24px",
  };

  const buttonContainerComponent = (
    <div style={buttonContainerStyle}>
      <Button
        text="Cancel"
        onClick={() => navigate(-1)}
        type={ButtonType.SECONDARY}
      />
      <Button
        text={isEdit ? "Edit" : "Submit"}
        onClick={submit}
        type={ButtonType.PRIMARY}
      />
    </div>
  );

  return (
    <>
      <h1 style={titleStyle}>{isEdit ? "Edit movie" : "Create a new movie"}</h1>
      <div style={containerStyle}>
        <div>
          <ImageBox
            src={poster}
            onImageUpload={(base64) => setPoster(base64)}
            disabled={isLoading}
          />
        </div>

        <div style={formStyle}>
          <InputField
            ref={titleRef}
            label="Title"
            disabled={isLoading}
            initialValue={title}
            validators={[Validator.isRequired]}
            onChange={(value) => setTitle(value)}
          />
          <InputField
            ref={yearRef}
            label="Publishing year"
            disabled={isLoading}
            initialValue={publishedYear}
            validators={[Validator.isRequired, Validator.isNumber]}
            onChange={(value) => setPublishedYear(value)}
          />
          {isLoading ? (
            <Loader style={{ display: "flex", justifyContent: "center" }} />
          ) : (
            buttonContainerComponent
          )}
        </div>
      </div>
    </>
  );
};

export default EditMovie;
