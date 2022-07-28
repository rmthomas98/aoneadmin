import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { useState } from "react";
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  const [themeType, setThemeType] = useState("light");

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
};

export default App;
