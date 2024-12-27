'use client'

import { useEffect, useState } from "react"
import { Project } from "@prisma/client"

import ProjectForm from "@/app/components/ProjectForm";

interface ModalProviderProps {
  initialData: Project | null
}

//TODO: will need to type props for initial project and ModalType 
export const ModalProvider = ({initialData}: ModalProviderProps) =>{
  //Prevents bad hydration of component
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null
  }

  return (
    <ProjectForm initialData={initialData}/>
  )
}

