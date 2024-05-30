import { ShortTeam } from "@/interfaces/models/Team";
import { create } from "zustand";

interface ModalData {
  id?: number;
  competition_name?: string;
  home_team?: ShortTeam;
  away_team?: ShortTeam;
  initialType?: string;
}

interface UIState {
  isModalOpen: boolean;
  modalType: string | null;
  modalData: ModalData;
  isSnackbarOpen: boolean;
  snackbarMessage: string;
  openModal: (modalType: string, modalData?: ModalData) => void;
  closeModal: () => void;
  openSnackbar: (message: string) => void;
  closeSnackbar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  modalType: "",
  modalData: {},
  isSnackbarOpen: false,
  snackbarMessage: "",
  openModal: (modalType: string, modalData?: ModalData) =>
    set({ isModalOpen: true, modalType, modalData }),
  closeModal: () => set({ isModalOpen: false, modalType: null }),
  openSnackbar: (message) =>
    set({ isSnackbarOpen: true, snackbarMessage: message }),
  closeSnackbar: () => set({ isSnackbarOpen: false, snackbarMessage: "" }),
}));
