import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header";
import Hero, { Intro } from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e9c4ae" },
    background: { default: "#100c16", paper: "#1c1524" },
    text: { primary: "#f5f0e6", secondary: "#b4a9b9" },
  },
  typography: { fontFamily: '"Inter", sans-serif' },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Intro />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
export default App;
