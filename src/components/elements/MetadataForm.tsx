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
import { MetadataFormSchema, metadataFrontendSchema } from "./metadataSchema"
import { useState } from "react"
import { MetadataItem, useMetadataContext } from "@/lib/providers"
import { useParams } from "next/navigation"
import { Input } from "../ui/input"

export function MetadataForm({ path: passedinPath }: { path?: string }) {
  const [formResult, setFormResult] = useState(false)
  const { updateMetadata } = useMetadataContext()
  const form = useForm<MetadataFormSchema>({
    resolver: zodResolver(metadataFrontendSchema),
  })

  const { slug } = useParams()
  let path = ""

  if (!slug) return <></>

  if (slug && Array.isArray(slug)) {
    const unencodedSlug = slug.map((segment) => decodeURIComponent(segment))
    path = "/" + unencodedSlug.join("/")
  } else {
    path = "/" + decodeURIComponent(slug)
  }

  const onSubmit: SubmitHandler<MetadataFormSchema> = async (data) => {
    // Add an extra day in MS
    const correctedDate = new Date(data.date.getTime() + 86400000)

    const newMetadata: MetadataItem = {
      dateStamp: correctedDate.toISOString(),
      status: null,
    }
    updateMetadata(data.path, newMetadata)
    setFormResult(true)
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
            <FormField
              control={form.control}
              name="path"
              render={() => <Input className="hidden"></Input>}
              defaultValue={passedinPath || path}
            />
            <Button>Submit</Button>
          </form>
        </Form>
      )}
      <div>{formResult && <p>Form submitted!</p>}</div>
    </>
  )
}
