//import { useState } from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import './App.css'
import NavBar from "./styledComponents/NavBar.jsx";
import { ThemeProvider } from "styled-components";
import { booklyTheme } from "./theme";



function App() {


  return (
    <ThemeProvider theme={booklyTheme}>
      <div>
        <header className="header">
          <h1 className="pageTitle">Bookly</h1>
        </header>
        <div>
          <nav>
            <NavBar />
          </nav>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem 2rem",
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          <main>
            <Outlet />
          </main>
        </div>
        <footer>Created by Isa 🧚💻</footer>
      </div>
    </ThemeProvider>
  );
  
}

export default App
