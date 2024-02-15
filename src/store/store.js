import { create } from "zustand";

const useStore = create((set) => ({
  uuid: null,
  name: "",
  author: "",
  acknowledgment: "",
  showStartScreen: true,
  saveOnServer: false,
  intermediateData: null,
  setUuid: (uuid) => set(() => ({ uuid: uuid })),
  setName: (name) => set(() => ({ name: name })),
  setAuthor: (author) => set(() => ({ author: author })),
  setAcknowledgment: (acknowledgment) =>
    set(() => ({ acknowledgment: acknowledgment })),
  setShowStartScreen: () =>
    set((state) => ({ showStartScreen: !state.showStartScreen })),
  setIntermediateData: (data) => set(() => ({ intermediateData: data })),
  setSaveOnServer: () =>
    set((state) => ({ saveOnServer: !state.saveOnServer })),
}));

export const useUuid = () => useStore((state) => state.uuid);
export const useSetUuid = () => useStore((state) => state.setUuid);

export const useName = () => useStore((state) => state.name);
export const useSetName = () => useStore((state) => state.setName);

export const useAuthor = () => useStore((state) => state.author);
export const useSetAuthor = () => useStore((state) => state.setAuthor);

export const useAcknowledgment = () =>
  useStore((state) => state.acknowledgment);
export const useSetAcknowledgment = () =>
  useStore((state) => state.setAcknowledgment);

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
