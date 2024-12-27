import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { projectId: string } }) {
  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
    },
    include: {
      features: true, // Include related features
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PATCH(req:Request, { params }: { params: { projectId: string } }){
  try {
    const body = await req.json();

    const { name, description} = body
    const projectId = params.projectId

    const project = await prismadb.project.update({
      where: {
        id: projectId
      },
      data: {
        name,
        description
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.log('[PROJECT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}