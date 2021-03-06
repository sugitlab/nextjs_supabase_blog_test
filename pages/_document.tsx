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
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
            rel="stylesheet"
          >
          </link>
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