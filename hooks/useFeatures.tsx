import { create } from "zustand";
import { Feature, UserStory } from "@prisma/client";

interface FeatureWithUserStories extends Feature {
  userStories: UserStory[];
}

interface FeatureState {
  features: FeatureWithUserStories[];
  setFeatures: (features: FeatureWithUserStories[]) => void;
  addFeature: (feature: FeatureWithUserStories) => void;
  addUserStory: (featureId: string, userStory: UserStory) => void;
  updateUserStoryStatus: (featureId: string, userStoryId: string, status: string) => void;
}

export const useFeatures = create<FeatureState>((set) => ({
  features: [], // Initial state

  // Set features in the state
  setFeatures: (features: FeatureWithUserStories[]) => set(() => ({ features })),

  // Add a new feature
  addFeature: (feature: FeatureWithUserStories) => set((state) => ({
    features: [...state.features, feature], // Update the features array
  })),

  // Add a user story to a feature
  addUserStory: (featureId: string, userStory: UserStory) => set((state) => {
    const updatedFeatures = state.features.map((feature) =>
      feature.id === featureId
        ? { ...feature, userStories: [...feature.userStories, userStory] }
        : feature
    );
    return { features: updatedFeatures }; // Return updated state with new user story
  }),

  // Update the status of a user story
  updateUserStoryStatus: (featureId: string, userStoryId: string, status: string) => set((state: FeatureState) => {
    const updatedFeatures = state.features.map((feature) =>
      feature.id === featureId
        ? {
            ...feature,
            userStories: feature.userStories.map((story) =>
              story.id === userStoryId ? { ...story, status } : story
            ),
          }
        : feature
    );
    return { features: updatedFeatures } as FeatureState; // Return updated state with status change
  }),
}));




