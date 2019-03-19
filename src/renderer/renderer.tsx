import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Routes } from "./routes";
import "./style.scss";

ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    document.getElementById("app"),
);
