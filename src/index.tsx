import { createMuiTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./Components/app";

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
    (module as any).hot.accept("./Components/app", () => {
        ReactDOM.render(ThemedApp, document.getElementById("app"));
    });
}
