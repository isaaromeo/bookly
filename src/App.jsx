import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Search from "./styledComponents/Search.jsx";
import UserMenu from "./styledComponents/UserMenu.jsx";
import { ThemeProvider } from "styled-components";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./context/AuthContext";
import { booklyTheme } from "./data/booklyTheme";
import styled from "styled-components";
import { Toaster } from "./components/ui/toaster";
import { Heading } from "@chakra-ui/react";



const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
`;

const Header = styled.header`
  background: ${(props) =>
    props.theme?.colors?.app?.cardHeaderBackground};
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
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    padding: 0 1rem;
    gap: 1rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "480px"}) {
    padding: 0 0.5rem;
    gap: 0.5rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
  min-width: fit-content;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: brand.900;
  font-size: 1.5rem;
  padding: 0.5rem;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: start;
  justify-content: start;
  outline: none !important;
  color: ${(props) => props.theme?.colors?.app?.primaryText || "#2d3748"};

  &:hover {
    color: #8d7a96ab;
    border-color: transparent;
  }

  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "480px"}) {
    font-size: 1.2rem;
    padding: 0.25rem;
  }
`;

const PageTitle = styled.h1`
  font-family: "Cinzel";
  font-size: 2.2rem;
  color: ${(props) => props.theme?.colors?.app?.primaryText || "#2d3748"};
  margin-left: 10px;
  white-space: nowrap;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    font-size: 1.8rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "480px"}) {
    font-size: 1.5rem;
    margin-left: 5px;
  }
`;

const PageLogo = styled.p`
  font-family: ${(props) =>
    props.theme?.typography?.fonts?.heading || "Cinzel, serif"};
  font-size: 1rem;
  color: ${(props) => props.theme?.colors?.app?.secondaryText || "#718096"};
  margin: 0;
  white-space: nowrap;
  align-self: end;
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "540px"}) {
    display: none;
    
  }
  
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: flex-end;
  max-width: 600px;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    gap: 0.75rem;
    max-width: 500px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "480px"}) {
    gap: 0.5rem;
    max-width: 400px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 0;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "820px"}) {
    padding: 0;
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

  const currentTheme =  booklyTheme;

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
                  <PageTitle>Bookly</PageTitle>
                  <Heading
                    fontSize={{
                      sm: "xl",
                      md: "2xl",
                      lg: "2xl",
                    }}
                    paddingTop="5px"
                    display={{
                      base: "none",
                      sm: "block",
                      md: "block",
                      lg: "block",
                    }}
                    color="muted.200"
                    className="custom-logo-bar"
                  >
                    |
                  </Heading>
                  <PageLogo className="custom-logo">
                    Meet your new fav read!
                  </PageLogo>
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
                  className="custom-back-button"
                  color="muted.100"
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
