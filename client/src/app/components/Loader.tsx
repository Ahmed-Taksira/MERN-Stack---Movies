import { ClipLoader } from "react-spinners";

interface LoaderProps {
  style?: React.CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({ style }) => {
  const defaultLoaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={style ? style : defaultLoaderStyle}>
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );
};

export default Loader;
