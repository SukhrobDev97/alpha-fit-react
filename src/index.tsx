import React from 'react';
import ReactDOM  from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import theme from './MaterialTheme';
import { BrowserRouter as Router  } from "react-router-dom";
import ContextProvider from './app/context/ContextProvider';

const container = document.getElementById('root')!;
// const root = createRoot(container);
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
   <Provider store={store}>
     <ContextProvider>
     <ThemeProvider theme = {theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
     </ContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
