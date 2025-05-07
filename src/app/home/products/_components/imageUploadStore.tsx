import { create } from "zustand";

interface ImageUploadState {
  uploadingId: number | null;
  setUploadingId: (id: number | null) => void;
}

export const useImageUploadStore = create<ImageUploadState>((set) => ({
  uploadingId: null,
  setUploadingId: (id) => set({ uploadingId: id }),
}));
