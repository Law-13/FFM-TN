import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Calendar, Trophy, UploadCloud, Info, Check, 
  ChevronRight, ChevronLeft, ArrowRight, ShieldCheck, 
  Trash2, FileText, CheckCircle2, AlertTriangle, Eye, Globe
} from 'lucide-react';
import Toast from '../components/Toast';

export default function EventRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Custom Country Code list
  const countries = [
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+9ae', name: 'UAE', flag: '🇦🇪' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' }
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    organizationName: '',
    email: '',
    whatsappNumber: '',
    youtubeLink: '',
    instagramLink: '',
    eventName: '',
    eventType: 'Classic Battle Royale',
    tournamentDate: '',
    entryFee: '',
    prizePool: '',
    expectedParticipants: '',
    notes: '',
    prevTournamentName: '',
    prevPrizePool: '',
    prevStreamLink: ''
  });

  // Uploaded files states
  const [files, setFiles] = useState({
    poster: null,
    banner: null,
    rulesPdf: null,
    prevPoster: null
  });

  const [previews, setPreviews] = useState({
    poster: '',
    banner: '',
    rulesPdf: '',
    prevPoster: ''
  });

  const [progress, setProgress] = useState({
    poster: 0,
    banner: 0,
    rulesPdf: 0,
    prevPoster: 0
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Validate fields in a specific step
  const validateStep = (step) => {
    const stepErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) stepErrors.fullName = 'Full Name is required.';
      
      // Real-time phone check
      const phoneRegex = /^[0-9]+$/;
      if (!formData.contactNumber) {
        stepErrors.contactNumber = 'Contact Number is required.';
      } else if (!phoneRegex.test(formData.contactNumber)) {
        stepErrors.contactNumber = 'Please input digits only (exclude symbols).';
      } else if (formData.contactNumber.length < 8 || formData.contactNumber.length > 12) {
        stepErrors.contactNumber = 'Enter a valid phone number length (8-12 digits).';
      }

      if (!formData.organizationName.trim()) stepErrors.organizationName = 'Organization/Channel is required.';
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        stepErrors.email = 'Email Address is required.';
      } else if (!emailRegex.test(formData.email)) {
        stepErrors.email = 'Please provide a valid email structure.';
      }

      if (!formData.whatsappNumber) {
        stepErrors.whatsappNumber = 'WhatsApp Number is required.';
      } else if (!phoneRegex.test(formData.whatsappNumber)) {
        stepErrors.whatsappNumber = 'Please input digits only.';
      }

      const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      if (!formData.youtubeLink) {
        stepErrors.youtubeLink = 'YouTube Channel Link is required.';
      } else if (!ytRegex.test(formData.youtubeLink)) {
        stepErrors.youtubeLink = 'Enter a valid YouTube URL (e.g. youtube.com/c/YourChannel).';
      }
    }

    if (step === 2) {
      if (!formData.eventName.trim()) stepErrors.eventName = 'Event Name is required.';
      if (!formData.tournamentDate) stepErrors.tournamentDate = 'Tournament Date is required.';
      if (!formData.entryFee.trim()) stepErrors.entryFee = 'Entry Fee is required (E.g. Free or ₹50).';
      if (!formData.prizePool.trim()) stepErrors.prizePool = 'Prize Pool is required.';
      if (!formData.expectedParticipants.trim()) stepErrors.expectedParticipants = 'Expected Participants count is required.';
      
      if (!files.poster) stepErrors.poster = 'Event Poster is required.';
      if (!files.banner) stepErrors.banner = 'Event Banner is required.';
      if (!files.rulesPdf) stepErrors.rulesPdf = 'Rules PDF is required.';
    }

    if (step === 3) {
      if (!formData.prevTournamentName.trim()) stepErrors.prevTournamentName = 'Previous Tournament Name is required.';
      if (!formData.prevPrizePool.trim()) stepErrors.prevPrizePool = 'Previous Prize Pool is required.';
      if (!files.prevPoster) stepErrors.prevPoster = 'Previous Tournament Poster is required.';
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Strict typing: restrict phone/whatsapp to digits only
    if (name === 'contactNumber' || name === 'whatsappNumber') {
      const cleanValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simulated progressive upload state for better UI responsiveness
  const simulateProgress = (fieldName) => {
    setProgress((prev) => ({ ...prev, [fieldName]: 10 }));
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev[fieldName] >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [fieldName]: prev[fieldName] + 20 };
      });
    }, 100);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const processFile = (file, fieldName) => {
    if (!file) return;

    const imgRegex = /\.(jpe?g|png|webp)$/i;
    const pdfRegex = /\.pdf$/i;

    if (fieldName === 'rulesPdf') {
      if (!pdfRegex.test(file.name) && file.type !== 'application/pdf') {
        setErrorMsg('Rules Upload only accepts PDF format.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('PDF files must be smaller than 10MB.');
        return;
      }
    } else {
      if (!imgRegex.test(file.name) && !file.type.match('image.*')) {
        setErrorMsg('Upload formats allowed: JPG, PNG, WEBP.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Image files must be smaller than 5MB.');
        return;
      }
    }

    setErrorMsg('');
    setFiles((prev) => ({ ...prev, [fieldName]: file }));
    simulateProgress(fieldName);

    if (fieldName !== 'rulesPdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => ({ ...prev, [fieldName]: e.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => ({ ...prev, [fieldName]: file.name }));
    }
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processFile(file, fieldName);
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    processFile(file, fieldName);
  };

  const removeFile = (fieldName) => {
    setFiles((prev) => ({ ...prev, [fieldName]: null }));
    setPreviews((prev) => ({ ...prev, [fieldName]: '' }));
    setProgress((prev) => ({ ...prev, [fieldName]: 0 }));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const submitData = new FormData();
    
    // Append input fields
    Object.keys(formData).forEach((key) => {
      if (key === 'contactNumber') {
        // combine selected country code and phone number
        submitData.append('contactNumber', `${selectedCountry.code} ${formData.contactNumber}`);
      } else {
        submitData.append(key, formData[key]);
      }
    });

    // Append binary files
    submitData.append('poster', files.poster);
    submitData.append('banner', files.banner);
    submitData.append('rulesPdf', files.rulesPdf);
    submitData.append('prevPoster', files.prevPoster);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/event/register`, {
        method: 'POST',
        body: submitData
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccess(true);
        setSuccessMsg(resData.message || 'Submission under review.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMsg(resData.message || 'Submission failed. Please check inputs.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to establish server connection. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const renderProgressIndicator = () => {
    const steps = [
      { num: 1, name: 'Organizer Details' },
      { num: 2, name: 'Event Specifications' },
      { num: 3, name: 'Credibility Checks' }
    ];

    return (
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-900 z-0 -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-esports-cyan to-esports-orange z-0 -translate-y-1/2 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />

          {steps.map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm border-2 transition-all ${
                  currentStep >= s.num
                    ? 'bg-slate-950 border-esports-cyan text-esports-cyan shadow-cyan-glow'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                {currentStep > s.num ? <Check size={16} /> : s.num}
              </div>
              <span className={`text-[10px] sm:text-xs uppercase tracking-wider font-semibold mt-2.5 transition-colors ${
                currentStep >= s.num ? 'text-slate-200' : 'text-slate-500'
              }`}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCountryDropdown = () => (
    <div className="absolute left-0 top-full mt-1.5 w-48 bg-slate-950 border border-white/10 rounded-xl shadow-2xl z-20 max-h-56 overflow-y-auto">
      {countries.map((c) => (
        <button
          key={c.code}
          type="button"
          onClick={() => {
            setSelectedCountry(c);
            setShowCountryDropdown(false);
          }}
          className="w-full flex items-center space-x-3 px-4 py-2.5 text-left text-xs sm:text-sm hover:bg-slate-900 text-slate-200 hover:text-white"
        >
          <span>{c.flag}</span>
          <span className="font-semibold">{c.code}</span>
          <span className="text-slate-400 text-[11px]">({c.name})</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Toast Alert Notifications */}
      <AnimatePresence>
        {errorMsg && (
          <Toast message={errorMsg} type="error" onClose={() => setErrorMsg('')} />
        )}
      </AnimatePresence>

      {/* Header */}
      {!success && (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-esports-card border border-esports-cyan/25 text-xs text-esports-cyan tracking-wider font-semibold uppercase">
            <Trophy size={12} className="animate-pulse" />
            <span>Onboarding Portal</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            REGISTER YOUR <span className="text-esports-cyan">EVENT</span>
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
            Launch your Free Fire Max league. Enter details below to submit your event for community review, verification, & promo allocation.
          </p>
        </div>
      )}

      {/* Steps Indicator */}
      {!success && renderProgressIndicator()}

      {/* Success Review Screen */}
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-glow p-8 sm:p-12 rounded-3xl border-2 border-green-500/25 bg-green-500/5 text-center max-w-2xl mx-auto space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500" />
            
            <div className="inline-flex p-4 rounded-full bg-slate-900 border border-green-500/30 text-green-400">
              <CheckCircle2 size={48} className="animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100 uppercase tracking-wide">
                SUBMISSION RECEIVED
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Your event registration and organization credentials have been logged successfully!
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
              📝 <span className="text-slate-200 font-semibold">Your submission is under review by FFM Community TN.</span> Our review moderators will check the previous tournament files and channel credibility. Verification approval or feedback is dispatched within 24-48 hours.
            </div>

            <div className="pt-2">
              <a
                href="/"
                className="inline-flex items-center space-x-2 py-3 px-6 rounded-xl bg-green-500 hover:bg-green-600 text-slate-950 font-bold uppercase tracking-wider text-xs transition-colors"
              >
                <span>Return to Home</span>
              </a>
            </div>
          </motion.div>
        ) : (
          /* Wizard steps */
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-esports-cyan to-esports-orange" />
            
            {/* Step 1: Organizer Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h2 className="font-display font-extrabold text-slate-100 uppercase tracking-wider text-lg sm:text-xl flex items-center space-x-3">
                    <User className="text-esports-cyan" size={20} />
                    <span>Step 1: Organizer Credentials</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Provide your verified channels and official communications setup.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="E.g. Akash Kumar"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px] font-semibold">{errors.fullName}</p>}
                  </div>

                  {/* Compulsory Contact Number with custom Country Code selector */}
                  <div className="space-y-1.5 relative">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Contact Number *</label>
                    <div className="flex relative">
                      {/* Dropdown Toggle */}
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center space-x-1 px-3 bg-slate-900 border border-r-0 border-white/10 hover:border-slate-800 rounded-l-xl text-xs sm:text-sm text-slate-200 cursor-pointer"
                      >
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <ChevronRight size={10} className="rotate-90 text-slate-400" />
                      </button>

                      {showCountryDropdown && renderCountryDropdown()}

                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className={`w-full px-4 py-3 bg-slate-900 border ${errors.contactNumber ? 'border-red-500' : 'border-white/10'} rounded-r-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Your contact number will only be used for event verification and official communication.
                    </p>
                    {errors.contactNumber && <p className="text-red-500 text-[10px] font-semibold">{errors.contactNumber}</p>}
                  </div>

                  {/* Organization / Channel Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Organization / Channel Name *</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      placeholder="E.g. FFM Tamil Esports"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.organizationName ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.organizationName && <p className="text-red-500 text-[10px] font-semibold">{errors.organizationName}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="organizer@gmail.com"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] font-semibold">{errors.email}</p>}
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">WhatsApp Number *</label>
                    <input
                      type="text"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      placeholder="Digits only (e.g. 9876543210)"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.whatsappNumber ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.whatsappNumber && <p className="text-red-500 text-[10px] font-semibold">{errors.whatsappNumber}</p>}
                  </div>

                  {/* YouTube Channel Link */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">YouTube Channel Link *</label>
                    <input
                      type="text"
                      name="youtubeLink"
                      value={formData.youtubeLink}
                      onChange={handleInputChange}
                      placeholder="youtube.com/c/YourChannel"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.youtubeLink ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.youtubeLink && <p className="text-red-500 text-[10px] font-semibold">{errors.youtubeLink}</p>}
                  </div>

                  {/* Optional: Instagram Link */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Instagram Link (Optional)</label>
                    <input
                      type="text"
                      name="instagramLink"
                      value={formData.instagramLink}
                      onChange={handleInputChange}
                      placeholder="instagram.com/YourProfile"
                      className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Event Details & Uploads */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h2 className="font-display font-extrabold text-slate-100 uppercase tracking-wider text-lg sm:text-xl flex items-center space-x-3">
                    <Calendar className="text-esports-cyan" size={20} />
                    <span>Step 2: Event Specifications & Uploads</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Specify prize pools, schedules, and drop your official materials.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Event Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Event Name *</label>
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleInputChange}
                      placeholder="E.g. Tamil Nadu Clash Cup"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.eventName ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.eventName && <p className="text-red-500 text-[10px] font-semibold">{errors.eventName}</p>}
                  </div>

                  {/* Event Type Select */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Event Type *</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 text-sm cursor-pointer"
                    >
                      <option value="Classic Battle Royale">Classic Battle Royale</option>
                      <option value="Clash Squad Tournament">Clash Squad Tournament</option>
                      <option value="Custom Guild War">Custom Guild War</option>
                      <option value="Scrims League">Scrims League</option>
                    </select>
                  </div>

                  {/* Tournament Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Tournament Date *</label>
                    <input
                      type="date"
                      name="tournamentDate"
                      value={formData.tournamentDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.tournamentDate ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 text-sm cursor-pointer`}
                    />
                    {errors.tournamentDate && <p className="text-red-500 text-[10px] font-semibold">{errors.tournamentDate}</p>}
                  </div>

                  {/* Entry Fee */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Entry Fee *</label>
                    <input
                      type="text"
                      name="entryFee"
                      value={formData.entryFee}
                      onChange={handleInputChange}
                      placeholder="E.g. Free or ₹100 / Team"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.entryFee ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.entryFee && <p className="text-red-500 text-[10px] font-semibold">{errors.entryFee}</p>}
                  </div>

                  {/* Prize Pool */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Prize Pool (₹) *</label>
                    <input
                      type="text"
                      name="prizePool"
                      value={formData.prizePool}
                      onChange={handleInputChange}
                      placeholder="E.g. ₹5,000"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.prizePool ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.prizePool && <p className="text-red-500 text-[10px] font-semibold">{errors.prizePool}</p>}
                  </div>

                  {/* Expected Participants */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Expected Participants *</label>
                    <input
                      type="text"
                      name="expectedParticipants"
                      value={formData.expectedParticipants}
                      onChange={handleInputChange}
                      placeholder="E.g. 48 Teams / 200 Players"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.expectedParticipants ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.expectedParticipants && <p className="text-red-500 text-[10px] font-semibold">{errors.expectedParticipants}</p>}
                  </div>
                </div>

                {/* Optional Additional Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Enter any sponsor detail, server requirements, special schedules..."
                    className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm resize-none"
                  />
                </div>

                {/* Multi drag & drop file uploads */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                  {/* Event Poster Upload */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300 block">Event Poster *</label>
                    
                    {previews.poster ? (
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 group h-40">
                        <img src={previews.poster} alt="Poster preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                          <button
                            type="button"
                            onClick={() => removeFile('poster')}
                            className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'poster')}
                        className={`h-40 rounded-2xl border-2 border-dashed ${
                          errors.poster ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800 bg-slate-900/40 hover:border-esports-cyan/40'
                        } flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all relative group`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'poster')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <UploadCloud size={28} className="text-slate-400 group-hover:text-esports-cyan transition-colors" />
                        <span className="text-[11px] font-semibold text-slate-300 mt-2">Drag or Browse Image</span>
                        <span className="text-[9px] text-slate-500 mt-1">JPG, PNG, WEBP (Max 5MB)</span>
                      </div>
                    )}
                    {errors.poster && <p className="text-red-500 text-[10px] font-semibold">{errors.poster}</p>}
                  </div>

                  {/* Event Banner Upload */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300 block">Event Banner *</label>
                    
                    {previews.banner ? (
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 group h-40">
                        <img src={previews.banner} alt="Banner preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                          <button
                            type="button"
                            onClick={() => removeFile('banner')}
                            className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'banner')}
                        className={`h-40 rounded-2xl border-2 border-dashed ${
                          errors.banner ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800 bg-slate-900/40 hover:border-esports-cyan/40'
                        } flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all relative group`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'banner')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <UploadCloud size={28} className="text-slate-400 group-hover:text-esports-cyan transition-colors" />
                        <span className="text-[11px] font-semibold text-slate-300 mt-2">Drag or Browse Image</span>
                        <span className="text-[9px] text-slate-500 mt-1">JPG, PNG, WEBP (Max 5MB)</span>
                      </div>
                    )}
                    {errors.banner && <p className="text-red-500 text-[10px] font-semibold">{errors.banner}</p>}
                  </div>

                  {/* Rules PDF Upload */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300 block">Rules PDF *</label>
                    
                    {previews.rulesPdf ? (
                      <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-4 h-40 flex flex-col items-center justify-center text-center group">
                        <FileText size={32} className="text-esports-orange animate-pulse" />
                        <span className="text-[10px] text-slate-300 font-semibold truncate max-w-full mt-2">
                          {previews.rulesPdf}
                        </span>
                        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeFile('rulesPdf')}
                            className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'rulesPdf')}
                        className={`h-40 rounded-2xl border-2 border-dashed ${
                          errors.rulesPdf ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800 bg-slate-900/40 hover:border-esports-cyan/40'
                        } flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all relative group`}
                      >
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'rulesPdf')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <UploadCloud size={28} className="text-slate-400 group-hover:text-esports-cyan transition-colors" />
                        <span className="text-[11px] font-semibold text-slate-300 mt-2">Drag or Browse PDF</span>
                        <span className="text-[9px] text-slate-500 mt-1">PDF Document only (Max 10MB)</span>
                      </div>
                    )}
                    {errors.rulesPdf && <p className="text-red-500 text-[10px] font-semibold">{errors.rulesPdf}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Credibility / Previous Tournament */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h2 className="font-display font-extrabold text-slate-100 uppercase tracking-wider text-lg sm:text-xl flex items-center space-x-3">
                    <ShieldCheck className="text-esports-orange" size={20} />
                    <span>Step 3: Organizer Credibility & Experience</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Help us verify your authenticity by showcasing previous tournament details.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Previous Tournament Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Previous Tournament Name *</label>
                    <input
                      type="text"
                      name="prevTournamentName"
                      value={formData.prevTournamentName}
                      onChange={handleInputChange}
                      placeholder="E.g. Tamil Nadu Ultimate Cup Season 1"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.prevTournamentName ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.prevTournamentName && <p className="text-red-500 text-[10px] font-semibold">{errors.prevTournamentName}</p>}
                  </div>

                  {/* Previous Tournament Prize Pool */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Previous Prize Pool *</label>
                    <input
                      type="text"
                      name="prevPrizePool"
                      value={formData.prevPrizePool}
                      onChange={handleInputChange}
                      placeholder="E.g. ₹10,000"
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.prevPrizePool ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm`}
                    />
                    {errors.prevPrizePool && <p className="text-red-500 text-[10px] font-semibold">{errors.prevPrizePool}</p>}
                  </div>

                  {/* Optional: Stream Link */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">YouTube Stream Link (Optional)</label>
                    <input
                      type="text"
                      name="prevStreamLink"
                      value={formData.prevStreamLink}
                      onChange={handleInputChange}
                      placeholder="https://youtube.com/watch?v=ExampleStream"
                      className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm"
                    />
                  </div>
                </div>

                {/* Drag and Drop Previous Poster */}
                <div className="space-y-2 max-w-sm">
                  <label className="text-xs uppercase tracking-wider font-semibold text-slate-300 block">Previous Tournament Poster *</label>
                  
                  {previews.prevPoster ? (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 group h-40">
                      <img src={previews.prevPoster} alt="Previous poster preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                        <button
                          type="button"
                          onClick={() => removeFile('prevPoster')}
                          className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'prevPoster')}
                      className={`h-40 rounded-2xl border-2 border-dashed ${
                        errors.prevPoster ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800 bg-slate-900/40 hover:border-esports-cyan/40'
                      } flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all relative group`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'prevPoster')}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <UploadCloud size={28} className="text-slate-400 group-hover:text-esports-cyan transition-colors" />
                      <span className="text-[11px] font-semibold text-slate-300 mt-2">Drag or Browse Image</span>
                      <span className="text-[9px] text-slate-500 mt-1">JPG, PNG, WEBP (Max 5MB)</span>
                    </div>
                  )}
                  {errors.prevPoster && <p className="text-red-500 text-[10px] font-semibold">{errors.prevPoster}</p>}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center space-x-1.5 py-3 px-5 rounded-xl bg-slate-900 border border-white/10 hover:border-slate-800 text-slate-300 font-semibold uppercase text-xs cursor-pointer transition-all"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 py-3 px-6 rounded-xl bg-gradient-to-r from-esports-cyan to-esports-cyan/80 text-slate-950 font-bold uppercase text-xs cursor-pointer shadow-lg transition-all"
                >
                  <span>Next Step</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center space-x-1.5 py-3.5 px-7 rounded-xl bg-gradient-to-r from-esports-orange to-amber-500 text-white font-bold uppercase text-xs cursor-pointer shadow-lg hover:shadow-orange-glow transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Event Registration</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
