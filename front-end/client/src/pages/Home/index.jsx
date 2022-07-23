import { Fragment } from "react";
import Song from "../../components/Song";
import styles from "./styles.module.scss";
import playlistImg from "../../images/rock.jpg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSongs } from "../../redux/actions/songActions";
import Cookies from "universal-cookie";
import logout from "../../utils/logout";

// const playlists = [
//   { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Krlosz" },
// ];

const Home = () => {
  const {
    songs,
    loadingGetSongs,
    error: getSongsError,
    logout: getSongsLogout,
  } = useSelector((state) => state.songs);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    //handle songs?
    if (getSongsError && !songs) {
      alert(getSongsError ?? "No hay canciones, revisar con admin.");
    }
    if (getSongsLogout) {
      dispatch({ type: "RESET" });
      logout(history);
    }
  }, [songs, getSongsError, getSongsLogout]);

  useEffect(() => {
    //loader
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (!token) logout(history);
    dispatch(getSongs(token));
  }, []);
  const handleNextSong = () => {
    if (index < songs.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
      alert("No hay más canciones!");
    }
  };
  return (
    <Fragment>
      <div className={styles.container}>
        {!getSongsError && !loadingGetSongs && songs && (
          <Song song={songs[index]} handleNextSong={handleNextSong} />
        )}
        {/* <h1>Good afternoon</h1>
				<div className={styles.playlists_container}>
				</div>
				<h1>Just the hits</h1>
				<div className={styles.playlists_container}>
					<Playlists playlists={playlists} />
				</div> */}
      </div>
    </Fragment>
  );
};

export default Home;
