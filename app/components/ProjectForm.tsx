"use client"

import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Project } from "@prisma/client"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10)
})

type ProjectFormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  initialData: Project | null;
}

export default function ProjectForm({initialData}: ProjectFormProps){

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description:"",
    }
  })
  return(
    <Form {...form}>
      <form>
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
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your Project here." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>

    </Form>
  )
}