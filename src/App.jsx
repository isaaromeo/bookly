import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
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
import styled from "styled-components";
import { Toaster } from "./components/ui/toaster";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme?.colors?.app?.primaryText || "#2d3748"};
`;

const Header = styled.header`
  background: ${(props) =>
    props.theme?.colors?.app?.cardHeaderBackground || "#ffffff"};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;


const HeaderContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }
`;


const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme?.colors?.app?.primaryText || "#2d3748"};
  font-size: 1.5rem;
  padding: 0.5rem;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: start;
  justify-content: start;
  outline: none !important;

  &:hover {
    color: #8d7a96ab};
    border-color: transparent;
  }
  
`;

const PageTitle = styled.h1`
  font-family: ${(props) =>
    props.theme?.typography?.fonts?.heading || "Cinzel, serif"};
  font-size: 2.2rem;
  color: ${(props) => props.theme?.colors?.app?.primaryText || "#2d3748"};
  margin-left: 10px;
`;

const PageLogo = styled.p`
  font-family: ${(props) =>
    props.theme?.typography?.fonts?.heading || "Cinzel, serif"};
  font-size: 0.7rem;
  color: ${(props) => props.theme?.colors?.app?.secondaryText || "#718096"};
  margin: 0;
`;


const Navbar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 35%;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    width: 100%;
    justify-content: center;
  }
`;


const MainContent = styled.main`
  flex: 1;
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 0;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    padding: 1rem;
  }
`;

const MainContentContainer = styled.div`
  flex: 1;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    padding: 0 1rem;
  }
`;


const Footer = styled.footer`
  background: ${(props) =>
    props.theme?.colors?.app?.cardHeaderBackground || "#ffffff"};
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  color: ${(props) => props.theme?.colors?.app?.secondaryText || "#718096"};
`;

function ThemeWrapper({ children }) {
const { colorMode } = useColorMode();
const currentTheme = colorMode === "light" ? lightTheme : booklyTheme;

return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
}

function App() {

  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  return (
    <Provider>
      <ThemeWrapper>
          <AuthProvider>
            <Toaster />
                      <AppContainer>
                        <Header>
                          <HeaderContainer>
                            <LogoSection
                              onClick={() => {
                                navigate("/");
                              }}
                            >
                              <PageTitle>Bookly |</PageTitle>
                              <PageLogo>Meet your new fav read!</PageLogo>
                            </LogoSection>
            
                            <Navbar>
                              <Search />
                              <UserMenu />
                            </Navbar>
                          </HeaderContainer>
                        </Header>
            
                        <MainContentContainer>
                          {!isHomePage && (
                            <BackButton
                              onClick={() => {
                                navigate(-1);
                              }}
                              title="Go back"
                            >
                              ←
                            </BackButton>
                          )}
            
                          <MainContent>
                            <Outlet />
                          </MainContent>
                        </MainContentContainer>
            
                        <Footer>
                          <FooterContainer>
                            <p>Created by Isa 🧚💻</p>
                            <p>Contact: hello@bookly.com | FAQS | Social Media</p>
                          </FooterContainer>
                        </Footer>
                      </AppContainer>
                    </AuthProvider>
                  </ThemeWrapper>
                </Provider>
              );
            }
            
            export default App;