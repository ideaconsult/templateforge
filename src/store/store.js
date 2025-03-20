import { create } from "zustand";

const useStore = create((set) => ({
  uuid: null,
  isShosen: null,
  name: "",
  author: "",
  acknowledgment: "",
  showStartScreen: true,
  saveOnServer: false,
  viewMode: false,
  intermediateData: null,
  project: localStorage.getItem("project"),
  projectID: localStorage.getItem("projectID"),
  setProjectID: (projectID) => set(() => ({ projectID: projectID })),
  setUuid: (uuid) => set(() => ({ uuid: uuid })),
  setIsShosen: (isShosen) => set(() => ({ isShosen: isShosen })),
  setName: (name) => set(() => ({ name: name })),
  setAuthor: (author) => set(() => ({ author: author })),
  setAcknowledgment: (acknowledgment) =>
    set(() => ({ acknowledgment: acknowledgment })),
  setShowStartScreen: () =>
    set((state) => ({ showStartScreen: !state.showStartScreen })),
  setIntermediateData: (data) => set(() => ({ intermediateData: data })),
  setSaveOnServer: () =>
    set((state) => ({ saveOnServer: !state.saveOnServer })),
  setViewMode: (mode) => set(() => ({ viewMode: mode })),
}));

export const useProjectID = () => useStore((state) => state.projectID);
export const useSetProjectID = () => useStore((state) => state.setProjectID);

export const useIsShosen = () => useStore((state) => state.isShosen);
export const useSetIsShosen = () => useStore((state) => state.setIsShosen);

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

export const useViewMode = () => useStore((state) => state.viewMode);
export const useSetViewMode = () => useStore((state) => state.setViewMode);
