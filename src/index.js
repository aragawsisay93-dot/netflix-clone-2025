// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { NetflixProvider } from "./context/NetflixContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter basename="/Netflix-clone-2025">
//     <NetflixProvider>
//       <App />
//     </NetflixProvider>
//   </BrowserRouter>,
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NetflixProvider } from "./context/NetflixContext";

const repoName = "Netflix-clone-2025";
const basename = process.env.NODE_ENV === "production" ? `/${repoName}` : "/";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter
    basename={basename}
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <NetflixProvider>
      <App />
    </NetflixProvider>
  </BrowserRouter>,
);
