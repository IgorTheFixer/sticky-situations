import { create } from "zustand";

type ModalType = "project" | "feature" | null

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  //TODO: Define the type for initial data better/ ProJect / User Story / Feature / etc/
  initialData: any | null
  onOpen: (type: ModalType, data?: any) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  initialData: null,
  onOpen: (type, data = null) => set({ isOpen: true, modalType: type, initialData: data }),
  onClose: () => set({ isOpen: false, modalType: null, initialData: null }),
}));