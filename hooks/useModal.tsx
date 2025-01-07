import { create } from "zustand";

type ModalType = "project" | "feature" | "user story" | null

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  //TODO: Define the type for initial data better/ ProJect / User Story / Feature / etc/
  initialData: any | null
  featureId: string | null
  onOpen: (type: ModalType, data?: any, featureId?: string | null) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  initialData: null,
  featureId: null,
  onOpen: (type, data = null, featureId) => set({ isOpen: true, modalType: type, initialData: data, featureId }),
  onClose: () => set({ isOpen: false, modalType: null, initialData: null, featureId: null }),
}));