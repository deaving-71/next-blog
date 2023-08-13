import z from "zod";

export function handleError(err: unknown) {
  if (err instanceof z.ZodError) {
    return new Response(JSON.stringify(err), {
      status: 400,
    });
  } else if (err instanceof Error) {
    return (
      new Response(JSON.stringify({ message: err.message, cause: err?.cause })),
      {
        status: 500,
      }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Something went wrong", cause: err }),
      {
        status: 500,
      }
    );
  }
}
