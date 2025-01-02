import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request, { params }: { params: { projectId: string } } 
) {
  const { projectId } = params;

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

  try {
    const body = await req.json();

    const { name, description } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const feature = await prismadb.feature.create({
      data: {
        name,
        description,
        project: {
          connect: {id: projectId}
        }
      }
    });
  
    return NextResponse.json(feature);
  } catch (error) {
    console.log('[FEATURE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};