import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./components/theme";
import CoinItemPage from "./components/CoinItemPage";
import CoinListPage from "./components/CoinListPage";
import Header from "./components/Header";
import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
`;

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [mode, setThemeMode] = useState('light');

  const switchTheme = () => {
    const nextTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(nextTheme);
    const themeMode = mode === 'light' ? 'dark' : 'light';
    setThemeMode(themeMode);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle></GlobalStyle>
        <Header switchTheme={switchTheme} mode={mode}/>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<CoinListPage />} />
            <Route path="/coin/:id" element={<CoinItemPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;