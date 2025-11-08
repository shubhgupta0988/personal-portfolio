// Mock contact service for development (until backend is ready)

import type { ContactFormData, ContactSubmission, ApiResponse } from "@/types";

export const mockContactService = {
  async submitContactForm(
    data: ContactFormData
  ): Promise<ApiResponse<ContactSubmission>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate success
    const submission: ContactSubmission = {
      id: `mock-${Date.now()}`,
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: submission,
      message: "Contact form submitted successfully",
    };
  },
};

