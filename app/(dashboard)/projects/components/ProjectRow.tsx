"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { Project } from "@prisma/client"

interface ProjectRowProps {
  initialData: Project
}

export function ProjectRow({ initialData }: ProjectRowProps) {
  const modal = useModal();
  return (
    <tr>
      <td>{initialData.name}</td>
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