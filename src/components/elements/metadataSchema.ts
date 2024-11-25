import { z } from "zod"

export const metadataFrontendSchema = z.object({
  date: z.date(),
})

export const metadataBackendSchema = z.object({
  date: z.string().datetime(),
})

export type MetadataFormSchema = z.infer<typeof metadataFrontendSchema>
