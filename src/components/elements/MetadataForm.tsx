"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { updateMetadata } from "./useMetadata"
import { MetadataFormSchema, metadataFrontendSchema } from "./metadataSchema"
import { useState } from "react"

export function MetadataForm() {
  const [formResult, setFormResult] = useState(false)
  const form = useForm<MetadataFormSchema>({
    resolver: zodResolver(metadataFrontendSchema),
  })

  const onSubmit: SubmitHandler<MetadataFormSchema> = async (data) => {
    const formData = new FormData()
    formData.append("date", data.date.toISOString())

    const result = await updateMetadata(formData)

    if (!result.success) {
      form.setError("date", {
        type: "server",
        message: result.error?.message,
      })
    }

    setFormResult(result.success)
  }

  return (
    <>
      {!formResult && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Date taken</FormLabel>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Submit</Button>
          </form>
        </Form>
      )}
      <div>{formResult && <p>Form submitted!</p>}</div>
    </>
  )
}
