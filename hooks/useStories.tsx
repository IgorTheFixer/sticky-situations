import { create } from "zustand";
import { UserStory } from "@prisma/client";

interface UserStoryState {
  userStories: UserStory[];
  setStories: (userStories: UserStory[]) => void;
  addStory: (userStories: UserStory) => void;
}

export const useStories = create<UserStoryState>((set) => ({
  userStories: [],
  setStories: (userStories) => set({ userStories }),
  addStory: (userStory) =>{
    console.log("Adding user story:", userStory);
    set((state) => ({
      userStories: [...state.userStories, userStory],
    }))
  },
}));