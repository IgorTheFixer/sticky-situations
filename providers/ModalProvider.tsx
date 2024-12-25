'use client'

import { useEffect, useState } from "react"

import ProjectForm from "@/app/components/ProjectForm";

//TODO: will need to type props for initial project and ModalType 
export const ModalProvider = () =>{
  //Prevents bad hydration of component
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null
  }

  return (
    <ProjectForm />
  )
}

