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