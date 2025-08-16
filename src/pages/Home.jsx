import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>SPS REACT TEST</h1>

      <Link to="/users">Usuários</Link>
    </div>
  );
}

export default Home;
