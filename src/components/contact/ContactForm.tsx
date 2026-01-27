"use client";
import React, { useState, useRef } from "react";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { sendContactEmail } from "@/actions/contact-us";
import { PROPERTIES } from "@/lib/properties";

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Form validation
  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const inquiryType = formData.get("inquiryType") as string;
    const message = formData.get("message") as string;

    if (!firstName || firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!lastName || lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!phone || !/^[+]?[\d\s()-]{10,}$/.test(phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!inquiryType) {
      errors.inquiryType = "Please select an inquiry type";
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset states
    setSuccess(false);
    setError(null);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    
    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      element?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await sendContactEmail({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        inquiryType: formData.get("inquiryType") as string,
        propertyInterest: formData.get("propertyInterest") as string,
        message: formData.get("message") as string,
      });

      if (res.success) {
        setSuccess(true);
        formRef.current?.reset();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);

        // Scroll to success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(res.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        {/* Success/Error Messages */}
      {(success || error) && (
        <div className="max-w-4xl mx-auto w-full px-4 mt-8">
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-fade-in" role="alert">
              <FaCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
                <p className="text-green-700 text-sm mt-1">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-fade-in" role="alert">
              <FaExclamationCircle className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contact Form Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gold/40 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-green-600 mb-8 text-center animate-slide-down">Send Us a Message</h2>
          <form ref={formRef} onSubmit={handleSubmit}  className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First Name" 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black ${
                    formErrors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                  }`}
                  aria-invalid={!!formErrors.firstName}
                  aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                />
                {formErrors.firstName && (
                  <p id="firstName-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <FaExclamationCircle className="text-xs" />
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name" 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black ${
                    formErrors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                  }`}
                  aria-invalid={!!formErrors.lastName}
                  aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
                />
                {formErrors.lastName && (
                  <p id="lastName-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <FaExclamationCircle className="text-xs" />
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black ${
                  formErrors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <p id="email-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number (e.g., +254 700 000 000)" 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black ${
                  formErrors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
                aria-invalid={!!formErrors.phone}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
              />
              {formErrors.phone && (
                <p id="phone-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div>
              <select 
                name="inquiryType"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 bg-white transition-all duration-300 text-sm sm:text-base ${
                  formErrors.inquiryType ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
                aria-label="Inquiry Type"
                aria-invalid={!!formErrors.inquiryType}
                aria-describedby={formErrors.inquiryType ? "inquiryType-error" : undefined}
              >
                <option value="">Select Inquiry Type</option>
                <option value="general">General Inquiry</option>
                <option value="sales">Sales</option>
                <option value="rentals">Rentals</option>
                <option value="investment">Investment Opportunities</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
              {formErrors.inquiryType && (
                <p id="inquiryType-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {formErrors.inquiryType}
                </p>
              )}
            </div>

            <select 
              name="propertyInterest" 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-gray-700 bg-white transition-all duration-300 text-sm sm:text-base" 
              aria-label="Property Interest"
            >
              <option value="">Property Interest (Optional)</option>
              {PROPERTIES.map(property => (
                <option key={property.id} value={property.name}>
                  {property.name}
                </option>
              ))}
            </select>

            <div>
              <textarea 
                name="message"
                placeholder="Tell us about your requirements..." 
                rows={4} 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black ${
                  formErrors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? "message-error" : undefined}
              />
              {formErrors.message && (
                <p id="message-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {formErrors.message}
                </p>
              )}
            </div>

            <button 
              disabled={loading} 
              type="submit" 
              className={`w-full py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                  : 'bg-gold text-black hover:bg-[#bfa14a] hover:text-white hover:scale-105'
              }`}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-lg sm:text-xl" />
                  Sending...
                </>
              ) : (
                <>
                  <FaCheckCircle className="text-lg sm:text-xl text-green-600" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
