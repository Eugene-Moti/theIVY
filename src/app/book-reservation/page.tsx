"use client";
import { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCheckCircle, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import Image from "next/image";
import { PROPERTIES } from "@/lib/properties";
import { sendContactEmail } from "@/actions/contact-us";

function MapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-fast" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-4 relative animate-slide-up" onClick={e => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-gray-400 hover:text-navy text-2xl font-bold transition" onClick={onClose} aria-label="Close">&times;</button>
        <h3 className="text-2xl font-bold text-navy mb-6 text-center">Our Location</h3>
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
  project?: string;
  date?: string;
  message?: string;
}

export default function BookReservation() {
  const [selectedProject, setSelectedProject] = useState("");
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const project = formData.get("project") as string;
    const date = formData.get("date") as string;

    if (!firstName || firstName.trim().length < 2) errors.firstName = "First name must be at least 2 characters";
    if (!lastName || lastName.trim().length < 2) errors.lastName = "Last name must be at least 2 characters";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";
    if (!phone || !/^[+]?[\d\s()-]{10,}$/.test(phone)) errors.phone = "Please enter a valid phone number";
    if (!project) errors.project = "Please select a project";
    if (!date) errors.date = "Please select a date";
    if (date && new Date(date) < new Date()) errors.date = "Date must be in the future";

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
        inquiryType: "reservation",
        propertyInterest: formData.get("project") as string,
        message: `Reservation Date: ${formData.get("date")}\n\nAdditional Requests: ${formData.get("message") || "None"}`,
        formType: "reservation", // Specify reservation type
      });

      if (res.success) {
        setSuccess(true);
        formRef.current?.reset();
        setSelectedProject("");
        setTimeout(() => setSuccess(false), 5000);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(res.error || "Failed to book reservation. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProject && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedProject]);

  return (
    <div className="bg-gradient-to-b from-[#fcfbf7] via-[#f7f6f2] to-[#fcfbf7] min-h-screen flex flex-col">
      <section className="relative py-20 overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src="/designs/video_bg.mp4" autoPlay loop muted playsInline />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        <div className="relative z-10 text-center text-gold max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg animate-slide-down">Book a Private Viewing</h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-md animate-slide-up">Experience our luxury properties in person. Schedule a private tour with our expert team and discover your next home.</p>
        </div>
      </section>

      {(success || error) && (
        <div className="max-w-4xl mx-auto w-full px-4 mt-8">
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-fade-in" role="alert">
              <FaCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">Reservation Booked Successfully!</h3>
                <p className="text-green-700 text-sm mt-1">We&apos;ll contact you shortly to confirm your viewing appointment.</p>
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

      <section className="py-16 px-4 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl text-green-600 font-serif font-bold text-center mb-12 animate-fade-in">Choose Your Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPERTIES.map((project, index) => (
            <div
              key={project.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${selectedProject === project.id ? 'border-gold shadow-gold' : 'border-gray-200'} animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="relative h-48">
                <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-300 hover:scale-110" />
                {selectedProject === project.id && (
                  <div className="absolute top-4 right-4 bg-gold text-black rounded-full p-2 animate-bounce">
                    <FaCheckCircle className="text-lg" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-green-600 mb-2">{project.name}</h3>
                <p className="text-black font-semibold mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt /> {project.location}
                </p>
                <p className="text-gray-700 text-sm font-semibold leading-relaxed mb-4">{project.description}</p>
                <button
                  onClick={() => setSelectedProject(project.id)}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    selectedProject === project.id ? 'bg-green-600 text-white' : 'bg-gold text-black hover:bg-[#bfa14a] hover:text-white'
                  }`}
                >
                  {selectedProject === project.id ? 'Selected' : 'Select Project'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gold/40 animate-fade-in">
          <h2 className="text-3xl font-serif font-bold text-green-600 mb-8 text-center animate-slide-down">Reservation Details</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 ${
                    formErrors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                  }`}
                />
                {formErrors.firstName && <p className="text-red-600 text-sm mt-1">{formErrors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 ${
                    formErrors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                  }`}
                />
                {formErrors.lastName && <p className="text-red-600 text-sm mt-1">{formErrors.lastName}</p>}
              </div>
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 ${
                  formErrors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
              />
              {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 bg-white transition-all duration-300 ${
                  formErrors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
              />
              {formErrors.phone && <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>}
            </div>

            <div>
              <select
                name="project"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 bg-white transition-all duration-300 ${
                  formErrors.project ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select Project</option>
                {PROPERTIES.map((project) => (
                  <option key={project.id} value={project.id}>{project.name} - {project.location}</option>
                ))}
              </select>
              {formErrors.project && <p className="text-red-600 text-sm mt-1">{formErrors.project}</p>}
            </div>

            <div>
              <input
                type="date"
                name="date"
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 bg-white transition-all duration-300 ${
                  formErrors.date ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-gold'
                }`}
              />
              {formErrors.date && <p className="text-red-600 text-sm mt-1">{formErrors.date}</p>}
            </div>

            <textarea
              name="message"
              placeholder="Additional Requests (optional)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300"
            />

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                loading ? 'bg-gray-400 cursor-not-allowed text-gray-700' : 'bg-gold text-black hover:bg-[#bfa14a] hover:text-white hover:scale-105'
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  Booking...
                </>
              ) : (
                <>
                  <FaCheckCircle className="text-xl text-green-600" />
                  Book Reservation
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-serif font-bold text-center text-green-600 mb-12 animate-fade-in">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between">
            <div>
              <FaMapMarkerAlt className="text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-serif font-bold text-black mb-2">Visit Us</h3>
              <p className="text-gray-700 leading-relaxed">Gatundu Road, Kileleshwa</p>
            </div>
            <button onClick={() => setMapModalOpen(true)} className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 mt-4">
              View Map
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between" style={{ animationDelay: '0.2s' }}>
            <div>
              <FaPhoneAlt className="text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-serif font-bold text-black mb-2">Call Us</h3>
              <p className="text-gray-700 leading-relaxed">+254 799 008 564</p>
            </div>
            <a href="tel:+254799008564" className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 inline-block mt-4">
              Call Now
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between" style={{ animationDelay: '0.4s' }}>
            <div>
              <FaEnvelope className="text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-serif font-bold text-black mb-2">Email Us</h3>
              <p className="text-gray-700 leading-relaxed">sales@rsunproperty.net</p>
            </div>
            <a href="mailto:sales@rsunproperty.net" className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 inline-block mt-4">
              Send Email
            </a>
          </div>
        </div>
      </section>

      <MapModal open={mapModalOpen} onClose={() => setMapModalOpen(false)} />
    </div>
  );
}