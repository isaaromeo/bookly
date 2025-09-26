//import { useState } from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import './App.css'
import NavBar from "./styledComponents/NavBar.jsx";
import Search from "./styledComponents/Search.jsx";
import { ThemeProvider } from "styled-components";
import { booklyTheme } from "./theme";
import { Provider } from "./components/ui/provider";
import { Avatar, Stack, Text } from "@chakra-ui/react";
//import { colorPalettes } from "compositions/lib/color-palettes";



function App() {


  return (
    <Provider>
      <ThemeProvider theme={booklyTheme}>
        <div>
          <header className="header">
            <div className="logo">
              <h1 className="pageTitle">Bookly |</h1>
              <p className="pageLogo">Meet your new fav read!</p>
            </div>

            <div className="navbar">
              <nav>
                <Search />
              </nav>
              <Avatar.Root colorPalette="grey">
                <Avatar.Fallback name="Segun Adebayo" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
            </div>
          </header>

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
    </Provider>
  );
  
}

export default App
