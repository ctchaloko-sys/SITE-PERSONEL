--- src/main.tsx (原始)
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);


+++ src/main.tsx (修改后)
// Ce fichier est minimal - tout le site est en HTML/CSS/JS pur
// Le div #root est caché, React ne rend rien
export {};
