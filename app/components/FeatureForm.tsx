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
import { useRouter, useParams } from "next/navigation"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/useModal";
import { useEffect, useState} from 'react'

const formSchema = z.object({
  id: z.ostring(),
  name: z.string().min(1, "Feature name is required."),
  description: z.string().min(5, "Description must be at least 5 characters.")
})

type FeatureFormValues = z.infer<typeof formSchema>

export default function FeatureForm(){
  const router = useRouter();
  const params = useParams()
  const modal = useModal()
  const initialData = modal.initialData
  const toastMessage = initialData ? "Feature updated" : "Feature created!"

  const form = useForm<FeatureFormValues>({
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

  const onSubmit = async (data: FeatureFormValues) => {
    console.log(data)
    try {
      if (initialData){
        await axios.patch(`/api/projects/${initialData.id}`, data)
        router.refresh()
      } else {
        // const response = 
        await axios.post(`/api/features/${params.projectId}`, data);
        // const newProject = response.data
        // router.push(`/projects/${newProject.id}`);
      }
      toast.success(toastMessage);
      modal.onClose()
    } catch (error: any) {
      toast.error('Something went wrong.');
    }
  }

  const title = initialData ? 'Edit Feature' : 'Create Feature'
  const description = initialData ? `Edit your Feature's Description` : "Create a description for your new Feature"
  const namePlaceholder = 'Feature Name'
  const descriptionPlaceholder = "Describe your Feature here."
  console.log(params)

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
                <FormLabel>Feature Name</FormLabel>
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
                <FormLabel>Feature Description</FormLabel>
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