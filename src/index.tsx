import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@/asserts/styles/global.less";

const Root = createRoot(document.getElementById("app"));
Root.render(<App />);
