import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./global.scss";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
