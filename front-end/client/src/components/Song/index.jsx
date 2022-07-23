import { useState, useRef } from "react";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";

const Song = ({ song, playing, onClick, handleNextSong }) => {
  const [menu, setMenu] = useState(false);

  const divRef = useRef();
  //dragability

  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let initialX = 0;
  let initialY = 0;

  let finalX = 0;
  let finalY = 0;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    initialX = divRef.current.offsetLeft;
    initialY = divRef.current.offsetTop;

    // console.log({ initialX, initialY, pos3, pos4 });

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    divRef.current.style.top = divRef.current.offsetTop - pos2 + "px";
    divRef.current.style.left = divRef.current.offsetLeft - pos1 + "px";

    //fade song ??

    //opacity depends on how far away from center
    if (Math.abs(initialX - divRef.current.offsetLeft) > initialX / 2) {
      divRef.current.style.opacity = Math.max(
        0.1,
        1 -
          (Math.abs(initialX - divRef.current.offsetLeft) - initialX / 2) /
            (initialX / 2)
      );
    } else {
      divRef.current.style.opacity = 1;
    }

    // setTimeout(() => {
    //   divRef.current.style.top = divRef.current.offsetTop - pos2 + "px";
    //   divRef.current.style.left = divRef.current.offsetLeft - pos1 + "px";
    // });
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    //animation to move back to original position
    divRef.current.style.opacity = 1;
    let x = 2;
    let y = 2;

    finalX = divRef.current.offsetLeft;
    finalY = divRef.current.offsetTop;

    let newY, newX;
    if (finalX > initialX + (initialX * 2) / 3) {
      //animate move to right

      //call next song
      let res = handleNextSong();

      //   divRef.current.style.opacity = 0;
      //   divRef.current.style.display = "none";
      //reset position
      //   divRef.current.style.left = initialX + "px";
      //   divRef.current.style.top = initialY + "px";
      //   divRef.current.style.display = "flex";
      //   if (res) {
      //   divRef.current.style.display = "flex";
      //   }
      return;
    } else if (finalX < initialX - (initialX * 2) / 3) {
      //animate move to left
      //   divRef.current.style.opacity = 0;

      //call next song
      let res = handleNextSong();

      //   divRef.current.style.display = "none";
      //   divRef.current.style.left = initialX + "px";
      //   divRef.current.style.top = initialY + "px";
      //   if (res) {
      //   divRef.current.style.display = "flex";
      //   }
      //   divRef.current.style.display = "flex";
      return;
    }
    //animation to move back to original position
    let currentInt = setInterval(() => {
      let currentY = divRef.current.offsetTop;
      let currentX = divRef.current.offsetLeft;

      //   console.log({ currentY, initialY, currentX, initialX });
      if (currentY === initialY) {
        newY = currentY;
      } else if (currentY > initialY) {
        newY = currentY + y--;
        if (newY < initialY) {
          newY = initialY;
        }
      } else if (currentY < initialY) {
        newY = currentY + y++;
        if (newY > initialY) {
          newY = initialY;
        }
      }
      if (currentX === initialX) {
        newX = currentX;
      } else if (currentX > initialX) {
        newX = currentX + x--;
        if (newX < initialX) {
          newX = initialX;
        }
      } else if (currentX < initialX) {
        newX = currentX + x++;
        if (newX > initialX) {
          newX = initialX;
        }
      }

      divRef.current.style.top = newY + "px";
      divRef.current.style.left = newX + "px";

      if (newY === initialY && newX === initialX) {
        clearInterval(currentInt);
      }
    }, 10);
  }
  return (
    <div
      id="dragSongComponent"
      ref={divRef}
      className={styles.song_container}
      onClick={onClick}
      onDragStart={dragMouseDown}
      onDragEnd={closeDragElement}
    >
      {/* <div className={styles.left}> */}
      {/* k  */}
      <img className={styles.song_img} src={song.image} alt="song_img" />

      {!playing && (
        <IconButton
          className={styles.play_btn}
          onDragStart={dragMouseDown}
          onDragEnd={closeDragElement}
        >
          <PlayArrowIcon />
        </IconButton>
      )}
      <div
        onDragStart={dragMouseDown}
        onDragEnd={closeDragElement}
        className={styles.bottom_bar}
      >
        <p>{song.name}</p>
        {/* </div> */}
        <p>{song.artist}</p>

        {/* <p>{song.duration}</p> */}
      </div>
      {/* <div className={styles.right}> */}
      {/* <Like songId={song._id} /> */}

      {/* <IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
          <MoreHorizIcon />
        </IconButton>
        {menu && (
          <PlaylistMenu playlist={playlist} closeMenu={() => setMenu(false)} />
        )} */}
      {/* </div> */}
    </div>
  );
};

export default Song;
