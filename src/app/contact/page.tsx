"use client";
import React, { useState, useRef } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";
import { sendContactEmail } from "@/actions/contact-us";
import { PROPERTIES } from "@/lib/properties";

function MapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-fast" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="map-modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-4 relative animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-navy text-2xl font-bold transition"
          onClick={onClose}
          aria-label="Close map modal"
        >
          &times;
        </button>
        <h3 id="map-modal-title" className="text-2xl font-bold text-navy mb-6 text-center">Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8271820880486!2d36.78276647496567!3d-1.27713609871072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOM%20IVY%20RESIDENCE!5e0!3m2!1sen!2ske!4v1758788884873!5m2!1sen!2ske"
          className="w-full h-96 rounded-lg"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Blossom Ivy Residence Map"
        />
      </div>
    </div>
  );
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

export default function ContactPage() {
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const inquiryType = formData.get("inquiryType") as string;
    const message = formData.get("message") as string;

    if (!firstName || firstName.trim().length < 2) errors.firstName = "First name must be at least 2 characters";
    if (!lastName || lastName.trim().length < 2) errors.lastName = "Last name must be at least 2 characters";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";
    if (!phone || !/^[+]?[\d\s()-]{10,}$/.test(phone)) errors.phone = "Please enter a valid phone number";
    if (!inquiryType) errors.inquiryType = "Please select an inquiry type";
    if (!message || message.trim().length < 10) errors.message = "Message must be at least 10 characters";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
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
        formType: "contact", // Specify contact type
      });

      if (res.success) {
        setSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setSuccess(false), 5000);
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
    <div className="bg-gradient-to-b from-[#fcfbf7] via-[#f7f6f2] to-[#fcfbf7] min-h-screen flex flex-col">
      <section className="relative py-20 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/designs/video_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        <div className="relative z-10 text-center text-gold max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg animate-slide-down">Get In Touch</h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-md animate-slide-up">Connect with our luxury real estate experts. We&apos;re here to help you find your dream home.</p>
        </div>
      </section>

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

      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gold/40 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-green-600 mb-8 text-center animate-slide-down">Send Us a Message</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First Name" 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black ${
                    formErrors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                  }`}
                />
                {formErrors.firstName && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><FaExclamationCircle className="text-xs" />{formErrors.firstName}</p>}
              </div>
              <div>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name" 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black ${
                    formErrors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                  }`}
                />
                {formErrors.lastName && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><FaExclamationCircle className="text-xs" />{formErrors.lastName}</p>}
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
              />
              {formErrors.email && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><FaExclamationCircle className="text-xs" />{formErrors.email}</p>}
            </div>

            <div>
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number (e.g., +254 700 000 000)" 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black ${
                  formErrors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
              />
              {formErrors.phone && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><FaExclamationCircle className="text-xs" />{formErrors.phone}</p>}
            </div>

            <div>
              <select 
                name="inquiryType"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 bg-white transition-all duration-300 text-sm sm:text-base ${
                  formErrors.inquiryType ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
              >
                <option value="">Select Inquiry Type</option>
                <option value="general">General Inquiry</option>
                <option value="sales">Sales</option>
                <option value="rentals">Rentals</option>
                <option value="investment">Investment Opportunities</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
              {formErrors.inquiryType && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><FaExclamationCircle className="text-xs" />{formErrors.inquiryType}</p>}
            </div>

            <select 
              name="propertyInterest" 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-gray-700 bg-white transition-all duration-300 text-sm sm:text-base"
            >
              <option value="">Property Interest (Optional)</option>
              {PROPERTIES.map(property => (
                <option key={property.id} value={property.name}>{property.name}</option>
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
              />
              {formErrors.message && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><FaExclamationCircle className="text-xs" />{formErrors.message}</p>}
            </div>

            <button 
              disabled={loading} 
              type="submit" 
              className={`w-full py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                loading ? 'bg-gray-400 cursor-not-allowed text-gray-700' : 'bg-gold text-black hover:bg-[#bfa14a] hover:text-white hover:scale-105'
              }`}
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

      <section className="py-16 px-4 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-green-600 mb-12 animate-fade-in">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between">
            <div>
              <FaMapMarkerAlt className="text-2xl sm:text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-2">Visit Us</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">Gatundu Road, Kileleshwa, Nairobi</p>
            </div>
            <button onClick={() => setMapModalOpen(true)} className="bg-gold text-black px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 mt-4">
              View Map
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between" style={{ animationDelay: '0.2s' }}>
            <div>
              <FaPhoneAlt className="text-2xl sm:text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-2">Call Us</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">+254 799 008 564</p>
            </div>
            <a href="tel:+254799008564" className="bg-gold text-black px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 inline-block mt-4">
              Call Now
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.4s' }}>
            <div>
              <FaEnvelope className="text-2xl sm:text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-2">Email Us</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">sales@rsunproperty.net</p>
            </div>
            <a href="mailto:sales@rsunproperty.net" className="bg-gold text-black px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 inline-block mt-4">
              Send Email
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gold/40 animate-fade-in">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-4 flex items-center gap-2">
              <FaClock className="text-xl sm:text-2xl" /> Business Hours
            </h3>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-semibold">9:00 AM - 5:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold">Closed</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gold/40 animate-fade-in">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-4">Follow Us</h3>
            <div className="flex gap-4 text-xl sm:text-2xl">
              <a href="https://www.tiktok.com/@theivygroup.ke" target="_blank" rel="noopener noreferrer" className="text-[#39591c] hover:text-[#2e4717] transition-colors hover:scale-110 transition-transform" aria-label="Follow us on TikTok"><FaTiktok /></a>
              <a href="https://www.facebook.com/profile.php?id=61577046309467" target="_blank" rel="noopener noreferrer" className="text-[#39591c] hover:text-[#2e4717] transition-colors hover:scale-110 transition-transform" aria-label="Follow us on Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/theivygroup_ke/" target="_blank" rel="noopener noreferrer" className="text-[#39591c] hover:text-[#2e4717] transition-colors hover:scale-110 transition-transform" aria-label="Follow us on Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-8 right-8 flex items-center z-50 group">
        <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 mr-3 bg-[#25D366] text-white font-semibold px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-base pointer-events-none select-none">
          WhatsApp Us!
        </div>
        <a href="https://wa.me/254797236333" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] rounded-full p-4 shadow-lg hover:scale-110 transition" aria-label="Contact us on WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32" height="32">
            <path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.7 0-3.36-.33-4.92-.98l-.35-.15-3.67.96.98-3.58-.18-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.65 0 5.15 1.03 7.03 2.9A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
          </svg>
        </a>
      </div>

      <MapModal open={mapModalOpen} onClose={() => setMapModalOpen(false)} />
    </div>
  );
}