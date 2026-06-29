import React from "react";
import ReactDOM from "react-dom/client";
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
);