"use server"

import { z } from "zod"
import { metadataBackendSchema } from "./metadataSchema"

export async function updateMetadata(formData: FormData) {
  try {
    const rawDate = formData.get("date")

    if (!rawDate) {
      return {
        success: false,
        error: { message: "Date is required", field: "date" },
      }
    }

    const date = rawDate.toString()
    const validatedData = metadataBackendSchema.parse({ date })

    return {
      success: true,
      data: validatedData,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      return {
        success: false,
        error: {
          message: firstError.message,
          field: firstError.path.join("."),
        },
      }
    }

    return {
      success: false,
      error: {
        message: "An unexpected error",
      },
    }
  }
}
