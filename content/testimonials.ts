import { z } from "zod"

const testimonialSchema = z.object({
  name: z.string().min(1),
  comment: z.string().min(1),
  source: z.string().min(1).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  verified: z.literal(true),
})

export const verifiedTestimonials = z.array(testimonialSchema).parse([])

export type Testimonial = z.infer<typeof testimonialSchema>
