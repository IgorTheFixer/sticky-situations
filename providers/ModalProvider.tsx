'use client'

import { useEffect, useState } from "react"
import { Project } from "@prisma/client"
import { useModal } from "@/hooks/useModal";

import ProjectForm from "@/app/components/ProjectForm";
import FeatureForm from "@/app/components/FeatureForm";
import UserStoryForm from "@/app/components/UserStoryForm";

// interface ModalProviderProps {
//   initialData: Project | null
// }

//TODO: will need to type props for initial project and ModalType 
export const ModalProvider = (
  // {initialData}: ModalProviderProps
) =>{
  //Prevents bad hydration of component
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modal = useModal()
  const featureId = modal.featureId

  if (!isMounted) {
    return null
  }

  if (modal.modalType=== "project") {
    return <ProjectForm />;
  }

  if (modal.modalType === "feature") {
    return <FeatureForm />;
  }

  if (modal.modalType === "user story") {
    return <UserStoryForm featureId={featureId}/>;
  }
}

