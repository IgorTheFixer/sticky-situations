'use client'

import { Button } from "@/components/ui/button";
import ProjectForm from "../components/ProjectForm"
import { useModal } from "@/hooks/useModal";

export default function Dashboard() {
  const modal = useModal()
  return (
    <div className="flex flex-col items-center justify-center border-4 border-blue-500 h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-screen border-2 border-green-500"> 
        <div className="border-2 border-red-500">
          <Button
            onClick={()=>{
              modal.onOpen("project")
            }}
          >
            Create New Project
          </Button>
        </div>
      </div>
    </div>
  );
}
