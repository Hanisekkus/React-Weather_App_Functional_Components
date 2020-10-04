import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"

ReactDOM.render(
    <React.StrictMode children={[<App key="App"/>]}/>,
    document.getElementById("root")
)