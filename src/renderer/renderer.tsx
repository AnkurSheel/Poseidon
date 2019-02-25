import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.scss";

class App extends React.Component {
    public render() {
        return (
            <div>
                <h1>Hello World</h1>
                <h2>using Typescript, React and Electron</h2>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
