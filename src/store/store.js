import { create } from "zustand";

const useStore = create((set) => ({
  uuid: "",
  showStartScreen: true,
  saveOnServer: false,
  intermediateData: { value: "Intermediate Data" },
  setUuid: (uuid) => set(() => ({ uuid: uuid })),
  setShowStartScreen: () =>
    set((state) => ({ showStartScreen: !state.showStartScreen })),
  setIntermediateData: (data) => set(() => ({ data: data })),
  setSaveOnServer: () =>
    set((state) => ({ saveOnServer: !state.saveOnServer })),
}));

export const useUuid = () => useStore((state) => state.uuid);
export const useSetUuid = () => useStore((state) => state.setUuid);

export const useShowStartScreen = () =>
  useStore((state) => state.showStartScreen);
export const useSetShowStartScreen = () =>
  useStore((state) => state.setShowStartScreen);

export const useIntermediateData = () =>
  useStore((state) => state.intermediateData);
export const useSetIntermediateData = () =>
  useStore((state) => state.setIntermediateData);

export const useSaveOnServer = () => useStore((state) => state.saveOnServer);
export const useSetSaveOnServer = () =>
  useStore((state) => state.setSaveOnServer);
