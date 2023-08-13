import { ErrorOption } from "react-hook-form";
import z from "zod";

export function extractZodErrors(err: z.ZodError) {
  const { fieldErrors } = err.flatten();

  const extractedErrors: { [key: string]: string } = {};

  Object.entries(fieldErrors).forEach(
    ([key, fieldError]) => (extractedErrors[key] = fieldError?.[0] ?? "")
  );

  return extractedErrors;
}
