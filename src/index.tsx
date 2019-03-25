import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import "./index.scss";
import { Routes } from "./routes/routes";

ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    document.getElementById("app"),
);

if ((module as any).hot) {
    (module as any).hot.accept("./routes/routes", () => {
        ReactDOM.render(
            <Router>
                <Routes />
            </Router>,
            document.getElementById("app"),
        );
    });
}
