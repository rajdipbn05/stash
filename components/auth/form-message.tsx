import type { FormState } from "@/app/auth/actions";

// Shows the error or success message returned by a form action.
export function FormMessage({ state }: { state: FormState }) {
  if (state.error) {
    return (
      <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
        {state.error}
      </p>
    );
  }
  if (state.message) {
    return (
      <p role="status" className="rounded-lg bg-muted px-3 py-2 text-sm">
        {state.message}
      </p>
    );
  }
  return null;
}
