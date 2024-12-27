import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";

//TODO: Add CRUD functionality to the rendered list of Projects
//TODO: Remove unnecessary code
export default async function Projects() {
  const projects = await prismadb.project.findMany()
  const projectsList = projects.map((project) =>{
    return(
    // <li>
    //   {project.name}: {project.description}
    // </li>
      <tr>
        <td>{project.name}</td>
        <td>{project.description}</td>
        <td><Button>Edit</Button></td>
      </tr>
    )
  })
  return (
    <>
      {/* <div className="flex flex-col justify-center items-center h-full w-full">
        <div>Title</div>
        <div className="flex flex-col justify-center items-center">
          Projects Page
          <ul>
            {projectsList}
          </ul>
        </div>
      </div> */}
      <div className="flex justify-center items-center h-full w-full">
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Projection Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projectsList}
          </tbody>
        </table>
      </div>
    </>
  );
}