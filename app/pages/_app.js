import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { useState } from "react";

const App = ({ Component, pageProps }) => {
  const [themeType, setThemeType] = useState("dark");

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
};

export default App;
