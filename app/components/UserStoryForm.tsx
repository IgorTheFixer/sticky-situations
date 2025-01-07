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
import { useStories } from "@/hooks/useStories"
import { useEffect, useState} from 'react'

const formSchema = z.object({
  id: z.ostring(),
  title: z.string().min(1, "UserStory title is required."),
  description: z.string().min(5, "Description must be at least 5 characters.")
})

type UserStoryFormValues = z.infer<typeof formSchema>
type UserStoryFormProps = {
  featureId: string | null;
};

export default function UserStoryForm({ featureId }: UserStoryFormProps){
  console.log(featureId)
  const router = useRouter();
  const params = useParams()
  const modal = useModal()
  const addStory = useStories((state) => state.addStory);
  const initialData = modal.initialData
  const toastMessage = initialData ? "User Story updated" : "User Story created!"

  const form = useForm<UserStoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    if (modal.initialData) {
      form.reset({
        title: modal.initialData.name,
        description: modal.initialData.description,
      });
    }
  }, [modal.initialData, form]);

  const onSubmit = async (data: UserStoryFormValues) => {
    console.log(data)
    try {
      if (initialData){
        await axios.patch(`/api/projects/${initialData.id}`, data)
        router.refresh()
      } else {
        const response = await axios.post(`/api/userStories/${featureId}`, data);
        const newStory = response.data
        console.log("New Story",newStory)
        addStory(newStory)
        // const newProject = response.data
        // router.push(`/projects/${newProject.id}`);
      }
      toast.success(toastMessage);
      modal.onClose()
    } catch (error: any) {
      toast.error('Something went wrong.');
    }
  }

  const title = initialData ? 'Edit User Story' : 'Create User Story'
  const description = initialData ? `Edit your User Story's Description` : "Create a description for your new User Story"
  const titlePlaceholder = 'User Story Title'
  const descriptionPlaceholder = "Describe your User Story here."
  console.log(params)

  return(
    <Modal
      title= {title}
      description={description}
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <Form {...form}>
        <div>This is the User Story form</div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Story Name</FormLabel>
                <FormControl>
                  <Input placeholder={titlePlaceholder} {...field}/>
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
                <FormLabel>User Story Description</FormLabel>
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