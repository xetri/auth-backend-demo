import React from "react";
import ReactDOM from "react-dom/client"

import "bulma"
import "./style/style.scss"
import App from "./app";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(<App/>)
