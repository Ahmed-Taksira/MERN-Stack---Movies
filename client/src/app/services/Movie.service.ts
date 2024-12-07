import axios from "axios";
import { Movie } from "../interfaces/Movie.interface";

let url: string = process.env.NEXT_PUBLIC_SERVER_URL as string;

const getAll = () => {
  return axios.get(url);
};

const getById = (id: string) => {
  return axios.get(`${url}/${id}`);
};

const create = (movie: Movie) => {
  return axios.post(url, movie);
};

const update = (id: string, movie: Movie) => {
  return axios.put(`${url}/${id}`, movie);
};

const deleteById = (id: string) => {
  return axios.delete(`${url}/${id}`);
};

export const MovieService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
