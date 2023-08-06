import "./App.css";
import CoinList from "./components/coinList.js";
import MyCoin from "./components/myCoin";
import InterestCoin from "./components/interestCoin";
function App() {
  const accessparams = { key: process.env.REACT_APP_ACCESSKEY }; //전역적으로 관리해야함
  return (
    <div className="App">
      <img
        style={({ width: "170px" }, { height: "170px" })}
        src="image/dogeCoin.png"
      />
      <MyCoin></MyCoin>
      <InterestCoin></InterestCoin>
      <CoinList></CoinList>
    </div>
  );
}

export default App;
