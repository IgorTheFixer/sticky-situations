"use client"

import * as z from "zod"
import axios from "axios"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Project } from "@prisma/client"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/useModal";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10)
})

type ProjectFormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  initialData: Project | null;
}

export default function ProjectForm({initialData}: ProjectFormProps){
  const router = useRouter();
  const modal = useModal()

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description:"",
    }
  })

  const onSubmit = async (data: ProjectFormValues) => {
    console.log(data)
    try {
      modal.onClose()
      const response = await axios.post(`/api/projects`, data);
      const newProject = response.data
      router.refresh();
      router.push(`/projects/${newProject.id}`);
      toast.success("Project created!");
    } catch (error: any) {
      toast.error('Something went wrong.');
    }
  }

  return(
    <Modal
      title= "Create Project"
      description="Create a description for your new Project"
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Project Name" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your Project here." {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Modal>
  )
}