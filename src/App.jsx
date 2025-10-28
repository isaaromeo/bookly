import { Outlet, Route, Routes } from "react-router-dom";
import './App.css'
import Search from "./styledComponents/Search.jsx";
import UserMenu from "./styledComponents/UserMenu.jsx";
import { ThemeProvider } from "styled-components";
// import { booklyTheme } from "./theme";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./context/AuthContext";
import { useColorMode } from "./components/ui/color-mode";
import { booklyTheme, lightTheme} from "./data/booklyTheme";
//import { colorPalettes } from "compositions/lib/color-palettes";

function ThemeWrapper({ children }) {
  const { colorMode } = useColorMode();

  const currentTheme = colorMode === "light" ? lightTheme : booklyTheme;

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
}

function App() {


  return (
    <Provider>
      <ThemeWrapper>
          <AuthProvider>
            <div>
              <header className="header">
                <div className="logo">
                  <h1 className="pageTitle">Bookly |</h1>
                  <p className="pageLogo">Meet your new fav read!</p>
                </div>

                <div className="navbar">
                  <Search />
                  <UserMenu />
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
          </AuthProvider>
      </ThemeWrapper>
    </Provider>
  );
  
}

export default App
