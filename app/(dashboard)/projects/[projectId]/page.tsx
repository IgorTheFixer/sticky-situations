'use client'

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useFeatures } from "@/hooks/useFeatures";
import { Project as PrismaProject, Feature } from "@prisma/client";

interface Project extends PrismaProject {
  features: Feature[]; // Include the features relation
}

export default function SingleProjectPage(){
  const params = useParams()
  const setFeatures = useFeatures((state) => state.setFeatures)
  const features = useFeatures((state) => state.features);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modal = useModal()

  useEffect(()=>{
    if(params.projectId){
      const fetchProject = async() => {
        try {
          const response = await axios.get(`/api/projects/${params.projectId}`)
          setProject(response.data);
          setFeatures(response.data.features)
        } catch (error) {
          setError("Failed to load project data")
        }
      }
      fetchProject()
    }
  }, [params.projectId, setFeatures])

  const featuresList = features.map((feature)=>{
    return <li key={feature.id}>{feature.name}: {feature.description}</li>
  })

//TODO: Use a loading page instead of this?
  if (!project) {
    return <div>Project not found or does not exist.</div>;
  }

  return(
    <div className="flex flex-col h-full w-full justify-center items-center">
      project page
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <Button
        onClick={()=>{
          modal.onOpen("feature")
        }}
      >
        Add New Feature
      </Button>
        <ul>
          {featuresList}
        </ul>
    </div>
  )
}