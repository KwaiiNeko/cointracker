import CoinListPage from "./components/CoinListPage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CoinItemPage from "./components/CoinItemPage";


function App() {
  return (

    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<CoinListPage />} />
        <Route path="/coin/:id" element={<CoinItemPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
