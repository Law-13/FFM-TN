import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Upload, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  DollarSign, 
  Users, 
  Youtube, 
  Instagram, 
  Paperclip, 
  X, 
  Loader2,
  Lock,
  Globe
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const countries = [
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
];

export default function EventRegistration() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form text fields state
  const [formData, setFormData] = useState({
    // Step 1: Organizer Details
    fullName: '',
    countryCode: '+91',
    phoneBody: '',
    contactNumber: '', // will be compiled as countryCode + phoneBody
    orgChannelName: '',
    emailAddress: '',
    whatsAppNumber: '',
    youtubeLink: '',
    instagramLink: '',
    
    // Step 2: Event Details
    eventName: '',
    eventType: 'Squad',
    tournamentDate: '',
    entryFee: '',
    prizePool: '',
    expectedParticipants: '',
    additionalNotes: '',

    // Step 3: Credibility Section
    prevTournamentName: '',
    prevPrizePool: '',
    prevStreamLink: '',
  });

  // Form files state
  const [files, setFiles] = useState({
    eventPoster: null,
    eventBanner: null,
    rulesPdf: null,
    prevTournamentPoster: null
  });

  // Progress animation states for files
  const [uploadProgress, setUploadProgress] = useState({
    eventPoster: 0,
    eventBanner: 0,
    rulesPdf: 0,
    prevTournamentPoster: 0
  });

  const [errors, setErrors] = useState({});
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  // File Input References
  const posterRef = useRef(null);
  const bannerRef = useRef(null);
  const pdfRef = useRef(null);
  const prevPosterRef = useRef(null);

  // Validate current step fields
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.phoneBody.trim()) {
        newErrors.phoneBody = 'Contact number is required';
      } else {
        const fullPhone = formData.countryCode + formData.phoneBody.replace(/[\s-]/g, '');
        const phoneRegex = /^\+[1-9]\d{6,14}$/; // Valid E.164 phone check
        if (!phoneRegex.test(fullPhone)) {
          newErrors.phoneBody = 'Invalid contact number. Provide a valid mobile number.';
        }
      }
      if (!formData.orgChannelName.trim()) newErrors.orgChannelName = 'Organization/Channel Name is required';
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.emailAddress.trim()) {
        newErrors.emailAddress = 'Email address is required';
      } else if (!emailRegex.test(formData.emailAddress)) {
        newErrors.emailAddress = 'Invalid email address format';
      }
      
      if (!formData.whatsAppNumber.trim()) {
        newErrors.whatsAppNumber = 'WhatsApp number is required';
      }
      if (!formData.youtubeLink.trim()) {
        newErrors.youtubeLink = 'YouTube channel link is required';
      } else if (!formData.youtubeLink.includes('youtube.com') && !formData.youtubeLink.includes('youtu.be')) {
        newErrors.youtubeLink = 'Must be a valid YouTube link';
      }
    }

    if (step === 2) {
      if (!formData.eventName.trim()) newErrors.eventName = 'Event Name is required';
      if (!formData.tournamentDate) newErrors.tournamentDate = 'Tournament Date is required';
      if (!formData.entryFee.trim()) newErrors.entryFee = 'Entry Fee is required (Write Free if none)';
      if (!formData.prizePool.trim()) newErrors.prizePool = 'Prize Pool is required';
      if (!formData.expectedParticipants.trim()) newErrors.expectedParticipants = 'Expected participants count is required';
    }

    if (step === 3) {
      // Credibility fields are compulsory as per requirements
      if (!formData.prevTournamentName.trim()) newErrors.prevTournamentName = 'Previous Tournament Name is required';
      if (!formData.prevPrizePool.trim()) newErrors.prevPrizePool = 'Previous Prize Pool is required';
      if (!files.prevTournamentPoster) newErrors.prevTournamentPoster = 'Previous Tournament Poster is required for verification';
    }

    if (step === 4) {
      if (!files.eventPoster) newErrors.eventPoster = 'Event Poster is required';
      if (!files.eventBanner) newErrors.eventBanner = 'Event Banner is required';
      if (!files.rulesPdf) newErrors.rulesPdf = 'Rules PDF is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneBody') {
      // Prevent characters other than digits, spaces, and dashes
      const sanitized = value.replace(/[^\d\s-]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: sanitized,
        contactNumber: prev.countryCode + sanitized.replace(/[\s-]/g, '')
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear validation error on type
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const selectCountryCode = (country) => {
    setFormData(prev => ({
      ...prev,
      countryCode: country.code,
      contactNumber: country.code + prev.phoneBody.replace(/[\s-]/g, '')
    }));
    setCountryDropdownOpen(false);
  };

  // Simulates a smooth file progress indicator
  const simulateUploadProgress = (fieldName) => {
    setUploadProgress(prev => ({ ...prev, [fieldName]: 10 }));
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev[fieldName] >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [fieldName]: prev[fieldName] + 25 };
      });
    }, 150);
  };

  const handleFileDrop = (e, fieldName, allowedTypes) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile, fieldName, allowedTypes);
  };

  const handleFileChange = (e, fieldName, allowedTypes) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile, fieldName, allowedTypes);
  };

  const validateAndSetFile = (file, fieldName, allowedTypes) => {
    if (!file) return;

    const ext = '.' + file.name.split('.').pop().toLowerCase();
    
    // Check file extension
    if (!allowedTypes.includes(ext)) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: `Unsupported file extension. Allowed: ${allowedTypes.join(', ')}`
      }));
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'File size exceeds the 10MB limit.'
      }));
      return;
    }

    setFiles(prev => ({ ...prev, [fieldName]: file }));
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[fieldName];
      return copy;
    });

    simulateUploadProgress(fieldName);
  };

  const removeFile = (fieldName) => {
    setFiles(prev => ({ ...prev, [fieldName]: null }));
    setUploadProgress(prev => ({ ...prev, [fieldName]: 0 }));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    const dataToSend = new FormData();

    // Append text fields
    Object.keys(formData).forEach(key => {
      dataToSend.append(key, formData[key]);
    });

    // Append compiled contactNumber explicitly
    dataToSend.set('contactNumber', formData.countryCode + formData.phoneBody.replace(/[\s-]/g, ''));

    // Append file fields
    if (files.eventPoster) dataToSend.append('eventPoster', files.eventPoster);
    if (files.eventBanner) dataToSend.append('eventBanner', files.eventBanner);
    if (files.rulesPdf) dataToSend.append('rulesPdf', files.rulesPdf);
    if (files.prevTournamentPoster) dataToSend.append('prevTournamentPoster', files.prevTournamentPoster);

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert(response.data.message || 'Onboarding failed. Check all files and fields.');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Server error. Please verify file uploads and fields.');
    } finally {
      setLoading(false);
    }
  };

  // Step names
  const steps = [
    { title: 'Credentials', icon: User },
    { title: 'Tournament', icon: Trophy },
    { title: 'Credibility', icon: ShieldCheck },
    { title: 'Media Upload', icon: Upload }
  ];

  return (
    <div className="relative w-full min-h-screen bg-brand-bg py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-brand-primary opacity-5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Step Indicator Panel */}
        {!submitted && (
          <div className="glass-panel p-6 rounded-xl border border-brand-border/60 mb-10">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute left-0 top-1/2 w-full h-[2px] bg-brand-border -translate-y-1/2 z-0" />
              
              {/* Active Progress Line */}
              <div 
                className="absolute left-0 top-1/2 h-[2px] bg-brand-primary -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((s, idx) => {
                const StepIcon = s.icon;
                const isCompleted = step > idx + 1;
                const isActive = step === idx + 1;

                return (
                  <div key={idx} className="flex flex-col items-center z-10">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border font-display font-bold text-sm transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-brand-primary border-brand-primary text-white' 
                          : isActive 
                            ? 'bg-brand-bg border-brand-primary text-brand-primary shadow-glow-red scale-110' 
                            : 'bg-brand-bg border-brand-border text-brand-muted'
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-4 h-4" />}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-2.5 hidden sm:block ${
                      isActive ? 'text-brand-primary' : isCompleted ? 'text-white' : 'text-brand-muted'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Form Slider */}
        <AnimatePresence mode="wait">
          {submitted ? (
            /* Success screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel rounded-xl border border-brand-border p-10 text-center space-y-6"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-brand-accent/20 border border-brand-accent text-brand-accent flex items-center justify-center shadow-glow-green">
                <Check className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-display font-black text-white tracking-wide uppercase">
                Onboarding Submitted!
              </h1>
              <div className="max-w-md mx-auto space-y-3">
                <p className="text-gray-300 font-semibold text-base">
                  Your submission is under review by FFM Community TN.
                </p>
                <p className="text-sm text-brand-muted">
                  Our admin panel will review your previous tournament poster, rules PDF, and credentials. Once approved, the event will go live across all community channels. An automated receipt has been sent to your email.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({
                    fullName: '', countryCode: '+91', phoneBody: '', contactNumber: '', orgChannelName: '',
                    emailAddress: '', whatsAppNumber: '', youtubeLink: '', instagramLink: '',
                    eventName: '', eventType: 'Squad', tournamentDate: '', entryFee: '', prizePool: '', expectedParticipants: '', additionalNotes: '',
                    prevTournamentName: '', prevPrizePool: '', prevStreamLink: ''
                  });
                  setFiles({ eventPoster: null, eventBanner: null, rulesPdf: null, prevTournamentPoster: null });
                  setUploadProgress({ eventPoster: 0, eventBanner: 0, rulesPdf: 0, prevTournamentPoster: 0 });
                }}
                className="bg-brand-primary text-white font-display text-xs uppercase tracking-wider font-extrabold px-6 py-3.5 rounded-md hover:bg-red-600 transition-all cursor-pointer"
              >
                Submit Another Event
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="glass-panel rounded-xl border border-brand-border/60 p-8 space-y-6 bg-brand-card/30"
            >
              {/* Step Title Header */}
              <div>
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-display">
                  Step {step} of 4
                </span>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-wider mt-1">
                  {step === 1 && "Organizer Details"}
                  {step === 2 && "Tournament Details"}
                  {step === 3 && "Previous Hosting & Credibility"}
                  {step === 4 && "Media Uploads"}
                </h2>
              </div>

              {/* Form Contents */}
              <div className="space-y-5">
                
                {/* STEP 1: ONBOARDING CREDENTIALS */}
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Full Name <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Host's full name"
                          className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                            errors.fullName ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                          }`}
                        />
                        {errors.fullName && <p className="text-xs text-brand-primary mt-1">{errors.fullName}</p>}
                      </div>

                      {/* Contact Number with Custom Country Dropdown */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Contact Number <span className="text-brand-primary">*</span>
                        </label>
                        <div className="flex relative">
                          <button
                            type="button"
                            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                            className="bg-brand-bg border border-brand-border border-r-0 rounded-l-md px-3 text-sm text-white flex items-center gap-1.5 focus:outline-none hover:bg-brand-border/20 cursor-pointer"
                          >
                            <span>{countries.find(c => c.code === formData.countryCode)?.flag}</span>
                            <span className="font-semibold text-xs">{formData.countryCode}</span>
                            <Globe className="w-3.5 h-3.5 text-brand-muted" />
                          </button>
                          
                          {/* Dropdown list */}
                          {countryDropdownOpen && (
                            <div className="absolute top-12 left-0 z-50 w-60 max-h-48 overflow-y-auto bg-brand-card border border-brand-border rounded-md shadow-2xl py-1">
                              {countries.map((c, cIdx) => (
                                <button
                                  key={cIdx}
                                  type="button"
                                  onClick={() => selectCountryCode(c)}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-200 hover:bg-brand-border hover:text-white flex items-center gap-2 cursor-pointer"
                                >
                                  <span>{c.flag}</span>
                                  <span>{c.name}</span>
                                  <span className="text-brand-muted ml-auto">{c.code}</span>
                                </button>
                              ))}
                            </div>
                          )}

                          <input
                            type="text"
                            name="phoneBody"
                            value={formData.phoneBody}
                            onChange={handleInputChange}
                            placeholder="9876543210"
                            className={`w-full bg-brand-bg border rounded-r-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                              errors.phoneBody ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                            }`}
                          />
                        </div>
                        <p className="text-[10px] text-brand-muted mt-1 leading-normal">
                          Your contact number will only be used for event verification and official communication.
                        </p>
                        {errors.phoneBody && <p className="text-xs text-brand-primary mt-1">{errors.phoneBody}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Organization / Channel Name <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="orgChannelName"
                          value={formData.orgChannelName}
                          onChange={handleInputChange}
                          placeholder="e.g. TN Esports Community"
                          className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                            errors.orgChannelName ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                          }`}
                        />
                        {errors.orgChannelName && <p className="text-xs text-brand-primary mt-1">{errors.orgChannelName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Email Address <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="email"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          placeholder="host@gmail.com"
                          className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                            errors.emailAddress ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                          }`}
                        />
                        {errors.emailAddress && <p className="text-xs text-brand-primary mt-1">{errors.emailAddress}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          WhatsApp Number <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="whatsAppNumber"
                          value={formData.whatsAppNumber}
                          onChange={handleInputChange}
                          placeholder="+91 9876543210"
                          className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                            errors.whatsAppNumber ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                          }`}
                        />
                        {errors.whatsAppNumber && <p className="text-xs text-brand-primary mt-1">{errors.whatsAppNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          YouTube Channel Link <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <Youtube className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="url"
                            name="youtubeLink"
                            value={formData.youtubeLink}
                            onChange={handleInputChange}
                            placeholder="https://youtube.com/c/YourChannel"
                            className={`w-full bg-brand-bg border rounded-md pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                              errors.youtubeLink ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                            }`}
                          />
                        </div>
                        {errors.youtubeLink && <p className="text-xs text-brand-primary mt-1">{errors.youtubeLink}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                        Instagram Profile Link <span className="text-brand-muted">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Instagram className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          name="instagramLink"
                          value={formData.instagramLink}
                          onChange={handleInputChange}
                          placeholder="https://instagram.com/YourUsername"
                          className="w-full bg-brand-bg border border-brand-border rounded-md pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* STEP 2: EVENT DETAILS */}
                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Event Name <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="eventName"
                          value={formData.eventName}
                          onChange={handleInputChange}
                          placeholder="e.g. Tamil Nadu Battle Cup v2"
                          className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                            errors.eventName ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                          }`}
                        />
                        {errors.eventName && <p className="text-xs text-brand-primary mt-1">{errors.eventName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Event Type <span className="text-brand-primary">*</span>
                        </label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          className="w-full bg-brand-bg border border-brand-border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all"
                        >
                          <option value="Squad">Squad (Standard Battle Royale)</option>
                          <option value="Duo">Duo (Standard Battle Royale)</option>
                          <option value="Solo">Solo (Standard Battle Royale)</option>
                          <option value="Clash Squad">Clash Squad (4v4)</option>
                          <option value="Custom rules">Custom Rules / League</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Tournament Date <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="date"
                            name="tournamentDate"
                            value={formData.tournamentDate}
                            onChange={handleInputChange}
                            className={`w-full bg-brand-bg border rounded-md pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                              errors.tournamentDate ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                            }`}
                          />
                        </div>
                        {errors.tournamentDate && <p className="text-xs text-brand-primary mt-1">{errors.tournamentDate}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Entry Fee <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <DollarSign className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="entryFee"
                            value={formData.entryFee}
                            onChange={handleInputChange}
                            placeholder="Free or Amount in INR"
                            className={`w-full bg-brand-bg border rounded-md pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                              errors.entryFee ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                            }`}
                          />
                        </div>
                        {errors.entryFee && <p className="text-xs text-brand-primary mt-1">{errors.entryFee}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Prize Pool <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="prizePool"
                          value={formData.prizePool}
                          onChange={handleInputChange}
                          placeholder="e.g. Rs 10,000"
                          className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                            errors.prizePool ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                          }`}
                        />
                        {errors.prizePool && <p className="text-xs text-brand-primary mt-1">{errors.prizePool}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Expected Participants <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <Users className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="expectedParticipants"
                            value={formData.expectedParticipants}
                            onChange={handleInputChange}
                            placeholder="e.g. 48 Teams / 200 Players"
                            className={`w-full bg-brand-bg border rounded-md pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                              errors.expectedParticipants ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                            }`}
                          />
                        </div>
                        {errors.expectedParticipants && <p className="text-xs text-brand-primary mt-1">{errors.expectedParticipants}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                        Additional Notes <span className="text-brand-muted">(Optional)</span>
                      </label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder="Add information about schedules, broadcast details, specific map pools, etc."
                        rows={4}
                        className="w-full bg-brand-bg border border-brand-border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all resize-y"
                      />
                    </div>
                  </>
                )}

                {/* STEP 3: PREVIOUS TOURNAMENTS (Host Credibility) */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="p-4 bg-brand-border/25 border border-brand-border rounded-md">
                      <p className="text-xs text-brand-muted leading-relaxed">
                        To protect players from fake registrations and match-fixing, all tournament organizers must verify their legitimacy by showcasing a previously hosted tournament.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Previous Tournament Name <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="prevTournamentName"
                          value={formData.prevTournamentName}
                          onChange={handleInputChange}
                          placeholder="e.g. Madurai Free Fire Cup"
                          className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                            errors.prevTournamentName ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                          }`}
                        />
                        {errors.prevTournamentName && <p className="text-xs text-brand-primary mt-1">{errors.prevTournamentName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Previous Prize Pool <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="prevPrizePool"
                          value={formData.prevPrizePool}
                          onChange={handleInputChange}
                          placeholder="e.g. Rs 5,000"
                          className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                            errors.prevPrizePool ? 'border-brand-primary' : 'border-brand-border focus:border-brand-primary'
                          }`}
                        />
                        {errors.prevPrizePool && <p className="text-xs text-brand-primary mt-1">{errors.prevPrizePool}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                        YouTube Stream Link <span className="text-brand-muted">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        name="prevStreamLink"
                        value={formData.prevStreamLink}
                        onChange={handleInputChange}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full bg-brand-bg border border-brand-border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all"
                      />
                    </div>

                    {/* Previous Poster Upload */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                        Previous Tournament Poster <span className="text-brand-primary">*</span>
                      </label>
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleFileDrop(e, 'prevTournamentPoster', ['.jpg', '.jpeg', '.png', '.webp'])}
                        onClick={() => prevPosterRef.current.click()}
                        className="border-2 border-dashed border-brand-border hover:border-brand-primary/60 rounded-md p-6 flex flex-col items-center justify-center bg-brand-bg/40 cursor-pointer transition-all"
                      >
                        <input
                          type="file"
                          ref={prevPosterRef}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'prevTournamentPoster', ['.jpg', '.jpeg', '.png', '.webp'])}
                        />
                        {files.prevTournamentPoster ? (
                          <div className="w-full flex items-center justify-between text-xs text-gray-200">
                            <div className="flex items-center gap-2.5 truncate max-w-[80%]">
                              <Paperclip className="w-4 h-4 shrink-0 text-brand-secondary" />
                              <span className="truncate">{files.prevTournamentPoster.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {uploadProgress.prevTournamentPoster === 100 ? (
                                <span className="text-brand-accent flex items-center gap-0.5">
                                  <Check className="w-3.5 h-3.5" /> Checked
                                </span>
                              ) : (
                                <span className="text-brand-muted">
                                  {uploadProgress.prevTournamentPoster}%
                                </span>
                              )}
                              <button 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); removeFile('prevTournamentPoster'); }}
                                className="p-1 rounded bg-brand-border hover:bg-brand-primary text-white cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-brand-muted mb-2" />
                            <p className="text-sm font-semibold text-gray-300">Drag & drop previous poster, or browse</p>
                            <p className="text-[10px] text-brand-muted mt-1">Supports JPG, PNG, WEBP. Max 10MB.</p>
                          </>
                        )}
                      </div>
                      {errors.prevTournamentPoster && <p className="text-xs text-brand-primary mt-1">{errors.prevTournamentPoster}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 4: MEDIA UPLOADS */}
                {step === 4 && (
                  <div className="space-y-6">
                    {/* Event Poster Upload */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                        Event Poster <span className="text-brand-primary">*</span>
                      </label>
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleFileDrop(e, 'eventPoster', ['.jpg', '.jpeg', '.png', '.webp'])}
                        onClick={() => posterRef.current.click()}
                        className="border-2 border-dashed border-brand-border hover:border-brand-primary/60 rounded-md p-6 flex flex-col items-center justify-center bg-brand-bg/40 cursor-pointer transition-all"
                      >
                        <input
                          type="file"
                          ref={posterRef}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'eventPoster', ['.jpg', '.jpeg', '.png', '.webp'])}
                        />
                        {files.eventPoster ? (
                          <div className="w-full flex items-center justify-between text-xs text-gray-200">
                            <div className="flex items-center gap-2.5 truncate max-w-[80%]">
                              <Paperclip className="w-4 h-4 shrink-0 text-brand-secondary" />
                              <span className="truncate">{files.eventPoster.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {uploadProgress.eventPoster === 100 ? (
                                <span className="text-brand-accent flex items-center gap-0.5">
                                  <Check className="w-3.5 h-3.5" /> Checked
                                </span>
                              ) : (
                                <span className="text-brand-muted">{uploadProgress.eventPoster}%</span>
                              )}
                              <button 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); removeFile('eventPoster'); }}
                                className="p-1 rounded bg-brand-border hover:bg-brand-primary text-white cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-brand-muted mb-2" />
                            <p className="text-sm font-semibold text-gray-300">Drag & drop event poster, or browse</p>
                            <p className="text-[10px] text-brand-muted mt-1">Supports JPG, PNG, WEBP. Max 10MB.</p>
                          </>
                        )}
                      </div>
                      {errors.eventPoster && <p className="text-xs text-brand-primary mt-1">{errors.eventPoster}</p>}
                    </div>

                    {/* Event Banner Upload */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                        Event Banner <span className="text-brand-primary">*</span>
                      </label>
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleFileDrop(e, 'eventBanner', ['.jpg', '.jpeg', '.png', '.webp'])}
                        onClick={() => bannerRef.current.click()}
                        className="border-2 border-dashed border-brand-border hover:border-brand-primary/60 rounded-md p-6 flex flex-col items-center justify-center bg-brand-bg/40 cursor-pointer transition-all"
                      >
                        <input
                          type="file"
                          ref={bannerRef}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'eventBanner', ['.jpg', '.jpeg', '.png', '.webp'])}
                        />
                        {files.eventBanner ? (
                          <div className="w-full flex items-center justify-between text-xs text-gray-200">
                            <div className="flex items-center gap-2.5 truncate max-w-[80%]">
                              <Paperclip className="w-4 h-4 shrink-0 text-brand-secondary" />
                              <span className="truncate">{files.eventBanner.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {uploadProgress.eventBanner === 100 ? (
                                <span className="text-brand-accent flex items-center gap-0.5">
                                  <Check className="w-3.5 h-3.5" /> Checked
                                </span>
                              ) : (
                                <span className="text-brand-muted">{uploadProgress.eventBanner}%</span>
                              )}
                              <button 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); removeFile('eventBanner'); }}
                                className="p-1 rounded bg-brand-border hover:bg-brand-primary text-white cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-brand-muted mb-2" />
                            <p className="text-sm font-semibold text-gray-300">Drag & drop event banner, or browse</p>
                            <p className="text-[10px] text-brand-muted mt-1">Supports JPG, PNG, WEBP. Max 10MB.</p>
                          </>
                        )}
                      </div>
                      {errors.eventBanner && <p className="text-xs text-brand-primary mt-1">{errors.eventBanner}</p>}
                    </div>

                    {/* Rules PDF Upload */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                        Tournament Rules PDF <span className="text-brand-primary">*</span>
                      </label>
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleFileDrop(e, 'rulesPdf', ['.pdf'])}
                        onClick={() => pdfRef.current.click()}
                        className="border-2 border-dashed border-brand-border hover:border-brand-primary/60 rounded-md p-6 flex flex-col items-center justify-center bg-brand-bg/40 cursor-pointer transition-all"
                      >
                        <input
                          type="file"
                          ref={pdfRef}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'rulesPdf', ['.pdf'])}
                        />
                        {files.rulesPdf ? (
                          <div className="w-full flex items-center justify-between text-xs text-gray-200">
                            <div className="flex items-center gap-2.5 truncate max-w-[80%]">
                              <Paperclip className="w-4 h-4 shrink-0 text-brand-secondary" />
                              <span className="truncate">{files.rulesPdf.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {uploadProgress.rulesPdf === 100 ? (
                                <span className="text-brand-accent flex items-center gap-0.5">
                                  <Check className="w-3.5 h-3.5" /> Checked
                                </span>
                              ) : (
                                <span className="text-brand-muted">{uploadProgress.rulesPdf}%</span>
                              )}
                              <button 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); removeFile('rulesPdf'); }}
                                className="p-1 rounded bg-brand-border hover:bg-brand-primary text-white cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-brand-muted mb-2" />
                            <p className="text-sm font-semibold text-gray-300">Drag & drop rules sheet PDF, or browse</p>
                            <p className="text-[10px] text-brand-muted mt-1">Accepts PDF format only. Max 10MB.</p>
                          </>
                        )}
                      </div>
                      {errors.rulesPdf && <p className="text-xs text-brand-primary mt-1">{errors.rulesPdf}</p>}
                    </div>

                    <div className="flex gap-2 items-center p-3 bg-brand-border/10 border border-brand-border/40 rounded-md text-[11px] text-brand-muted">
                      <Lock className="w-4 h-4 shrink-0 text-brand-secondary" />
                      <span>Security: Files are sent immediately to verification staff via encrypted SMTP and are not permanently cached.</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Navigation Action Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-brand-border/40">
                {step > 1 ? (
                  <button
                    onClick={handlePrev}
                    disabled={loading}
                    className="flex items-center gap-2 bg-brand-card hover:bg-brand-border border border-brand-border text-white text-xs font-display font-extrabold uppercase py-3 px-5 rounded-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-brand-primary text-white hover:bg-red-600 text-xs font-display font-extrabold uppercase py-3 px-5 rounded-md transition-all cursor-pointer"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 bg-brand-primary text-white hover:bg-red-600 text-xs font-display font-extrabold uppercase py-3.5 px-6 rounded-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Register Event
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
