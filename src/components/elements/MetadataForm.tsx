"use client"

import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Calendar } from "../ui/calendar"

export function MetadataForm() {
  const schema = z.object({
    date: z.date({ required_error: "this is required" }),
  })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data)
  }

  return (
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
  )
}
