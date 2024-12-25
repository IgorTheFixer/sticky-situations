import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";

//TODO: Add CRUD functionality to the rendered list of Projects
export default async function Projects() {
  const projects = await prismadb.project.findMany()
  const projectsList = projects.map((project) =>{
    return(
    <li>
      {project.name}: {project.description}
    </li>
    )
  })
  return (
    <div>
      <div>Title</div>
      <div className="flex ">
        Projects Page
        <ul>
          {projectsList}
        </ul>
      </div>
    </div>
  );
}