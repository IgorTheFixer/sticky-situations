'use client'

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  features: { id: string; name: string }[];
}

export default function SingleProjectPage(){
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log(params)

  useEffect(()=>{
    if(params.projectId){
      const fetchProject = async() => {
        try {
          const response = await axios.get(`/api/projects/${params.projectId}`)
          setProject(response.data);
        } catch (error) {
          setError("Failed to load project data")
        }
      }
      fetchProject()
    }
  }, [params.projectId])

//TODO: Use a loading page instead of this?
  if (!project) {
    return <div>Project not found or does not exist.</div>;
  }

  return(
    <div>
      project page
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <Button>
        Add New Feature
      </Button>
    </div>
  )
}