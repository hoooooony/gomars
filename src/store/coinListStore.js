import create from "zustand";

const useCoinListStore = create((set) => ({
  krwMarkets: [],
  krwMarketDetail: [],
  interestCoin: [],
  setKrwMarkets: (data) => set({ krwMarkets: data }),
  setKrwMarketDetail: (data) => set({ krwMarketDetail: data }),
  addInterestCoin: (market) => {
    set((state) => {
      if (!state.interestCoin.includes(market)) {
        return { interestCoin: [...state.interestCoin, market] };
      }
      return state;
    });
  },
  removeInterestCoin: (market) => {
    set((state) => ({
      interestCoin: state.interestCoin.filter((item) => item !== market),
    }));
  },
}));

export default useCoinListStore;
