import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const Root = createRoot(document.getElementById("app"));
Root.render(<App />);
