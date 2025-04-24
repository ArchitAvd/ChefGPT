"use client";
import { useState } from "react";
import { ContactForm } from "@/src/app/types";

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id.replace("contact", "").toLowerCase()]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setSubmitMessage({
        type: "success",
        text: "Thank you for your message! We will get back to you soon.",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitMessage({
        type: "error",
        text: "Sorry, there was an error sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-section" className="section">
      <div className="search-container">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          <i className="fas fa-envelope text-rose-500"></i> Contact Us
        </h2>
        <div className="contact-content">
          <p className="text-gray-700 mb-4">
            Have questions or suggestions? We&apos;d love to hear from you!
          </p>

          {submitMessage && (
            <div
              className={`p-4 mb-4 rounded-lg ${
                submitMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <form
            id="contactForm"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="contactName">Your Name</label>
              <input
                type="text"
                id="contactName"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Your Email</label>
              <input
                type="email"
                id="contactEmail"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="submit-button-container">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                <i className="fas fa-paper-plane"></i>
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
