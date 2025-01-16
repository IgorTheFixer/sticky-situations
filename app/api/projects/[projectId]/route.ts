import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { projectId: string } }) {
  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
    },
    include: {
      features: {
        include: {
          userStories: true
        }
      }
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

const fetchBooks = async() => {
  try {
    const response = await fetch ("/api/v1/books")
    if (!response.ok){
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    }
    const bookData = await response.json()
    setBooks(bookData.books)
  } catch (error:any) {
    console.log(`Error in fetch: ${error.message}`)
  }
}

const addBook = async (formPayload) => {
  try {
    const response = await fetch('/api/v1/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formPayload)
    })
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    }
    const body = await response.json()
    const currentBooks = books
    setBooks(currentBooks.concat(body.book))
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}