import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();

    const { name, description } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const project = await prismadb.project.create({
      data: {
        name,
        description,
      }
    });
  
    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};