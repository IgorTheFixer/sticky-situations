"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { Project } from "@prisma/client"
import { useRouter } from "next/navigation";

interface ProjectRowProps {
  initialData: Project
}

export function ProjectRow({ initialData }: ProjectRowProps) {
  const modal = useModal();
  const router = useRouter()

  return (
    <tr>
      <td onClick={()=>router.push(`/projects/${initialData.id}`)}>{initialData.name}</td>
      <td>{initialData.description}</td>
      <td>
        <Button
          onClick={() => {
            modal.onOpen("project", initialData);
          }}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
}