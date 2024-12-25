'use client'

import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/modal"
import ProjectForm from "@/app/components/ProjectForm";
import { useModal } from "@/hooks/useModal";

export const ModalProvider = () =>{
  //Prevents bad hydration of component
  const [isMounted, setIsMounted] = useState(false);

  const modal = useModal()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title="Test Title"
      description="Test Description"
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <ProjectForm />
    </Modal>
  )
}

