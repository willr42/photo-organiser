import { z } from "zod"

export const metadataFrontendSchema = z.object({
  date: z.date(),
  path: z.string(),
})

export type MetadataFormSchema = z.infer<typeof metadataFrontendSchema>
