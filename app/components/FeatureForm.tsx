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
import { useEffect, useState} from 'react'

const formSchema = z.object({
  id: z.ostring(),
  name: z.string().min(1, "Project name is required."),
  description: z.string().min(10, "Description must be at least 10 characters.")
})

type ProjectFormValues = z.infer<typeof formSchema>

export default function FeatureForm(){
  const router = useRouter();
  const modal = useModal()
  const initialData = modal.initialData
  const toastMessage = initialData ? "Project updated" : "Project created!"

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    if (modal.initialData) {
      form.reset({
        name: modal.initialData.name,
        description: modal.initialData.description,
      });
    }
  }, [modal.initialData, form]);

  const onSubmit = async (data: ProjectFormValues) => {
    console.log(data)
    try {
      if (initialData){
        await axios.patch(`/api/projects/${initialData.id}`, data)
        router.refresh()
      } else {
        const response = await axios.post(`/api/projects`, data);
        const newProject = response.data
        router.push(`/projects/${newProject.id}`);
      }
      toast.success(toastMessage);
      modal.onClose()
    } catch (error: any) {
      toast.error('Something went wrong.');
    }
  }

  const title = initialData ? 'Edit Project' : 'Create Project'
  const description = initialData ? `Edit your Project's Description` : "Create a description for your new Project"
  const namePlaceholder = 'Project Name'
  const descriptionPlaceholder = "Describe your Project here."
  console.log(initialData)

  return(
    <Modal
      title= {title}
      description={description}
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <Form {...form}>
        <div>This is the Feature form</div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder={namePlaceholder} {...field}/>
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
                  <Textarea placeholder={descriptionPlaceholder} {...field}/>
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