import { FieldError } from "react-hook-form";

// TODO: make more resilient, check for multiple errors (.types).
export function getErrorText(
  error: FieldError | undefined
): string | undefined {
  if (error === undefined) {
    return undefined;
  }

  switch (error.type) {
    case "required":
      return "Bitte etwas auswählen";
    default:
      return "Unbekannter Validierungsfehler";
  }
}
