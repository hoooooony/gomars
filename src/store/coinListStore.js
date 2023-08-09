import create from "zustand";

const useCoinListStore = create((set) => ({
  krwMarkets: [],
  krwMarketDetail: [],
  interestCoin: JSON.parse(localStorage.getItem("interestCoin") || "[]"),
  setKrwMarkets: (data) => set({ krwMarkets: data }),
  setKrwMarketDetail: (data) => set({ krwMarketDetail: data }),
  addInterestCoin: (market) => {
    set((state) => {
      if (!state.interestCoin.includes(market)) {
        const newInterestCoin = [...state.interestCoin, market];
        localStorage.setItem("interestCoin", JSON.stringify(newInterestCoin)); // 로컬 스토리지에 저장
        return { interestCoin: newInterestCoin };
      }
      return state;
    });
  },

  removeInterestCoin: (market) => {
    set((state) => {
      const newInterestCoin = state.interestCoin.filter(
        (item) => item !== market
      );
      localStorage.setItem("interestCoin", JSON.stringify(newInterestCoin)); // 로컬 스토리지에 저장
      return { interestCoin: newInterestCoin };
    });
  },
}));

export default useCoinListStore;
