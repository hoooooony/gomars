import "./App.css";
import CoinList from "./components/coinList.js";
import MyCoin from "./components/myCoin";
import InterestCoin from "./components/interestCoin";
import Header from "./components/header";
function App() {
  return (
    <div className="App">
      <Header></Header>
      <MyCoin></MyCoin>
      <InterestCoin></InterestCoin>
      <CoinList></CoinList>
    </div>
  );
}

export default App;
