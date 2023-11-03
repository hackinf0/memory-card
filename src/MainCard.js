import React, { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaClock,
  FaJava,
  FaCss3Alt,
  FaReact,
} from "react-icons/fa";
import { GiAnticlockwiseRotation, GiWifiRouter } from "react-icons/gi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import {
  AiOutlineQuestionCircle,
  AiOutlineWifi,
  AiFillHtml5,
} from "react-icons/ai";
import { MdWifiTethering } from "react-icons/md";
import { SiTryhackme, SiJavascript, SiFlutter } from "react-icons/si";
const MainCard = () => {
  const [isplayIcon, setIsplayIcon] = useState(false);
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [openCard, setOpenCard] = useState([]);
  const [win, setwin] = useState([]);
  const [color, setColor] = useState("#101421");
  const [allCart, setAllCart] = useState([
    { id: 1, back: <AiOutlineWifi size="100px" />, color: color },
    { id: 2, back: <GiWifiRouter size="100px" />, color: color },
    { id: 3, back: <MdWifiTethering size="100px" />, color: color },
    { id: 4, back: <SiTryhackme size="100px" />, color: color },
    { id: 5, back: <SiJavascript size="100px" />, color: color },
    { id: 6, back: <FaJava size="100px" />, color: color },
    { id: 7, back: <AiFillHtml5 size="100px" />, color: color },
    { id: 8, back: <FaCss3Alt size="100px" />, color: color },
    { id: 9, back: <SiFlutter size="100px" />, color: color },
    { id: 10, back: <FaReact size="100px" />, color: color },
  ]);

  const styleCard = {
    othersCards: {
      width: "180px",
      height: "125px",
      borderRadius: "10px",
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contentFront: {
      color: "white",
      margin: 0,
    },
  };

  const start = () => {
    run();
    setInterv(setInterval(run, 1000));
  };

  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const pause = () => {
    clearInterval(interv);
  };
  const restart = () => { 
    clearInterval(interv);
    setTime({ s: 0, m: 0, h: 0 });
    setIsplayIcon(false)
    setOpenCard([])
  //  window.location.reload();
  };

  const shuffle = (array) => {
    let newPosition;
    let temp;
    for (let i = array.length - 1; i > 0; i--) {
      newPosition = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[newPosition];
      array[newPosition] = temp;
    }
    return array;
  };
  const playOrPause = () => {
    if (isplayIcon) {
      setIsplayIcon(!isplayIcon);
      pause();
    } else {
      setIsplayIcon(!isplayIcon);
      start();
    }
  };
  var cartsList = allCart.concat(allCart);
  useEffect(() => {
    if (openCard < 2) {
    }
    const firstCard = cartsList[openCard[0]];

    const secondCard = cartsList[openCard[1]];

    if (secondCard && firstCard.id === secondCard.id) {
      setwin([...win, firstCard.id]);
    }
    if (openCard.length === 2) {
      setTimeout(() => setOpenCard([]), 1000);
    }
  }, [openCard]);

  const Open = (index) => {
    setOpenCard((open) => [...open, index]);
  };

  return (
    <div style={styles.mainCard}>
      {isplayIcon ? null : <div style={styles.unPlay}></div>}

      <div style={styles.cardList}>
        {cartsList.map((item, index) => {
          let turn = true;
          if (openCard.includes(index)) {
            turn = false;
          }
          if (win.includes(item.id)) {
            turn = false;
          }
          return (
            <div key={index}>
              <div style={styleCard.othersCards} onClick={() => Open(index)}>
                <span style={styleCard.contentFront}>
                  {turn ? <AiOutlineQuestionCircle size="100px" /> : item.back}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={styles.button}>
        <div style={styles.divLeft}>
          <div style={styles.circle}>
            <FaAngleLeft size="40px" color="white" />{" "}
          </div>
          <div style={{ margin: "30px" }}>
            <h3 style={{ color: "white" }}>
              Playing with {allCart.length * 2} cards{" "}
            </h3>
          </div>
        </div>
        <div style={styles.divRight}>
          <div style={{ margin: "5px" }}>
            <FaClock size="20px" color="white" />
          </div>
          <div
            style={{
              margin: "10px",
              fontSize: "1em",
              fontWeight: "bold",
              color: "white", 
              display:"flex" 
            }}
            color="yellow"
          >
            <div> {time.h >= 10 ? time.h : "0" + time.h}:{" "} </div>
            <div>{time.m >= 10 ? time.m : "0" + time.m}:{" "} </div>
            <div>{time.s >= 10 ? time.s : "0" + time.s}</div>
          </div>
          <div onClick={playOrPause}> 
            {isplayIcon ? (
              <div style={styles.playClick}>
                <BsFillPauseFill size="30" color="white" />{" "}
              </div>
            ) : (
              <div style={styles.play}>
                <BsFillPlayFill size="30" color="white" />
              </div>
            )}
          </div>
          <div style={styles.restart} onClick={restart}>
            <div>
              <GiAnticlockwiseRotation
                size="20px"
                color="white"
                style={{ margin: "10px" }}
              />{" "}
            </div>
            <div>
              {" "}
              <h3 style={styles.textRestart}>Restart </h3>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainCard: {
    width: "auto",
    height: "600px",
    backgroundColor: "#4f4f4f",
    margin: "5px",
  },
  cardList: {
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "20% 20% 20% 20% 20%",
    gridTemplateRows: "28% 28% 28% 28%",
    gridGap: "5px",
    "&:hover": {
      background: "#f00",
    },
  },
  unPlay: {
    position: "absolute",
    width: "1000px",
    height: "535px",
    backgroundColor: "#00000096",
    zIndex: 10,
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
  },
  button: {
    height: "40px",
    width: "960px",
    backgroundColor: "#323b57",
    padding: "20px",
    top: "580px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divLeft: {
    width: "300px",
    height: "45px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  divRight: {
    width: "400px",
    height: "45px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    border: "1px solid white",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    mozBorderRadius: "100%",
    webkitBorderRadius: "100%",
  },
  play: {
    width: "70px",
    height: "45px",
    backgroundColor: "#149fc9",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
  },
  playClick: {
    width: "66px",
    height: "40px",
    border: "2px solid white",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
  },
  restart: {
    border: "1px solid white",
    width: "150px",
    height: "45px",
    borderRadius: "5px",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    paddingLeft: "10px",
    paddingRight: "20px",
    justifyContent: "center",
  },
  textRestart: {
    color: "white",
  },
  icon: {
    size: "300px",
  },
};

export default MainCard;
