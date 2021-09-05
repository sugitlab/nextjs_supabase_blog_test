import Document, { Html, Head, Main, NextScript } from 'next/document'
import { createTheme, ThemeProvider, ThemeOptions, Palette, PaletteOptions } from '@mui/material/styles';


declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}

export const appTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#80deea',
    },
  },
};

const theme = createTheme();

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <ThemeProvider theme={appTheme}>
            <Main />
            <NextScript />
          </ThemeProvider>
        </body>
      </Html>
    )
  }
}

export default MyDocument