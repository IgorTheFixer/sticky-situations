'use client'

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useFeatures } from "@/hooks/useFeatures";
import { Project as PrismaProject, Feature } from "@prisma/client";
import { Fragment } from "react";
import { PlusIcon } from "lucide-react";
import { useStories } from "@/hooks/useStories";

interface Project extends PrismaProject {
  features: Feature[]; // Include the features relation
}

export default function SingleProjectPage(){
  const params = useParams()
  const setFeatures = useFeatures((state) => state.setFeatures)
  const features = useFeatures((state) => state.features);
  const userStories = useStories((state) => state.userStories)
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

  const columns = ["NEW", "OPEN", "CLOSE"]; // Example column headers
  
  return(
    <>
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
       <div className="grid grid-cols-[1fr_repeat(3,minmax(200px,1fr))] gap-4 w-full border-2 border-red-500">
      {/* Header Row */}
      <div className="border-2 border-red-500"></div> {/* Empty cell for the first column */}
      {columns.map((column) => (
        <div key={column} className="text-center font-bold border-b pb-2 border-2 border-red-500">
          {column}
        </div>
      ))}

      {/* Feature Rows */}
      {features.map((feature) => (
        <Fragment key={feature.id}>
          {/* Feature Name */}
          <div className="font-semibold border-r pr-2">
            {feature.name}
            <Button size={"icon"}
              onClick={()=>{
                modal.onOpen("user story", null, feature.id)
              }}
            >
              <PlusIcon/>
            </Button>
          </div>
          {/* Empty Cells for Columns */}
          {columns.map((column, index) => (
            <div key={index} className="border p-4 bg-gray-50 h-18">
                {/* Filter user stories for the current feature and column */}
                {userStories
                 .filter((story) => {
                  const matchesFeature = story.featureId === feature.id;
                  const matchesStatus = story.status === column;
                  console.log('Matching user story:', story.featureId, feature.id, story.status, column);
                  return matchesFeature && matchesStatus;
                })
                  .map((userStory) => (
                    <div key={userStory.id}>{userStory.title}</div>
                  ))}
            </div>
          ))}
        </Fragment>
      ))}
      </div>
    </>
  )
}