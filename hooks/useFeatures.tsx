import { create } from "zustand";
import { Feature } from "@prisma/client";

interface FeatureState {
  features: Feature[];
  setFeatures: (features: Feature[]) => void;
  addFeature: (feature: Feature) => void;
}

export const useFeatures = create<FeatureState>((set) => ({
  features: [],
  setFeatures: (features) => set({ features }),
  addFeature: (feature) =>
    set((state) => ({
      features: [...state.features, feature],
    })),
}));