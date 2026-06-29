import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import { Provider } from "react-redux";
import store from "./app/store";
import AppRoutes from "./routes/AppRoutes"; // Imports our unified routes framework

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* AppRoutes acts as the self-contained RouterProvider engine */}
      <AppRoutes />
    </Provider>
  </React.StrictMode>
=======
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";

import router from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
);