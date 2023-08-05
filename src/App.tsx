import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./state/store";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./navigation/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
