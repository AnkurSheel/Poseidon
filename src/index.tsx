import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./Components/app";
import { MuiThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: green,
        secondary: amber,
    },
    typography: {
        useNextVariants: true,
    },
});
const ThemedApp = (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </MuiThemeProvider>
);

ReactDOM.render(ThemedApp, document.getElementById("app"));

if ((module as any).hot) {
    (module as any).hot.accept("./components/app", () => {
        ReactDOM.render(ThemedApp, document.getElementById("app"));
    });
}
