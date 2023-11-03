import React from "react";
import MainCard from "./MainCard";

function App() {
  return (
    <div className="App" style={styles.app}>
      <MainCard/>
    </div>
  );
}

const styles={
  app:{
    width:'100%',
    height:'100%',
    overflow:'hidden',
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
  }
}

export default App;
