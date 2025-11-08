// Contact form API service

import { apiRequest } from "./client";
import type { ContactFormData, ContactSubmission, ApiResponse } from "@/types";
import { mockContactService } from "../mock/contactMockService";

// Use mock service if API is not available
const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

export const contactService = {
  /**
   * Submit contact form
   */
  async submitContactForm(
    data: ContactFormData
  ): Promise<ApiResponse<ContactSubmission>> {
    if (USE_MOCK) {
      return mockContactService.submitContactForm(data);
    }
    return apiRequest<ApiResponse<ContactSubmission>>("/contact/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Get contact submissions (admin only)
   */
  async getSubmissions(): Promise<ContactSubmission[]> {
    if (USE_MOCK) {
      // Mock doesn't support this yet
      throw new Error("Not implemented in mock service");
    }
    return apiRequest<ContactSubmission[]>("/contact/submissions", {
      method: "GET",
    });
  },
};

