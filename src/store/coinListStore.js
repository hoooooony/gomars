import create from "zustand";

const useCoinListStore = create((set) => ({
  krwMarkets: [],
  krwMarketDetail: [],
  interestCoin: [],
  setKrwMarkets: (data) => set({ krwMarkets: data }),
  setKrwMarketDetail: (data) => set({ krwMarketDetail: data }),
  setInterestCoin: (data) => set({ interestCoin: data }),
}));

export default useCoinListStore;
