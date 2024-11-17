"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

export function MetadataForm() {
  const form = useForm()

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date taken</FormLabel>
            <FormControl>
              <Input placeholder="01.01.2024" {...field} />
            </FormControl>
            <FormDescription>The date the image was taken.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
