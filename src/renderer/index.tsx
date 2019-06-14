import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: green,
        secondary: amber,
    },
});
const ThemedApp = (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </MuiThemeProvider>
);

ReactDOM.render(ThemedApp, document.getElementById('app'));

if ((module as any).hot) {
    (module as any).hot.accept('./app', () => {
        ReactDOM.render(ThemedApp, document.getElementById('app'));
    });
}
