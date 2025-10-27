"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../../components/Header';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tourType: '',
    travelers: '2',
    duration: '7',
    budget: 'medium',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const tourTypes = [
    {
      id: 'cultural',
      title: 'Cultural Discovery',
      description: 'Historic cities, local traditions, and authentic experiences',
      image: '/web-images/tour/dia 2/IMG_3582.JPG',
      price: 'From €2,500'
    },
    {
      id: 'nature',
      title: 'Natural Landscapes',
      description: 'Mountains, coastlines, and breathtaking scenery',
      image: '/web-images/tour/dia 2/IMG_3597.JPG',
      price: 'From €1,800'
    },
    {
      id: 'gastronomic',
      title: 'Culinary Journey',
      description: 'Wine tasting, cooking classes, and local cuisine',
      image: '/web-images/comida/DSC_0014.JPG',
      price: 'From €2,200'
    },
    {
      id: 'coastal',
      title: 'Coastal Adventure',
      description: 'Beaches, boat trips, and seaside experiences',
      image: '/web-images/tour/dia 2/IMG_3653.JPG',
      price: 'From €2,800'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your backend
    setStep(5); // Success step
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        {/* Progress Bar */}
        <div className="bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      step > stepNum ? 'bg-black' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tour Type</span>
              <span>Details</span>
              <span>Personal Info</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Step 1: Tour Type Selection */}
          {step === 1 && (
            <div>
              <h1 className="text-4xl font-light text-center mb-12">Choose Your Journey</h1>
              <div className="grid md:grid-cols-2 gap-8">
                {tourTypes.map((tour) => (
                  <div
                    key={tour.id}
                    onClick={() => handleInputChange('tourType', tour.id)}
                    className={`relative cursor-pointer group transition-all duration-300 ${
                      formData.tourType === tour.id
                        ? 'ring-2 ring-black shadow-lg'
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div className="relative h-64 overflow-hidden rounded-lg">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-light mb-1">{tour.title}</h3>
                        <p className="text-white/90 text-sm mb-2">{tour.description}</p>
                        <p className="text-white font-medium">{tour.price}</p>
                      </div>
                      {formData.tourType === tour.id && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Trip Details */}
          {step === 2 && (
            <div>
              <h1 className="text-4xl font-light text-center mb-12">Trip Details</h1>
              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <label className="block text-lg font-light mb-4">Number of Travelers</label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => handleInputChange('travelers', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num.toString()}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-light mb-4">Preferred Duration</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="5">5 days</option>
                    <option value="7">7 days</option>
                    <option value="10">10 days</option>
                    <option value="14">14 days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-light mb-4">Budget Range</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'budget', label: 'Budget (€1,500-2,500)', desc: 'Essential experiences' },
                      { value: 'medium', label: 'Comfort (€2,500-4,000)', desc: 'Quality accommodations' },
                      { value: 'luxury', label: 'Luxury (€4,000+)', desc: 'Premium experiences' }
                    ].map((budget) => (
                      <div
                        key={budget.value}
                        onClick={() => handleInputChange('budget', budget.value)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.budget === budget.value
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium text-sm">{budget.label}</div>
                        <div className={`text-xs mt-1 ${
                          formData.budget === budget.value ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {budget.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personal Information */}
          {step === 3 && (
            <div>
              <h1 className="text-4xl font-light text-center mb-12">Personal Information</h1>
              <form className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-lg font-light mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-light mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-light mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-lg font-light mb-2">Special Requests or Preferences</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Any dietary restrictions, accessibility needs, or specific interests..."
                  />
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div>
              <h1 className="text-4xl font-light text-center mb-12">Review Your Request</h1>
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-light mb-4">Trip Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tour Type:</span>
                      <span className="font-medium">
                        {tourTypes.find(t => t.id === formData.tourType)?.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travelers:</span>
                      <span className="font-medium">{formData.travelers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{formData.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-medium capitalize">{formData.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-light mb-4">Contact Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    {formData.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{formData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    By submitting this request, you'll receive a personalized quote within 24 hours
                    and join our exclusive community of travelers.
                  </p>
                  <button
                    onClick={handleSubmit}
                    className="bg-black text-white px-12 py-4 text-lg font-light hover:bg-gray-800 transition-colors duration-300 rounded-lg"
                  >
                    Request My Free Quote
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl font-light mb-6">Request Submitted!</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for your interest in an authentic Iberian journey. Your personalized quote
                is being prepared and will be sent to <strong>{formData.email}</strong> within 24 hours.
              </p>
              <div className="space-y-4">
                <p className="text-gray-500">
                  In the meantime, you'll receive our weekly newsletter with travel inspiration
                  and exclusive offers for our community members.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-black text-white px-8 py-3 font-light hover:bg-gray-800 transition-colors duration-300 rounded-lg"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex justify-between mt-12">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`px-8 py-3 font-light rounded-lg transition-colors ${
                  step === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.tourType) ||
                  (step === 2 && (!formData.travelers || !formData.duration || !formData.budget)) ||
                  (step === 3 && (!formData.name || !formData.email))
                }
                className="bg-black text-white px-8 py-3 font-light hover:bg-gray-800 transition-colors duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 4 ? 'Submit Request' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}