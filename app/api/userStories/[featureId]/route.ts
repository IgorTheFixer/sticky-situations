import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request, { params }: { params: { featureId: string } } 
) {
  const { featureId } = params;

  const feature = await prismadb.feature.findUnique({
    where: {
      id: featureId,
    },
    include: {
     userStories: true, // Include related features
    },
  });

  if (!feature) {
    return NextResponse.json({ error: "Feature not found" }, { status: 404 });
  }

  try {
    const body = await req.json();

    const { title, description } = body;

    if (!title) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const userStory = await prismadb.userStory.create({
      data: {
        title,
        description,
        feature: {
          connect: {id: featureId}
        }
      }
    });
  
    return NextResponse.json(userStory);
  } catch (error) {
    console.log('[USERSTORY_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};