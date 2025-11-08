// React Query hook for contact form

import { useMutation } from "@tanstack/react-query";
import { contactService } from "@/services/api/contactService";
import type { ContactFormData } from "@/types";

export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactFormData) =>
      contactService.submitContactForm(data),
    onSuccess: () => {
      // Could add toast notification here
      console.log("Contact form submitted successfully");
    },
    onError: (error) => {
      console.error("Failed to submit contact form:", error);
    },
  });
}

