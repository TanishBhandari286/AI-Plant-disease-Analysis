import axios from "axios";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import {
	AlertCircle,
	AlertTriangle,
	ArrowLeft,
	ArrowRight,
	Award,
	BookOpen,
	Calendar,
	Camera,
	CheckCircle,
	CheckSquare,
	CloudRain,
	Coins,
	Cpu,
	FileText,
	Flame,
	Globe,
	HelpCircle,
	ImagePlus,
	Leaf,
	Loader2,
	Lock,
	MapPin,
	MessageSquare,
	Microscope,
	Navigation,
	Package,
	PlayCircle,
	RefreshCw,
	Send,
	Shield,
	Sprout,
	Star,
	Trash2,
	Trophy,
	Upload,
	User,
	X,
	Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AcademyMascot from "./assets/academy_mascot.svg";
import {
	getDailyMissions,
	getSustainableFarmingCourse,
	LEADERBOARD_DATA,
} from "./farmingContent";

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
	en: {
		// Language selector
		selectLanguage: "Select Your Language",
		chooseLanguage: "Choose your preferred language to continue",

		// Navbar
		home: "Home",
		aboutUs: "About Us",
		tryForFree: "Try for Free",

		// Landing Page
		trustedBy: "Trusted by",
		farmers: "Farmers Across India",
		stopDisease: "Stop Crop Disease",
		beforeSpreads: "Before It Spreads",
		heroDesc:
			"Instant, accurate diagnosis on your phone. Powered by advanced AI verified against scientific data and your local weather.",
		diagnoseNow: "Diagnose My Plant Now (Free)",
		noCreditCard: "No credit card needed",
		accuracy: "95%+ Accuracy",
		howWorks: "How It Works",
		howWorksDesc:
			"Our AI-powered system provides accurate crop disease diagnosis in three simple steps.",
		step1: "Upload Photos",
		step1Title: "Capture Photos",
		step1Detail: "Take 3 clear photos of affected leaves from different angles",
		step2Title: "AI Analysis",
		step2Detail:
			"Our AI compares your images with scientific disease databases",
		step3Title: "Get Treatment",
		step3Detail: "Receive instant diagnosis and actionable treatment plans",
		step1Desc: "Take 1-3 clear photos of affected leaves",
		step2: "AI Analysis",
		step2Desc: "Dual-agent AI with weather correlation",
		step3: "Get Treatment",
		step3Desc: "Specific medicine & preventive measures",
		
		// Extended Landing Page
		heroTagline: "AI-Powered Crop Health",
		heroTitle1: "Protect Your Crops",
		heroTitle2: "Save Your Harvest",
		heroSubtitle: "Get instant AI diagnosis for crop diseases. Upload a photo, receive treatment recommendations in seconds.",
		startFreeAnalysis: "Start Free Analysis",
		watchDemo: "Watch Demo",
		freeForever: "Free forever • No signup required",
		featuresTitle: "Why Farmers Trust AgroVision",
		featuresSubtitle: "Advanced technology made simple for every farmer",
		feature1Title: "Instant Diagnosis",
		feature1Desc: "Get accurate disease identification within seconds using GPT-4 Vision AI",
		feature2Title: "10+ Crops Supported",
		feature2Desc: "Rice, Wheat, Tomato, Apple, Cotton, and many more crops covered",
		feature3Title: "Treatment Plans",
		feature3Desc: "Receive specific medicine recommendations and preventive measures",
		feature4Title: "Weather Aware",
		feature4Desc: "AI considers your local weather for more accurate diagnosis",
		feature5Title: "Multilingual",
		feature5Desc: "Available in Hindi, Tamil, Telugu, Bengali, Kannada, Marathi & more",
		feature6Title: "Works Offline",
		feature6Desc: "Access your previous diagnoses even without internet",
		statsTitle: "Empowering Farmers Across India",
		statFarmers: "Farmers Helped",
		statDiagnoses: "Diagnoses Made",
		statAccuracy: "Accuracy Rate",
		statLanguages: "Languages",
		testimonialsTitle: "What Farmers Say",
		testimonial1: "AgroVision saved my tomato crop. The AI detected early blight before I could even see it clearly!",
		testimonial1Author: "Ramesh Kumar",
		testimonial1Location: "Farmer, Punjab",
		testimonial2: "Finally an app that works in my language. The treatment suggestions are very accurate.",
		testimonial2Author: "Lakshmi Devi",
		testimonial2Location: "Farmer, Andhra Pradesh",
		testimonial3: "I used to lose 30% of my crop to diseases. Now I catch them early and save money.",
		testimonial3Author: "Suresh Patel",
		testimonial3Location: "Farmer, Gujarat",
		ctaTitle: "Ready to Protect Your Crops?",
		ctaSubtitle: "Join thousands of farmers using AI to fight crop diseases",
		ctaButton: "Start Free Diagnosis Now",
		footerTagline: "AI-Powered Crop Protection",
		footerDesc: "Empowering farmers with instant, accurate crop disease diagnosis.",
		footerProduct: "Product",
		footerFeatures: "Features",
		footerHowItWorks: "How It Works",
		footerPricing: "Pricing",
		footerSupport: "Support",
		footerHelp: "Help Center",
		footerContact: "Contact Us",
		footerFAQ: "FAQ",
		footerLegal: "Legal",
		footerPrivacy: "Privacy Policy",
		footerTerms: "Terms of Service",
		footerRights: "All rights reserved.",

		// Form
		newConsultation: "New Consultation",
		fillDetails:
			"Fill in the details below and upload images of your affected crop.",
		location: "Location",
		useLocation: "Use My Current Location",
		latitude: "Latitude",
		longitude: "Longitude",
		farmerDetails: "Farmer Details",
		yourName: "Your Name",
		enterName: "Enter your full name",
		village: "Village/Town",
		enterVillage: "Enter your village name",
		cropDetails: "Crop Details",
		selectCrop: "Select Crop",
		apple: "Apple",
		rice: "Rice",
		tomato: "Tomato",
		sownDate: "Sown Date (Optional)",
		observations: "Your Observations (Optional)",
		observationsPlaceholder:
			"Describe what you've noticed... (e.g., yellow spots, wilting)",
		uploadImages: "Upload Images (1-3 photos)",
		clickUpload: "Click to upload or drag and drop",
		jpegPng: "JPEG, PNG, WebP up to 5MB each",
		analyzeCrop: "Analyze Crop Disease",

		// Analyzing
		analyzingCrop: "Analyzing Your Crop",
		pleaseWait: "Please wait while our AI examines your images...",
		uploadingImages: "Uploading images to cloud...",
		fetchingWeather: "Fetching weather data...",
		runningDiagnosis: "Running visual diagnosis...",
		verifyingRef: "Verifying with reference images...",
		generatingPlan: "Generating treatment plan...",

		// Results
		diagnosisResults: "Diagnosis Results",
		newAnalysis: "New Analysis",
		identifiedDisease: "Identified Disease",
		confidence: "Confidence",
		severity: "Severity",
		mild: "Mild",
		moderate: "Moderate",
		severe: "Severe",
		analyzedImages: "Analyzed Images",
		treatmentPlan: "Treatment Plan",
		immediateActions: "Immediate Actions",
		preventive: "Preventive Measures",
		recommendedProducts: "Recommended Products",
		aiVerification: "AI Verification Log",
		initialPrediction: "Initial Prediction",
		referenceAvailable: "Reference Available",
		textureAnalysis: "Texture Analysis",
		comparisonNotes: "Comparison Notes",
		askQuestions: "Ask Questions",
		chatWithAI: "Chat with our AI assistant",
		askAbout: "Ask about the diagnosis...",

		// Common
		back: "Back",
		loading: "Loading...",
		error: "Error",
		success: "Success",

		// New Gamification & Academy
		farmAcademy: "Farm Academy",
		sustainablePath: "Sustainable Farming Foundation",
		startLearning: "Start Learning",
		dailyMissions: "Daily Missions",
		claimReward: "Claim",
		locked: "Locked",
		completed: "Completed",
		continue: "Continue",
		quizTitle: "Quick Quiz",
		checkAnswer: "Check Answer",
		correct: "Correct!",
		incorrect: "Incorrect",
		tryAgain: "Try Again",
		finish: "Finish",
		recoveryPlan: "Start My Recovery Plan",
		calibrationTitle: "Personalize Your Path",
		calibrationDesc: "Answer a few questions to get a custom learning plan.",

		// Farm Academy Content
		sustainablePathTitle: "Sustainable Farming Path",
		sustainablePathDesc: "Master organic inputs & soil health.",
		panchayatLeaderboard: "Panchayat Leaderboard",

		// Course Units
		unit1Title: "Unit 1: Healthy Soil, Healthy Farm",
		unit1Desc: "Master the basics of soil health",
		unit2Title: "Unit 2: Power of Organic Inputs",
		unit2Desc: "Reduce costs with homemade inputs",
		unit3Title: "Unit 3: Mixed Cropping Mastery",
		unit3Desc: "Protect against pests naturally",
		unit4Title: "Unit 4: Avoiding Harmful Practices",
		unit4Desc: "Stop wasting money and hurting land",
		unit5Title: "Unit 5: Grand Review",
		unit5Desc: "Prove your knowledge",

		// Daily Missions
		mission1: "Complete 1 Sustainable Farming Lesson",
		mission2: "Upload photo proof: Using compost",
		mission3: "Answer 3 mixed-cropping flashcards",

		// Lesson Content - Unit 1
		lesson_u1_n1_title: "What improves soil?",
		lesson_u1_n1_text:
			"Soil is the foundation of your farm. Healthy soil means better yields and less disease.",
		lesson_u1_n1_q: "Which practice helps soil health the most?",
		lesson_u1_n1_a: "Burning crop residue",
		lesson_u1_n1_b: "Adding organic matter (Compost)",
		lesson_u1_n1_c: "Flooding the field",

		lesson_u1_n2_title: "Organic Inputs",
		lesson_u1_n2_text:
			"Organic inputs like compost and cow dung enrich the soil with microbes.",
		lesson_u1_n2_q: "What is an example of an organic input?",
		lesson_u1_n2_a: "Urea",
		lesson_u1_n2_b: "Compost/Cow Dung",
		lesson_u1_n2_c: "Pesticide",

		lesson_u1_n3_title: "Quick Checks",
		lesson_u1_n3_q: "True or False: Burning residue is good for soil.",
		lesson_u1_n3_a: "True",
		lesson_u1_n3_b: "False",

		// Lesson Content - Unit 2
		lesson_u2_n1_title: "Why use compost?",
		lesson_u2_n1_text:
			"Compost improves water retention and adds nutrients slowly.",

		lesson_u2_n2_title: "Microbes & Fertility",
		lesson_u2_n2_text: "Microbes interact with roots to help plants eat.",

		lesson_u2_n3_title: "Knowledge Check",
		lesson_u2_n3_q: "Compost helps soil hold more...",
		lesson_u2_n3_a: "Water",
		lesson_u2_n3_b: "Heat",

		// Lesson Content - Unit 3
		lesson_u3_n1_title: "Benefits of Mixed Cropping",
		lesson_u3_n1_q: "Why do farmers use mixed cropping?",
		lesson_u3_n1_a: "It looks nice",
		lesson_u3_n1_b: "Reduces pests & improves soil",

		lesson_u3_n2_title: "Good Combinations",
		lesson_u3_n2_text:
			"Example: Maize + Beans. Beans fix nitrogen for the maize.",

		lesson_u3_n3_title: "Reinforcement",
		lesson_u3_n3_q: "What is a risk of mono-cropping?",
		lesson_u3_n3_a: "High pest risk",
		lesson_u3_n3_b: "Too much yield",

		// Lesson Content - Unit 4
		lesson_u4_n1_title: "Over-irrigation Harms",
		lesson_u4_n1_q: "What happens when you over-irrigate?",
		lesson_u4_n1_a: "Root rot & nutrient loss",
		lesson_u4_n1_b: "Faster growth",

		lesson_u4_n2_title: "Excess Chemical Risks",
		lesson_u4_n2_text: "Too many chemicals kill the good microbes.",

		lesson_u4_n3_title: "Mono-cropping",
		lesson_u4_n3_text: "Planting the same thing every year depletes soil.",

		lesson_u4_n4_title: "Review Challenge",
		lesson_u4_n4_q: "Which of these is unsustainable?",
		lesson_u4_n4_a: "Crop Rotation",
		lesson_u4_n4_b: "Heavy Chemical Use",

		// Lesson Content - Unit 5
		lesson_u5_n1_title: "Sustainable Farming Challenge",
		lesson_u5_n1_q1: "Which practice reduces chemical use naturally?",
		lesson_u5_n1_q1_a: "Mixed Cropping",
		lesson_u5_n1_q1_b: "Spraying more",
		lesson_u5_n1_q2: "What is an example of an organic input?",
		lesson_u5_n1_q2_a: "Compost",
		lesson_u5_n1_q2_b: "Urea",
		lesson_u5_n1_q3: "Why check soil health?",
		lesson_u5_n1_q3_a: "To save money & improve yield",
		lesson_u5_n1_q3_b: "It is fun",
	},

	hi: {
		// Language selector
		selectLanguage: "अपनी भाषा चुनें",
		chooseLanguage: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें",

		// Navbar
		home: "होम",
		aboutUs: "हमारे बारे में",
		tryForFree: "मुफ्त में आजमाएं",

		// Landing
		trustedBy: "विश्वसनीय",
		farmers: "भारत भर के किसान",
		stopDisease: "फसल रोग रोकें",
		beforeSpreads: "फैलने से पहले",
		heroDesc:
			"अपने फोन पर तुरंत, सटीक निदान। वैज्ञानिक डेटा और स्थानीय मौसम के साथ उन्नत AI।",
		diagnoseNow: "अभी मुफ्त में जांच करें",
		noCreditCard: "क्रेडिट कार्ड की आवश्यकता नहीं",
		accuracy: "95%+ सटीकता",
		howWorks: "यह कैसे काम करता है",
		howWorksDesc:
			"हमारी AI-संचालित प्रणाली तीन सरल चरणों में सटीक फसल रोग निदान प्रदान करती है।",
		step1: "फोटो अपलोड करें",
		step1Title: "फोटो कैप्चर करें",
		step1Detail: "विभिन्न कोणों से प्रभावित पत्तियों की 3 स्पष्ट फोटो लें",
		step2Title: "AI विश्लेषण",
		step2Detail: "हमारा AI आपकी छवियों की वैज्ञानिक रोग डेटाबेस से तुलना करता है",
		step3Title: "उपचार प्राप्त करें",
		step3Detail: "तुरंत निदान और कार्रवाई योग्य उपचार योजना प्राप्त करें",
		step1Desc: "प्रभावित पत्तियों की 1-3 स्पष्ट फोटो लें",
		step2: "AI विश्लेषण",
		step2Desc: "मौसम सहसंबंध के साथ Dual-agent AI",
		step3: "उपचार प्राप्त करें",
		step3Desc: "विशिष्ट दवा और निवारक उपाय",
		
		// Extended Landing Page (Hindi)
		heroTagline: "AI-संचालित फसल स्वास्थ्य",
		heroTitle1: "अपनी फसलों की रक्षा करें",
		heroTitle2: "अपनी फसल बचाएं",
		heroSubtitle: "फसल रोगों के लिए तुरंत AI निदान प्राप्त करें। फोटो अपलोड करें, सेकंडों में उपचार सुझाव पाएं।",
		startFreeAnalysis: "मुफ्त विश्लेषण शुरू करें",
		watchDemo: "डेमो देखें",
		freeForever: "हमेशा मुफ्त • साइनअप की जरूरत नहीं",
		featuresTitle: "किसान AgroVision पर क्यों भरोसा करते हैं",
		featuresSubtitle: "हर किसान के लिए सरल बनाई गई उन्नत तकनीक",
		feature1Title: "तुरंत निदान",
		feature1Desc: "GPT-4 Vision AI का उपयोग करके सेकंडों में सटीक रोग पहचान प्राप्त करें",
		feature2Title: "10+ फसलें समर्थित",
		feature2Desc: "चावल, गेहूं, टमाटर, सेब, कपास और कई अन्य फसलें शामिल",
		feature3Title: "उपचार योजनाएं",
		feature3Desc: "विशिष्ट दवा सिफारिशें और निवारक उपाय प्राप्त करें",
		feature4Title: "मौसम जागरूक",
		feature4Desc: "अधिक सटीक निदान के लिए AI आपके स्थानीय मौसम पर विचार करता है",
		feature5Title: "बहुभाषी",
		feature5Desc: "हिंदी, तमिल, तेलुगु, बंगाली, कन्नड़, मराठी और अधिक में उपलब्ध",
		feature6Title: "ऑफलाइन काम करता है",
		feature6Desc: "इंटरनेट के बिना भी अपने पिछले निदान एक्सेस करें",
		statsTitle: "पूरे भारत के किसानों को सशक्त बनाना",
		statFarmers: "किसानों की मदद की",
		statDiagnoses: "निदान किए गए",
		statAccuracy: "सटीकता दर",
		statLanguages: "भाषाएं",
		testimonialsTitle: "किसान क्या कहते हैं",
		testimonial1: "AgroVision ने मेरी टमाटर की फसल बचाई। AI ने अगेती झुलसा का पता लगाया इससे पहले कि मैं इसे स्पष्ट रूप से देख पाता!",
		testimonial1Author: "रमेश कुमार",
		testimonial1Location: "किसान, पंजाब",
		testimonial2: "आखिरकार एक ऐप जो मेरी भाषा में काम करता है। उपचार सुझाव बहुत सटीक हैं।",
		testimonial2Author: "लक्ष्मी देवी",
		testimonial2Location: "किसान, आंध्र प्रदेश",
		testimonial3: "मैं अपनी 30% फसल बीमारियों से खो देता था। अब मैं उन्हें जल्दी पकड़ लेता हूं और पैसे बचाता हूं।",
		testimonial3Author: "सुरेश पटेल",
		testimonial3Location: "किसान, गुजरात",
		ctaTitle: "अपनी फसलों की रक्षा के लिए तैयार हैं?",
		ctaSubtitle: "हजारों किसानों से जुड़ें जो फसल रोगों से लड़ने के लिए AI का उपयोग कर रहे हैं",
		ctaButton: "अभी मुफ्त निदान शुरू करें",
		footerTagline: "AI-संचालित फसल सुरक्षा",
		footerDesc: "तुरंत, सटीक फसल रोग निदान के साथ किसानों को सशक्त बनाना।",
		footerProduct: "उत्पाद",
		footerFeatures: "विशेषताएं",
		footerHowItWorks: "यह कैसे काम करता है",
		footerPricing: "मूल्य निर्धारण",
		footerSupport: "सहायता",
		footerHelp: "सहायता केंद्र",
		footerContact: "संपर्क करें",
		footerFAQ: "सामान्य प्रश्न",
		footerLegal: "कानूनी",
		footerPrivacy: "गोपनीयता नीति",
		footerTerms: "सेवा की शर्तें",
		footerRights: "सर्वाधिकार सुरक्षित।",

		// Form
		newConsultation: "नया परामर्श",
		fillDetails: "नीचे विवरण भरें और अपनी प्रभावित फसल की छवियां अपलोड करें।",
		location: "स्थान",
		useLocation: "मेरा वर्तमान स्थान उपयोग करें",
		latitude: "अक्षांश",
		longitude: "देशांतर",
		farmerDetails: "किसान विवरण",
		yourName: "आपका नाम",
		enterName: "अपना पूरा नाम दर्ज करें",
		village: "गाँव/शहर",
		enterVillage: "अपने गाँव का नाम दर्ज करें",
		cropDetails: "फसल विवरण",
		selectCrop: "फसल चुनें",
		apple: "सेब",
		rice: "चावल",
		tomato: "टमाटर",
		sownDate: "बुवाई की तारीख (वैकल्पिक)",
		observations: "आपकी टिप्पणियाँ (वैकल्पिक)",
		observationsPlaceholder: "आपने क्या देखा... (जैसे, पीले धब्बे, मुरझाना)",
		uploadImages: "छवियां अपलोड करें (1-3 फोटो)",
		clickUpload: "अपलोड करने के लिए क्लिक करें या ड्रैग एंड ड्रॉप करें",
		jpegPng: "प्रत्येक 5MB तक JPEG, PNG, WebP",
		analyzeCrop: "फसल रोग का विश्लेषण करें",

		// Analyzing
		analyzingCrop: "आपकी फसल का विश्लेषण",
		pleaseWait: "कृपया प्रतीक्षा करें जबकि हमारा AI आपकी छवियों की जांच करता है...",
		uploadingImages: "क्लाउड पर छवियां अपलोड हो रही हैं...",
		fetchingWeather: "मौसम डेटा प्राप्त किया जा रहा है...",
		runningDiagnosis: "दृश्य निदान चल रहा है...",
		verifyingRef: "संदर्भ छवियों के साथ सत्यापन...",
		generatingPlan: "उपचार योजना बनाई जा रही है...",

		// Results
		diagnosisResults: "निदान परिणाम",
		newAnalysis: "नया विश्लेषण",
		diseaseDetected: "रोग का पता चला",
		confidence: "विश्वास",
		severity: "गंभीरता",
		treatmentPlan: "उपचार योजना",
		immediateActions: "तत्काल कार्रवाई",
		preventive: "निवारक उपाय",
		recommendedProducts: "अनुशंसित उत्पाद",
		dosage: "खुराक",
		application: "आवेदन",
		weatherContext: "मौसम संदर्भ",
		aiVerification: "AI सत्यापन लॉग",
		howAnalyzed: "हमने आपकी फसल का विश्लेषण कैसे किया:",
		chatAssistant: "AI सहायक के साथ चैट करें",
		askQuestion: "निदान के बारे में पूछें...",

		// Common
		back: "वापस",
		loading: "लोड हो रहा है...",
		error: "त्रुटि",
		success: "सफलता",

		// New Gamification - Fallbacks (Hindi)
		farmAcademy: "कृषि अकादमी",
		sustainablePath: "सतत खेती की नींव",
		startLearning: "सीखना शुरू करें",
		dailyMissions: "दैनिक मिशन",
		claimReward: "दावा करें",
		locked: "बंद",
		completed: "पूरा हुआ",
		continue: "जारी रखें",
		quizTitle: "क्विज़",
		checkAnswer: "उत्तर जांचें",
		correct: "सही!",
		incorrect: "गलत",
		tryAgain: "पुनः प्रयास करें",
		finish: "समाप्त",
		recoveryPlan: "मेरी रिकवरी योजना शुरू करें",
		calibrationTitle: "अपना रास्ता अनुकूलित करें",
		calibrationDesc: "कस्टम लर्निंग प्लान प्राप्त करने के लिए कुछ सवालों के जवाब दें।",

		// Farm Academy Content
		sustainablePathTitle: "सतत खेती का रास्ता",
		sustainablePathDesc: "जैविक इनपुट और मिट्टी की सेहत में महारत हासिल करें।",
		panchayatLeaderboard: "पंचायत लीडरबोर्ड",

		// Course Units
		unit1Title: "यूनिट 1: स्वस्थ मिट्टी, स्वस्थ खेत",
		unit1Desc: "मिट्टी की सेहत की मूल बातें सीखें",
		unit2Title: "यूनिट 2: जैविक इनपुट की शक्ति",
		unit2Desc: "घर पर बने इनपुट से लागत कम करें",
		unit3Title: "यूनिट 3: मिश्रित खेती में निपुणता",
		unit3Desc: "कीटों से प्राकृतिक रूप से बचाव करें",
		unit4Title: "यूनिट 4: हानिकारक प्रथाओं से बचना",
		unit4Desc: "पैसे की बर्बादी और जमीन को नुकसान पहुंचाना बंद करें",
		unit5Title: "यूनिट 5: महा समीक्षा",
		unit5Desc: "अपना ज्ञान साबित करें",

		// Daily Missions
		mission1: "1 सतत खेती पाठ पूरा करें",
		mission2: "फोटो प्रमाण अपलोड करें: खाद का उपयोग",
		mission3: "3 मिश्रित खेती फ्लैशकार्ड का उत्तर दें",

		// Lesson Content - Unit 1
		lesson_u1_n1_title: "मिट्टी में क्या सुधार करता है?",
		lesson_u1_n1_text:
			"मिट्टी आपकी खेती की नींव है। स्वस्थ मिट्टी का मतलब है बेहतर उपज और कम बीमारी।",
		lesson_u1_n1_q: "कौन सी प्रथा मिट्टी की सेहत के लिए सबसे अच्छी है?",
		lesson_u1_n1_a: "फसल अवशेष जलाना",
		lesson_u1_n1_b: "जैविक पदार्थ (खाद) जोड़ना",
		lesson_u1_n1_c: "खेत में बाढ़ लाना",

		lesson_u1_n2_title: "जैविक इनपुट",
		lesson_u1_n2_text:
			"खाद और गोबर जैसे जैविक इनपुट मिट्टी को सूक्ष्मजीवों से समृद्ध करते हैं।",
		lesson_u1_n2_q: "जैविक इनपुट का उदाहरण क्या है?",
		lesson_u1_n2_a: "यूरिया",
		lesson_u1_n2_b: "खाद/गोबर",
		lesson_u1_n2_c: "कीटनाशक",

		lesson_u1_n3_title: "त्वरित जांच",
		lesson_u1_n3_q: "सही या गलत: अवशेष जलाना मिट्टी के लिए अच्छा है।",
		lesson_u1_n3_a: "सही",
		lesson_u1_n3_b: "गलत",

		// Lesson Content - Unit 2
		lesson_u2_n1_title: "खाद का उपयोग क्यों करें?",
		lesson_u2_n1_text:
			"खाद पानी बनाए रखने में सुधार करता है और धीरे-धीरे पोषक तत्व जोड़ता है।",

		lesson_u2_n2_title: "सूक्ष्मजीव और उर्वरता",
		lesson_u2_n2_text:
			"सूक्ष्मजीव जड़ों के साथ बातचीत करते हैं और पौधों को खाने में मदद करते हैं।",

		lesson_u2_n3_title: "ज्ञान जांच",
		lesson_u2_n3_q: "खाद मिट्टी को अधिक... धारण करने में मदद करता है",
		lesson_u2_n3_a: "पानी",
		lesson_u2_n3_b: "गर्मी",

		// Lesson Content - Unit 3
		lesson_u3_n1_title: "मिश्रित खेती के लाभ",
		lesson_u3_n1_q: "किसान मिश्रित खेती क्यों करते हैं?",
		lesson_u3_n1_a: "यह अच्छा दिखता है",
		lesson_u3_n1_b: "कीटों को कम करता है और मिट्टी में सुधार करता है",

		lesson_u3_n2_title: "अच्छे संयोजन",
		lesson_u3_n2_text:
			"उदाहरण: मक्का + बीन्स। बीन्स मक्के के लिए नाइट्रोजन ठीक करते हैं।",

		lesson_u3_n3_title: "सुदृढ़ीकरण",
		lesson_u3_n3_q: "एकल फसल उगाने का क्या जोखिम है?",
		lesson_u3_n3_a: "उच्च कीट जोखिम",
		lesson_u3_n3_b: "बहुत अधिक उपज",

		// Lesson Content - Unit 4
		lesson_u4_n1_title: "अत्यधिक सिंचाई हानिकारक",
		lesson_u4_n1_q: "जब आप अत्यधिक सिंचाई करते हैं तो क्या होता है?",
		lesson_u4_n1_a: "जड़ सड़न और पोषक तत्व नुकसान",
		lesson_u4_n1_b: "तेज वृद्धि",

		lesson_u4_n2_title: "अतिरिक्त रासायनिक जोखिम",
		lesson_u4_n2_text: "बहुत सारे रसायन अच्छे सूक्ष्मजीवों को मार देते हैं।",

		lesson_u4_n3_title: "एकल फसल",
		lesson_u4_n3_text: "हर साल एक ही चीज़ लगाने से मिट्टी खराब हो जाती है।",

		lesson_u4_n4_title: "समीक्षा चुनौती",
		lesson_u4_n4_q: "इनमें से कौन सा असंधारणीय है?",
		lesson_u4_n4_a: "फसल चक्र",
		lesson_u4_n4_b: "भारी रासायनिक उपयोग",

		// Lesson Content - Unit 5
		lesson_u5_n1_title: "सतत खेती चुनौती",
		lesson_u5_n1_q1: "कौन सी प्रथा स्वाभाविक रूप से रासायनिक उपयोग को कम करती है?",
		lesson_u5_n1_q1_a: "मिश्रित खेती",
		lesson_u5_n1_q1_b: "अधिक छिड़काव",
		lesson_u5_n1_q2: "जैविक इनपुट का उदाहरण क्या है?",
		lesson_u5_n1_q2_a: "खाद",
		lesson_u5_n1_q2_b: "यूरिया",
		lesson_u5_n1_q3: "मिट्टी की सेहत की जांच क्यों करें?",
		lesson_u5_n1_q3_a: "पैसे बचाने और उपज में सुधार के लिए",
		lesson_u5_n1_q3_b: "यह मज़्जेदार है",
	},

	mr: {
		// Marathi
		selectLanguage: "तुमची भाषा निवडा",
		chooseLanguage: "सुरू ठेवण्यासाठी तुमची पसंतीची भाषा निवडा",
		home: "होम",
		aboutUs: "आमच्याबद्दल",
		tryForFree: "मोफत वापरून पहा",
		trustedBy: "विश्वसनीय",
		farmers: "भारतातील शेतकरी",
		stopDisease: "पीक रोग थांबवा",
		beforeSpreads: "पसरण्याआधी",
		heroDesc:
			"तुमच्या फोनवर त्वरित, अचूक निदान। वैज्ञानिक डेटा आणि स्थानिक हवामानासह प्रगत AI.",
		diagnoseNow: "आता मोफत तपासा",
		noCreditCard: "क्रेडिट कार्डची आवश्यकता नाही",
		accuracy: "95%+ अचूकता",
		howWorks: "हे कसे काम करते",
		howWorksDesc:
			"आमची AI-चालित प्रणाली तीन सोप्या चरणांमध्ये अचूक पीक रोग निदान प्रदान करते.",
		step1: "फोटो अपलोड करा",
		step1Title: "फोटो कॅप्चर करा",
		step1Detail: "विविध कोनांमधून प्रभावित पानांचे 3 स्पष्ट फोटो घ्या",
		step2Title: "AI विश्लेषण",
		step2Detail: "आमचे AI तुमच्या प्रतिमा वैज्ञानिक रोग डेटाबेससह तुलना करते",
		step3Title: "उपचार मिळवा",
		step3Detail: "तत्काळ निदान आणि कार्यक्षम उपचार योजना मिळवा",
		step1Desc: "प्रभावित पानांचे 1-3 स्पष्ट फोटो घ्या",
		step2: "AI विश्लेषण",
		step2Desc: "हवामान सहसंबंधासह Dual-agent AI",
		step3: "उपचार मिळवा",
		step3Desc: "विशिष्ट औषध आणि प्रतिबंधात्मक उपाय",
		newConsultation: "नवीन सल्लामसलत",
		fillDetails: "खाली तपशील भरा आणि तुमच्या प्रभावित पिकाच्या प्रतिमा अपलोड करा.",
		location: "स्थान",
		useLocation: "माझे वर्तमान स्थान वापरा",
		latitude: "अक्षांश",
		longitude: "रेखांश",
		farmerDetails: "शेतकरी तपशील",
		yourName: "तुमचे नाव",
		enterName: "तुमचे पूर्ण नाव प्रविष्ट करा",
		village: "गाव/शहर",
		enterVillage: "तुमच्या गावाचे नाव प्रविष्ट करा",
		cropDetails: "पीक तपशील",
		selectCrop: "पीक निवडा",
		apple: "सफरचंद",
		rice: "तांदूळ",
		tomato: "टोमॅटो",
		sownDate: "पेरणीची तारीख (ऐच्छिक)",
		observations: "तुमची निरीक्षणे (ऐच्छिक)",
		observationsPlaceholder:
			"तुम्ही काय पाहिले ते वर्णन करा... (उदा., पिवळे डाग, कोमेजणे)",
		uploadImages: "प्रतिमा अपलोड करा (1-3 फोटो)",
		clickUpload: "अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग आणि ड्रॉप करा",
		jpegPng: "प्रत्येकी 5MB पर्यंत JPEG, PNG, WebP",
		analyzeCrop: "पीक रोगाचे विश्लेषण करा",
		analyzingCrop: "तुमच्या पिकाचे विश्लेषण",
		pleaseWait: "कृपया प्रतीक्षा करा जेव्हा आमचे AI तुमच्या प्रतिमा तपासत आहे...",
		uploadingImages: "क्लाउडवर प्रतिमा अपलोड होत आहेत...",
		fetchingWeather: "हवामान डेटा मिळवत आहे...",
		runningDiagnosis: "दृश्य निदान चालू आहे...",
		verifyingRef: "संदर्भ प्रतिमांसह सत्यापन...",
		generatingPlan: "उपचार योजना तयार करत आहे...",
		diagnosisResults: "निदान परिणाम",
		newAnalysis: "नवीन विश्लेषण",
		diseaseDetected: "रोग आढळला",
		confidence: "आत्मविश्वास",
		severity: "तीव्रता",
		treatmentPlan: "उपचार योजना",
		immediateActions: "तात्काळ कृती",
		preventive: "प्रतिबंधात्मक उपाय",
		recommendedProducts: "शिफारस केलेली उत्पादने",
		dosage: "डोस",
		application: "अर्ज",
		weatherContext: "हवामान संदर्भ",
		aiVerification: "AI सत्यापन लॉग",
		howAnalyzed: "आम्ही तुमच्या पिकाचे विश्लेषण कसे केले:",
		chatAssistant: "AI सहाय्यकासह चॅट करा",
		askQuestion: "निदानाबद्दल विचारा...",
		back: "मागे",
		loading: "लोड होत आहे...",
		error: "त्रुटी",
		success: "यश",

		// New Gamification (Marathi)
		farmAcademy: "शेती अकादमी",
		sustainablePath: "शाश्वत शेती पाया",
		startLearning: "शिकणे सुरू करा",
		dailyMissions: "दैनिक मोहिमा",
		claimReward: "दावा करा",
		locked: "लॉक केलेले",
		completed: "पूर्ण झाले",
		continue: "सुरू ठेवा",
		quizTitle: "द्रुत प्रश्नोत्तरी",
		checkAnswer: "उत्तर तपासा",
		correct: "बरोबर!",
		incorrect: "चुकीचे",
		tryAgain: "पुन्हा प्रयत्न करा",
		finish: "समाप्त",
		recoveryPlan: "माझी पुनर्प्राप्ती योजना सुरू करा",
		calibrationTitle: "तुमचा मार्ग वैयक्तिकृत करा",
		calibrationDesc: "सानुकूल शिक्षण योजना मिळविण्यासाठी काही प्रश्नांची उत्तरे द्या.",
	},

	te: {
		// Telugu
		selectLanguage: "మీ భాషను ఎంచుకోండి",
		chooseLanguage: "కొనసాగించడానికి మీ ఇష్టమైన భాషను ఎంచుకోండి",
		home: "హోమ్",
		aboutUs: "మా గురించి",
		tryForFree: "ఉచితంగా ప్రయత్నించండి",
		trustedBy: "నమ్మదగిన",
		farmers: "భారతదేశంలోని రైతులు",
		stopDisease: "పంట వ్యాధిని ఆపండి",
		beforeSpreads: "వ్యాపించే ముందు",
		heroDesc:
			"మీ ఫోన్‌లో తక్షణ, ఖచ్చితమైన రోగనిర్ధారణ. శాస్త్రీయ డేటా మరియు స్థానిక వాతావరణంతో అధునాతన AI.",
		diagnoseNow: "ఇప్పుడే ఉచితంగా తనిఖీ చేయండి",
		noCreditCard: "క్రెడిట్ కార్డ్ అవసరం లేదు",
		accuracy: "95%+ ఖచ్చితత్వం",
		howWorks: "ఇది ఎలా పనిచేస్తుంది",
		howWorksDesc:
			"మా AI-శక్తితో కూడిన సిస్టమ్ మూడు సరళమైన దశల్లో ఖచ్చితమైన పంట వ్యాధి నిర్ధారణ అందిస్తుంది.",
		step1: "ఫోటోలను అప్‌లోడ్ చేయండి",
		step1Title: "ఫోటోలను క్యాప్చర్ చేయండి",
		step1Detail: "వివిధ కోణాల నుండి ప్రభావిత ఆకుల 3 స్పష్టమైన ఫోటోలను తీయండి",
		step2Title: "AI విశ్లేషణ",
		step2Detail: "మా AI మీ చిత్రాలను శాస్త్రీయ వ్యాధి డేటాబేస్‌లతో పోల్చుతుంది",
		step3Title: "చికిత్స పొందండి",
		step3Detail: "తక్షణ నిర్ధారణ మరియు కార్యాచరణ చికిత్స ప్రణాళికలను పొందండి",
		step1Desc: "ప్రభావిత ఆకుల 1-3 స్పష్టమైన ఫోటోలను తీయండి",
		step2: "AI విశ్లేషణ",
		step2Desc: "వాతావరణ సహసంబంధంతో Dual-agent AI",
		step3: "చికిత్స పొందండి",
		step3Desc: "నిర్దిష్ట ఔషధం & నివారణ చర్యలు",
		newConsultation: "కొత్త సంప్రదింపు",
		fillDetails: "దిగువ వివరాలను పూరించండి మరియు మీ ప్రభావిత పంట చిత్రాలను అప్‌లోడ్ చేయండి.",
		location: "స్థానం",
		useLocation: "నా ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
		latitude: "అక్షాంశం",
		longitude: "రేఖాంశం",
		farmerDetails: "రైతు వివరాలు",
		yourName: "మీ పేరు",
		enterName: "మీ పూర్తి పేరును నమోదు చేయండి",
		village: "గ్రామం/పట్టణం",
		enterVillage: "మీ గ్రామం పేరును నమోదు చేయండి",
		cropDetails: "పంట వివరాలు",
		selectCrop: "పంటను ఎంచుకోండి",
		apple: "ఆపిల్",
		rice: "బియ్యం",
		tomato: "టమాటో",
		sownDate: "విత్తిన తేదీ (ఐచ్ఛికం)",
		observations: "మీ పరిశీలనలు (ఐచ్ఛికం)",
		observationsPlaceholder:
			"మీరు గమనించినది వివరించండి... (ఉదా., పసుపు మచ్చలు, వాడిపోవడం)",
		uploadImages: "చిత్రాలను అప్‌లోడ్ చేయండి (1-3 ఫోటోలు)",
		clickUpload: "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా డ్రాగ్ అండ్ డ్రాప్ చేయండి",
		jpegPng: "ఒక్కొక్కటి 5MB వరకు JPEG, PNG, WebP",
		analyzeCrop: "పంట వ్యాధి విశ్లేషణ చేయండి",
		analyzingCrop: "మీ పంటను విశ్లేషిస్తోంది",
		pleaseWait: "దయచేసి వేచి ఉండండి మా AI మీ చిత్రాలను పరిశీలిస్తోంది...",
		uploadingImages: "క్లౌడ్‌కు చిత్రాలను అప్‌లోడ్ చేస్తోంది...",
		fetchingWeather: "వాతావరణ డేటాను పొందుతోంది...",
		runningDiagnosis: "దృశ్య రోగనిర్ధారణ నడుస్తోంది...",
		verifyingRef: "సూచన చిత్రాలతో ధృవీకరిస్తోంది...",
		generatingPlan: "చికిత్స ప్రణాళికను రూపొందిస్తోంది...",
		diagnosisResults: "రోగనిర్ధారణ ఫలితాలు",
		newAnalysis: "కొత్త విశ్లేషణ",
		diseaseDetected: "వ్యాధి గుర్తించబడింది",
		confidence: "విశ్వాసం",
		severity: "తీవ్రత",
		treatmentPlan: "చికిత్స ప్రణాళిక",
		immediateActions: "తక్షణ చర్యలు",
		preventive: "నివారణ చర్యలు",
		recommendedProducts: "సిఫార్సు చేయబడిన ఉత్పత్తులు",
		dosage: "మోతాదు",
		application: "అప్లికేషన్",
		weatherContext: "వాతావరణ సందర్భం",
		aiVerification: "AI ధృవీకరణ లాగ్",
		howAnalyzed: "మేము మీ పంటను ఎలా విశ్లేషించాము:",
		chatAssistant: "AI సహాయకుడితో చాట్ చేయండి",
		askQuestion: "రోగనిర్ధారణ గురించి అడగండి...",
		back: "వెనుకకు",
		loading: "లోడ్ అవుతోంది...",
		error: "లోపం",
		success: "విజయం",

		// New Gamification (Telugu)
		farmAcademy: "వ్యవసాయ అకాడమీ",
		sustainablePath: "స్థిరమైన వ్యవసాయ పునాది",
		startLearning: "నేర్చుకోవడం ప్రారంభించండి",
		dailyMissions: "రోజువారీ మిషన్లు",
		claimReward: "క్లెయిమ్ చేయండి",
		locked: "లాక్ చేయబడింది",
		completed: "పూర్తయింది",
		continue: "కొనసాగించండి",
		quizTitle: "త్వరిత క్విజ్",
		checkAnswer: "సమాధానం తనిఖీ చేయండి",
		correct: "సరైనది!",
		incorrect: "తప్పు",
		tryAgain: "మళ్ళీ ప్రయత్నించండి",
		finish: "ముగించు",
		recoveryPlan: "నా రికవరీ ప్లాన్ ప్రారంభించండి",
		calibrationTitle: "మీ మార్గాన్ని వ్యక్తిగతీకరించండి",
		calibrationDesc: "అనుకూల అభ్యాస ప్రణాళికను పొందడానికి కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి.",
	},

	kn: {
		// Kannada
		selectLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
		chooseLanguage: "ಮುಂದುವರಿಸಲು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆರಿಸಿ",
		home: "ಹೋಮ್",
		aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ",
		tryForFree: "ಉಚಿತವಾಗಿ ಪ್ರಯತ್ನಿಸಿ",
		trustedBy: "ವಿಶ್ವಾಸಾರ್ಹ",
		farmers: "ಭಾರತದಾದ್ಯಂತ ರೈತರು",
		stopDisease: "ಬೆಳೆ ರೋಗವನ್ನು ನಿಲ್ಲಿಸಿ",
		beforeSpreads: "ಹರಡುವ ಮೊದಲು",
		heroDesc:
			"ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲಿ ತ್ವರಿತ, ನಿಖರವಾದ ರೋಗನಿರ್ಣಯ. ವೈಜ್ಞಾನಿಕ ಡೇಟಾ ಮತ್ತು ಸ್ಥಳೀಯ ಹವಾಮಾನದೊಂದಿಗೆ ಸುಧಾರಿತ AI.",
		diagnoseNow: "ಈಗ ಉಚಿತವಾಗಿ ಪರೀಕ್ಷಿಸಿ",
		noCreditCard: "ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ",
		accuracy: "95%+ ನಿಖರತೆ",
		howWorks: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
		howWorksDesc:
			"ನಮ್ಮ AI-ಚಾಲಿತ ವ್ಯವಸ್ಥೆಯು ಮೂರು ಸರಳ ಹಂತಗಳಲ್ಲಿ ನಿಖರವಾದ ಬೆಳೆ ರೋಗ ನಿರ್ಣಯವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
		step1: "ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
		step1Title: "ಫೋಟೋಗಳನ್ನು ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ",
		step1Detail: "ವಿವಿಧ ಕೋನಗಳಿಂದ ಪೀಡಿತ ಎಲೆಗಳ 3 ಸ್ಪಷ್ಟ ಫೋಟೋಗಳನ್ನು ತೆಗೆಯಿರಿ",
		step2Title: "AI ವಿಶ್ಲೇಷಣೆ",
		step2Detail: "ನಮ್ಮ AI ನಿಮ್ಮ ಚಿತ್ರಗಳನ್ನು ವೈಜ್ಞಾನಿಕ ರೋಗ ಡೇಟಾಬೇಸ್‌ಗಳೊಂದಿಗೆ ಹೋಲಿಸುತ್ತದೆ",
		step3Title: "ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ",
		step3Detail: "ತ್ವರಿತ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಕಾರ್ಯಸಾಧ್ಯ ಚಿಕಿತ್ಸಾ ಯೋಜನೆಗಳನ್ನು ಪಡೆಯಿರಿ",
		step1Desc: "ಪೀಡಿತ ಎಲೆಗಳ 1-3 ಸ್ಪಷ್ಟ ಫೋಟೋಗಳನ್ನು ತೆಗೆಯಿರಿ",
		step2: "AI ವಿಶ್ಲೇಷಣೆ",
		step2Desc: "ಹವಾಮಾನ ಪರಸ್ಪರ ಸಂಬಂಧದೊಂದಿಗೆ Dual-agent AI",
		step3: "ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ",
		step3Desc: "ನಿರ್ದಿಷ್ಟ ಔಷಧ ಮತ್ತು ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು",
		newConsultation: "ಹೊಸ ಸಮಾಲೋಚನೆ",
		fillDetails: "ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಪೀಡಿತ ಬೆಳೆಯ ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
		location: "ಸ್ಥಳ",
		useLocation: "ನನ್ನ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
		latitude: "ಅಕ್ಷಾಂಶ",
		longitude: "ರೇಖಾಂಶ",
		farmerDetails: "ರೈತ ವಿವರಗಳು",
		yourName: "ನಿಮ್ಮ ಹೆಸರು",
		enterName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
		village: "ಗ್ರಾಮ/ಪಟ್ಟಣ",
		enterVillage: "ನಿಮ್ಮ ಗ್ರಾಮದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
		cropDetails: "ಬೆಳೆ ವಿವರಗಳು",
		selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
		apple: "ಸೇಬು",
		rice: "ಅಕ್ಕಿ",
		tomato: "ಟೊಮೇಟೊ",
		sownDate: "ಬಿತ್ತನೆ ದಿನಾಂಕ (ಐಚ್ಛಿಕ)",
		observations: "ನಿಮ್ಮ ಅವಲೋಕನಗಳು (ಐಚ್ಛಿಕ)",
		observationsPlaceholder:
			"ನೀವು ಗಮನಿಸಿದ್ದನ್ನು ವಿವರಿಸಿ... (ಉದಾ., ಹಳದಿ ಚುಕ್ಕೆಗಳು, ಬಾಡುವಿಕೆ)",
		uploadImages: "ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (1-3 ಫೋಟೋಗಳು)",
		clickUpload: "ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ ಮಾಡಿ",
		jpegPng: "ಪ್ರತಿಯೊಂದೂ 5MB ವರೆಗೆ JPEG, PNG, WebP",
		analyzeCrop: "ಬೆಳೆ ರೋಗವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
		analyzingCrop: "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ",
		pleaseWait: "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ ನಮ್ಮ AI ನಿಮ್ಮ ಚಿತ್ರಗಳನ್ನು ಪರೀಕ್ಷಿಸುತ್ತಿದೆ...",
		uploadingImages: "ಕ್ಲೌಡ್‌ಗೆ ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
		fetchingWeather: "ಹವಾಮಾನ ಡೇಟಾವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
		runningDiagnosis: "ದೃಶ್ಯ ರೋಗನಿರ್ಣಯ ನಡೆಯುತ್ತಿದೆ...",
		verifyingRef: "ಉಲ್ಲೇಖ ಚಿತ್ರಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
		generatingPlan: "ಚಿಕಿತ್ಸಾ ಯೋಜನೆಯನ್ನು ರಚಿಸಲಾಗುತ್ತಿದೆ...",
		diagnosisResults: "ರೋಗನಿರ್ಣಯ ಫಲಿತಾಂಶಗಳು",
		newAnalysis: "ಹೊಸ ವಿಶ್ಲೇಷಣೆ",
		diseaseDetected: "ರೋಗ ಪತ್ತೆಯಾಗಿದೆ",
		confidence: "ವಿಶ್ವಾಸ",
		severity: "ತೀವ್ರತೆ",
		treatmentPlan: "ಚಿಕಿತ್ಸಾ ಯೋಜನೆ",
		immediateActions: "ತಕ್ಷಣದ ಕ್ರಮಗಳು",
		preventive: "ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು",
		recommendedProducts: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಉತ್ಪನ್ನಗಳು",
		dosage: "ಡೋಸೇಜ್",
		application: "ಅಪ್ಲಿಕೇಶನ್",
		weatherContext: "ಹವಾಮಾನ ಸಂದರ್ಭ",
		aiVerification: "AI ಪರಿಶೀಲನೆ ಲಾಗ್",
		howAnalyzed: "ನಾವು ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಹೇಗೆ ವಿಶ್ಲೇಷಿಸಿದ್ದೇವೆ:",
		chatAssistant: "AI ಸಹಾಯಕರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
		askQuestion: "ರೋಗನಿರ್ಣಯದ ಬಗ್ಗೆ ಕೇಳಿ...",
		back: "ಹಿಂದೆ",
		loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
		error: "ದೋಷ",
		success: "ಯಶಸ್ಸು",

		// New Gamification (Kannada)
		farmAcademy: "ಕೃಷಿ ಅಕಾಡೆಮಿ",
		sustainablePath: "ಸುಸ್ಥಿರ ಕೃಷಿ ಅಡಿಪಾಯ",
		startLearning: "ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ",
		dailyMissions: "ದೈನಂದಿನ ಮಿಷನ್‌ಗಳು",
		claimReward: "ಕ್ಲೈಮ್ ಮಾಡಿ",
		locked: "ಲಾಕ್ ಆಗಿದೆ",
		completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
		continue: "ಮುಂದುವರಿಸಿ",
		quizTitle: "ತ್ವರಿತ ಕ್ವಿಜ್",
		checkAnswer: "ಉತ್ತರ ಪರಿಶೀಲಿಸಿ",
		correct: "ಸರಿ!",
		incorrect: "ತಪ್ಪು",
		tryAgain: "ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ",
		finish: "ಮುಗಿಸು",
		recoveryPlan: "ನನ್ನ ಚೇತರಿಕೆ ಯೋಜನೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ",
		calibrationTitle: "ನಿಮ್ಮ ಮಾರ್ಗವನ್ನು ವೈಯಕ್ತೀಕರಿಸಿ",
		calibrationDesc: "ಕಸ್ಟಮ್ ಕಲಿಕೆಯ ಯೋಜನೆಯನ್ನು ಪಡೆಯಲು ಕೆಲವು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.",
	},

	bn: {
		// Bengali
		selectLanguage: "আপনার ভাষা নির্বাচন করুন",
		chooseLanguage: "চালিয়ে যেতে আপনার পছন্দের ভাষা চয়ন করুন",
		home: "হোম",
		aboutUs: "আমাদের সম্পর্কে",
		tryForFree: "বিনামূল্যে চেষ্টা করুন",
		trustedBy: "বিশ্বস্ত",
		farmers: "ভারত জুড়ে কৃষক",
		stopDisease: "ফসলের রোগ বন্ধ করুন",
		beforeSpreads: "ছড়ানোর আগে",
		heroDesc:
			"আপনার ফোনে তাৎক্ষণিক, সঠিক রোগ নির্ণয়। বৈজ্ঞানিক তথ্য এবং স্থানীয় আবহাওয়া সহ উন্নত AI।",
		diagnoseNow: "এখনই বিনামূল্যে পরীক্ষা করুন",
		noCreditCard: "ক্রেডিট কার্ডের প্রয়োজন নেই",
		accuracy: "95%+ নির্ভুলতা",
		howWorks: "এটি কিভাবে কাজ করে",
		howWorksDesc:
			"আমাদের AI-চালিত সিস্টেম তিনটি সহজ ধাপে সঠিক ফসলের রোগ নির্ণয় প্রদান করে।",
		step1: "ফটো আপলোড করুন",
		step1Title: "ফটো ক্যাপচার করুন",
		step1Detail: "বিভিন্ন কোণ থেকে আক্রান্ত পাতার 3টি পরিষ্কার ফটো তুলুন",
		step2Title: "AI বিশ্লেষণ",
		step2Detail: "আমাদের AI আপনার ছবিগুলিকে বৈজ্ঞানিক রোগ ডেটাবেসের সাথে তুলনা করে",
		step3Title: "চিকিৎসা পান",
		step3Detail: "তাৎক্ষণিক নির্ণয় এবং কার্যকর চিকিৎসা পরিকল্পনা পান",
		step1Desc: "আক্রান্ত পাতার 1-3টি পরিষ্কার ফটো তুলুন",
		step2: "AI বিশ্লেষণ",
		step2Desc: "আবহাওয়া সহসম্বন্ধ সহ Dual-agent AI",
		step3: "চিকিৎসা পান",
		step3Desc: "নির্দিষ্ট ওষুধ এবং প্রতিরোধমূলক ব্যবস্থা",
		newConsultation: "নতুন পরামর্শ",
		fillDetails: "নীচের বিবরণ পূরণ করুন এবং আপনার আক্রান্ত ফসলের ছবি আপলোড করুন।",
		location: "অবস্থান",
		useLocation: "আমার বর্তমান অবস্থান ব্যবহার করুন",
		latitude: "অক্ষাংশ",
		longitude: "দ্রাঘিমাংশ",
		farmerDetails: "কৃষক বিবরণ",
		yourName: "আপনার নাম",
		enterName: "আপনার পুরো নাম লিখুন",
		village: "গ্রাম/শহর",
		enterVillage: "আপনার গ্রামের নাম লিখুন",
		cropDetails: "ফসল বিবরণ",
		selectCrop: "ফসল নির্বাচন করুন",
		apple: "আপেল",
		rice: "চাল",
		tomato: "টমেটো",
		sownDate: "বপনের তারিখ (ঐচ্ছিক)",
		observations: "আপনার পর্যবেক্ষণ (ঐচ্ছিক)",
		observationsPlaceholder:
			"আপনি কি লক্ষ্য করেছেন তা বর্ণনা করুন... (যেমন, হলুদ দাগ, শুকিয়ে যাওয়া)",
		uploadImages: "ছবি আপলোড করুন (1-3 ফটো)",
		clickUpload: "আপলোড করতে ক্লিক করুন বা ড্র্যাগ এবং ড্রপ করুন",
		jpegPng: "প্রতিটি 5MB পর্যন্ত JPEG, PNG, WebP",
		analyzeCrop: "ফসলের রোগ বিশ্লেষণ করুন",
		analyzingCrop: "আপনার ফসল বিশ্লেষণ করা হচ্ছে",
		pleaseWait: "অনুগ্রহ করে অপেক্ষা করুন আমাদের AI আপনার ছবি পরীক্ষা করছে...",
		uploadingImages: "ক্লাউডে ছবি আপলোড করা হচ্ছে...",
		fetchingWeather: "আবহাওয়া তথ্য আনা হচ্ছে...",
		runningDiagnosis: "ভিজ্যুয়াল রোগ নির্ণয় চলছে...",
		verifyingRef: "রেফারেন্স ছবির সাথে যাচাই করা হচ্ছে...",
		generatingPlan: "চিকিৎসা পরিকল্পনা তৈরি করা হচ্ছে...",
		diagnosisResults: "রোগ নির্ণয় ফলাফল",
		newAnalysis: "নতুন বিশ্লেষণ",
		diseaseDetected: "রোগ সনাক্ত করা হয়েছে",
		confidence: "আত্মবিশ্বাস",
		severity: "তীব্রতা",
		treatmentPlan: "চিকিৎসা পরিকল্পনা",
		immediateActions: "তাৎক্ষণিক পদক্ষেপ",
		preventive: "প্রতিরোধমূলক ব্যবস্থা",
		recommendedProducts: "প্রস্তাবিত পণ্য",
		dosage: "ডোজ",
		application: "আবেদন",
		weatherContext: "আবহাওয়া প্রসঙ্গ",
		aiVerification: "AI যাচাইকরণ লগ",
		howAnalyzed: "আমরা কিভাবে আপনার ফসল বিশ্লেষণ করেছি:",
		chatAssistant: "AI সহায়কের সাথে চ্যাট করুন",
		askQuestion: "রোগ নির্ণয় সম্পর্কে জিজ্ঞাসা করুন...",
		back: "ফিরে যান",
		loading: "লোড হচ্ছে...",
		error: "ত্রুটি",
		success: "সাফল্য",

		// New Gamification (Bengali)
		farmAcademy: "কৃষি একাডেমি",
		sustainablePath: "টেকসই কৃষি ভিত্তি",
		startLearning: "শেখা শুরু করুন",
		dailyMissions: "দৈনিক মিশন",
		claimReward: "দাবি করুন",
		locked: "লক করা",
		completed: "সম্পন্ন",
		continue: "চালিয়ে যান",
		quizTitle: "দ্রুত কুইজ",
		checkAnswer: "উত্তর পরীক্ষা করুন",
		correct: "সঠিক!",
		incorrect: "ভুল",
		tryAgain: "আবার চেষ্টা করুন",
		finish: "সমাপ্ত",
		recoveryPlan: "আমার পুনরুদ্ধার পরিকল্পনা শুরু করুন",
		calibrationTitle: "আপনার পথ ব্যক্তিগতকরণ করুন",
		calibrationDesc: "একটি কাস্টম শেখার পরিকল্পনা পেতে কয়েকটি প্রশ্নের উত্তর দিন।",
	},

	ta: {
		// Tamil
		selectLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
		chooseLanguage: "தொடர உங்கள் விருப்ப மொழியைத் தேர்வு செய்யவும்",
		home: "முகப்பு",
		aboutUs: "எங்களை பற்றி",
		tryForFree: "இலவசமாக முயற்சிக்கவும்",
		trustedBy: "நம்பகமான",
		farmers: "இந்தியா முழுவதும் விவசாயிகள்",
		stopDisease: "பயிர் நோயை நிறுத்துங்கள்",
		beforeSpreads: "பரவும் முன்",
		heroDesc:
			"உங்கள் தொலைபேசியில் உடனடி, துல்லியமான நோயறிதல். அறிவியல் தரவு மற்றும் உள்ளூர் வானிலையுடன் மேம்பட்ட AI.",
		diagnoseNow: "இப்போதே இலவசமாக பரிசோதிக்கவும்",
		noCreditCard: "கடன் அட்டை தேவையில்லை",
		accuracy: "95%+ துல்லியம்",
		howWorks: "இது எப்படி வேலை செய்கிறது",
		howWorksDesc:
			"எங்கள் AI-இயக்கப்படும் அமைப்பு மூன்று எளிய படிகளில் துல்லியமான பயிர் நோய் கண்டறிதலை வழங்குகிறது.",
		step1: "புகைப்படங்களை பதிவேற்றவும்",
		step1Title: "புகைப்படங்களை எடுக்கவும்",
		step1Detail:
			"வெவ்வேறு கோணங்களில் இருந்து பாதிக்கப்பட்ட இலைகளின் 3 தெளிவான புகைப்படங்களை எடுக்கவும்",
		step2Title: "AI பகுப்பாய்வு",
		step2Detail: "எங்கள் AI உங்கள் படங்களை அறிவியல் நோய் தரவுத்தளங்களுடன் ஒப்பிடுகிறது",
		step3Title: "சிகிச்சை பெறவும்",
		step3Detail: "உடனடி நோயறிதல் மற்றும் செயல்படக்கூடிய சிகிச்சை திட்டங்களைப் பெறவும்",
		step1Desc: "பாதிக்கப்பட்ட இலைகளின் 1-3 தெளிவான புகைப்படங்களை எடுக்கவும்",
		step2: "AI பகுப்பாய்வு",
		step2Desc: "வானிலை தொடர்புடன் Dual-agent AI",
		step3: "சிகிச்சை பெறவும்",
		step3Desc: "குறிப்பிட்ட மருந்து மற்றும் தடுப்பு நடவடிக்கைகள்",
		newConsultation: "புதிய ஆலோசனை",
		fillDetails:
			"கீழே விவரங்களை நிரப்பி, உங்கள் பாதிக்கப்பட்ட பயிரின் படங்களைப் பதிவேற்றவும்.",
		location: "இடம்",
		useLocation: "எனது தற்போதைய இடத்தைப் பயன்படுத்தவும்",
		latitude: "அட்சரேகை",
		longitude: "தீர்க்கரேகை",
		farmerDetails: "விவசாயி விவரங்கள்",
		yourName: "உங்கள் பெயர்",
		enterName: "உங்கள் முழு பெயரை உள்ளிடவும்",
		village: "கிராமம்/நகரம்",
		enterVillage: "உங்கள் கிராமத்தின் பெயரை உள்ளிடவும்",
		cropDetails: "பயிர் விவரங்கள்",
		selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
		apple: "ஆப்பிள்",
		rice: "அரிசி",
		tomato: "தக்காளி",
		sownDate: "விதைத்த தேதி (விருப்பத்தேர்வு)",
		observations: "உங்கள் கவனிப்புகள் (விருப்பத்தேர்வு)",
		observationsPlaceholder:
			"நீங்கள் கவனித்ததை விவரிக்கவும்... (எ.கா., மஞ்சள் புள்ளிகள், வாடுதல்)",
		uploadImages: "படங்களை பதிவேற்றவும் (1-3 புகைப்படங்கள்)",
		clickUpload: "பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்",
		jpegPng: "ஒவ்வொன்றும் 5MB வரை JPEG, PNG, WebP",
		analyzeCrop: "பயிர் நோயை பகுப்பாய்வு செய்யவும்",
		analyzingCrop: "உங்கள் பயிர் பகுப்பாய்வு செய்யப்படுகிறது",
		pleaseWait: "தயவுசெய்து காத்திருக்கவும் எங்கள் AI உங்கள் படங்களை பரிசோதிக்கிறது...",
		uploadingImages: "மேகத்திற்கு படங்களை பதிவேற்றுகிறது...",
		fetchingWeather: "வானிலை தரவை பெறுகிறது...",
		// New Gamification (Tamil)
		farmAcademy: "விவசாய அகாடமி",
		sustainablePath: "நிலையான விவசாய அடித்தளம்",
		startLearning: "கற்றல் தொடங்குங்கள்",
		dailyMissions: "தினசரி பணிகள்",
		claimReward: "உரிமை கோருங்கள்",
		locked: "பூட்டப்பட்டது",
		completed: "நிறைவடைந்தது",
		continue: "தொடரவும்",
		quizTitle: "விரைவு வினாடி வினா",
		checkAnswer: "பதிலைச் சரிபார்க்கவும்",
		correct: "சரியானது!",
		incorrect: "தவறு",
		tryAgain: "மீண்டும் முயற்சிக்கவும்",
		finish: "முடி",
		recoveryPlan: "எனது மீட்பு திட்டத்தைத் தொடங்குங்கள்",
		calibrationTitle: "உங்கள் பாதையை தனிப்பயனாக்குங்கள்",
		calibrationDesc: "தனிப்பயன் கற்றல் திட்டத்தைப் பெற சில கேள்விகளுக்கு பதிலளிக்கவும்.",

		runningDiagnosis: "காட்சி நோயறிதல் இயங்குகிறது...",
		verifyingRef: "குறிப்பு படங்களுடன் சரிபார்க்கிறது...",
		generatingPlan: "சிகிச்சை திட்டத்தை உருவாக்குகிறது...",
		diagnosisResults: "நோயறிதல் முடிவுகள்",
		newAnalysis: "புதிய பகுப்பாய்வு",
		diseaseDetected: "நோய் கண்டறியப்பட்டது",
		confidence: "நம்பிக்கை",
		severity: "தீவிரம்",
		treatmentPlan: "சிகிச்சை திட்டம்",
		immediateActions: "உடனடி நடவடிக்கைகள்",
		preventive: "தடுப்பு நடவடிக்கைகள்",
		recommendedProducts: "பரிந்துரைக்கப்பட்ட தயாரிப்புகள்",
		dosage: "அளவு",
		application: "பயன்பாடு",
		weatherContext: "வானிலை சூழல்",
		aiVerification: "AI சரிபார்ப்பு பதிவு",
		howAnalyzed: "நாங்கள் உங்கள் பயிரை எப்படி பகுப்பாய்வு செய்தோம்:",
		chatAssistant: "AI உதவியாளருடன் அரட்டை",
		askQuestion: "நோயறிதல் பற்றி கேளுங்கள்...",
		back: "பின் செல்",
		loading: "ஏற்றுகிறது...",
		error: "பிழை",
		success: "வெற்றி",
	},
};

// Language selector popup component
const LanguageSelector = ({ onSelect, currentLang }) => {
	const languages = [
		{ code: "en", name: "English", flag: "🇬🇧", native: "English" },
		{ code: "hi", name: "Hindi", flag: "🇮🇳", native: "हिंदी" },
		{ code: "mr", name: "Marathi", flag: "🇮🇳", native: "मराठी" },
		{ code: "te", name: "Telugu", flag: "🇮🇳", native: "తెలుగు" },
		{ code: "kn", name: "Kannada", flag: "🇮🇳", native: "ಕನ್ನಡ" },
		{ code: "bn", name: "Bengali", flag: "🇮🇳", native: "বাংলা" },
		{ code: "ta", name: "Tamil", flag: "🇮🇳", native: "தமிழ்" },
	];

	const t = translations[currentLang] || translations.en;

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-4 sm:p-8 my-auto"
			>
				<div className="text-center mb-4 sm:mb-8">
					<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
						<Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
					</div>
					<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
						{t.selectLanguage}
					</h2>
					<p className="text-sm sm:text-base text-gray-600">
						{t.chooseLanguage}
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
					{languages.map((lang) => (
						<button
							key={lang.code}
							onClick={() => onSelect(lang.code)}
							className={`p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg ${
								currentLang === lang.code
									? "border-primary-500 bg-primary-50"
									: "border-gray-200 hover:border-primary-300"
							}`}
						>
							<div className="flex items-center gap-2 sm:gap-3">
								<span className="text-3xl sm:text-4xl">{lang.flag}</span>
								<div className="text-left">
									<div className="font-bold text-gray-900 text-sm sm:text-base">
										{lang.native}
									</div>
									<div className="text-xs sm:text-sm text-gray-500">
										{lang.name}
									</div>
								</div>
							</div>
						</button>
					))}
				</div>
			</motion.div>
		</div>
	);
};

// ============================================
// FARMER LOADING SCREEN COMPONENT
// ============================================
const FarmerLoadingScreen = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50"
	>
		<div className="text-center px-4">
			{/* Animated Farmer Illustration */}
			<motion.div
				animate={{
					y: [0, -20, 0],
					rotate: [0, 3, -3, 0],
				}}
				transition={{
					duration: 2.5,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				className="mb-8"
			>
				<div className="relative">
					{/* Outer glow rings */}
					<motion.div
						animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
						transition={{ duration: 2, repeat: Infinity }}
						className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-2xl"
					/>
					<motion.div
						animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
						transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
						className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-primary-400 rounded-full blur-2xl"
					/>

					{/* Main farmer icon */}
					<div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 rounded-full flex items-center justify-center shadow-2xl">
						<motion.div
							animate={{ scale: [1, 1.1, 1] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							<Sprout className="w-16 h-16 text-white" />
						</motion.div>
					</div>
				</div>
			</motion.div>

			{/* Pulsing dots */}
			<div className="flex gap-2 justify-center mb-6">
				{[0, 1, 2].map((i) => (
					<motion.div
						key={i}
						animate={{
							scale: [1, 1.5, 1],
							opacity: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 1,
							repeat: Infinity,
							delay: i * 0.2,
						}}
						className="w-3 h-3 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg"
					/>
				))}
			</div>

			<motion.div
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<p className="text-2xl font-bold text-gray-800 mb-2">
					Analyzing your crop...
				</p>
				<p className="text-sm text-gray-600">
					Our AI is examining your plants 🌱
				</p>
			</motion.div>

			{/* Progress indicator */}
			<div className="mt-8 w-64 mx-auto">
				<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
					<motion.div
						animate={{ x: ["-100%", "100%"] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
						className="h-full w-1/3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
					/>
				</div>
			</div>
		</div>
	</motion.div>
);

// ============================================
// SKELETON LOADER COMPONENTS
// ============================================
const SkeletonCard = () => (
	<div className="animate-pulse bg-white rounded-xl p-6 shadow-lg">
		<div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
		<div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
		<div className="h-4 bg-gray-200 rounded w-5/6"></div>
	</div>
);

// ============================================
// CONFIGURATION
// ============================================
const API_URL = "http://localhost:8000";

const STATES = {
	LANDING: "LANDING",
	FORM: "FORM",
	ANALYZING: "ANALYZING",
	RESULT: "RESULT",
	ACADEMY: "ACADEMY",
	QUIZ: "QUIZ",
	CALIBRATION: "CALIBRATION",
	MISSIONS: "MISSIONS",
};

const FORM_STEPS = {
	IMAGES: 0,
	LOCATION: 1,
	FARMER_INFO: 2,
	CROP_INFO: 3,
};

// SUPPORTED CROPS - Only 3 crops with comprehensive disease databases
const CROPS = [
	{ value: "Apple", icon: "🍎" }, // 4 diseases + healthy
	{ value: "Rice", icon: "🌾" }, // 6 diseases + healthy
	{ value: "Tomato", icon: "🍅" }, // 10 diseases + healthy
];

// ANALYSIS_STEPS will be created dynamically using translations
const getAnalysisSteps = (t) => [
	{ id: 1, label: t.uploadingImages, icon: Upload },
	{ id: 2, label: t.fetchingWeather, icon: CloudRain },
	{ id: 3, label: t.runningDiagnosis, icon: Microscope },
	{ id: 4, label: t.verifyingRef, icon: Shield },
	{ id: 5, label: t.generatingPlan, icon: FileText },
];

const IMAGE_SLOTS = [
	{ id: 0, label: "Leaf Photo 1", description: "Top view of affected leaf" },
	{ id: 1, label: "Leaf Photo 2", description: "Close-up of symptoms" },
	{ id: 2, label: "Leaf Photo 3", description: "Underside or stem area" },
];

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = ({
	onTryFree,
	showBack = false,
	onBack,
	title = null,
	children,
	t = translations.en,
	onLanguageClick,
	currentLang = "en",
	onHome, // New prop for Home navigation
}) => {
	const getLangFlag = (code) => {
		const flags = {
			en: "🇬🇧",
			hi: "🇮🇳",
			mr: "🇮🇳",
			te: "🇮🇳",
			kn: "🇮🇳",
			bn: "🇮🇳",
			ta: "🇮🇳",
		};
		return flags[code] || "🌐";
	};

	return (
		<nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
			<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
				{/* Left - Logo */}
				<div className="flex items-center gap-3">
					{showBack && (
						<button
							type="button"
							onClick={onBack}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
						>
							<ArrowLeft className="w-5 h-5 text-gray-600" />
						</button>
					)}
					{/* Logo is now clickable if onHome is provided */}
					<button
						onClick={onHome}
						className={`flex items-center gap-3 ${onHome ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
					>
						<img
							src="/AGRIVISION.svg"
							alt="AgroVision Logo"
							className="w-10 h-10"
						/>
						<span className="text-xl font-bold text-primary-900">
							{title || "AgroVision"}
						</span>
					</button>
				</div>

				{/* Center - Nav Links */}
				{!showBack && !children && (
					<div className="hidden md:flex items-center gap-6">
						<button
							onClick={onHome}
							className="text-gray-700 hover:text-primary-900 font-semibold px-4 py-2 rounded-lg hover:bg-primary-50 transition-all relative group"
						>
							{t.home}
							<span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
						</button>
						<a
							href="#about"
							className="text-gray-700 hover:text-primary-900 font-semibold px-4 py-2 rounded-lg hover:bg-primary-50 transition-all relative group"
						>
							{t.aboutUs}
							<span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
						</a>
					</div>
				)}

				{/* Right - CTA, Language Selector, or Children */}
				<div className="flex items-center gap-2 sm:gap-3">
					{/* Language Switcher Button - Mobile optimized */}
					<button
						type="button"
						onClick={onLanguageClick}
						className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex-shrink-0"
						title="Change Language"
					>
						<Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
						<span className="text-xs sm:text-sm font-medium">
							{getLangFlag(currentLang)}
						</span>
					</button>{" "}
					{children}
					{!showBack && !children && (
						<button
							type="button"
							onClick={onTryFree}
							className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
						>
							{t.tryForFree}
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

// ============================================
// REALISTIC PHONE MOCKUP COMPONENT
// ============================================
const PhoneMockup = () => (
	<div className="relative perspective-1000">
		{/* Phone Container with 3D effect */}
		<div className="relative transform hover:scale-105 transition-transform duration-500 ease-out">
			{/* Outer Phone Frame - iPhone Style */}
			<div className="relative w-[380px] h-[780px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[3.5rem] p-3 shadow-2xl">
				{/* Inner Shadow for depth */}
				<div className="absolute inset-3 rounded-[3rem] shadow-inner opacity-50"></div>

				{/* Volume Buttons */}
				<div className="absolute left-0 top-32 w-1 h-12 bg-gray-700 rounded-r-sm"></div>
				<div className="absolute left-0 top-48 w-1 h-8 bg-gray-700 rounded-r-sm"></div>
				<div className="absolute left-0 top-60 w-1 h-8 bg-gray-700 rounded-r-sm"></div>

				{/* Power Button */}
				<div className="absolute right-0 top-36 w-1 h-16 bg-gray-700 rounded-l-sm"></div>

				{/* Screen Container */}
				<div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden shadow-xl">
					{/* Screen Reflection Effect */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-30"></div>

					{/* Dynamic Island / Notch */}
					<div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-full z-40 shadow-lg">
						{/* Camera */}
						<div className="absolute top-2 left-4 w-2 h-2 bg-gray-800 rounded-full ring-1 ring-gray-700"></div>
						{/* Proximity Sensor */}
						<div className="absolute top-2.5 right-4 w-8 h-1 bg-gray-900 rounded-full"></div>
					</div>

					{/* Status Bar */}
					<div className="relative pt-4 pb-2 px-8 flex items-center justify-between z-20">
						<div className="flex items-center gap-1 text-white">
							<span className="text-xs font-semibold">9:41</span>
						</div>
						<div className="flex items-center gap-1">
							{/* Signal */}
							<div className="flex gap-0.5">
								<div className="w-0.5 h-2 bg-white rounded-full"></div>
								<div className="w-0.5 h-3 bg-white rounded-full"></div>
								<div className="w-0.5 h-4 bg-white rounded-full"></div>
								<div className="w-0.5 h-5 bg-white rounded-full"></div>
							</div>
							{/* WiFi */}
							<svg
								className="w-4 h-4 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 112 0 1 1 0 01-2 0z" />
							</svg>
							{/* Battery */}
							<div className="flex items-center gap-0.5">
								<div className="w-6 h-3 border border-white rounded-sm relative">
									<div className="absolute inset-0.5 bg-white rounded-sm"></div>
								</div>
								<div className="w-0.5 h-1.5 bg-white rounded-r-sm"></div>
							</div>
						</div>
					</div>

					{/* App Content */}
					<div className="relative h-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-y-auto px-5 pb-20">
						{/* App Header */}
						<div className="pt-6 pb-4">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-3">
									<img
										src="/AGRIVISION.svg"
										alt="AgroVision Logo"
										className="w-12 h-12"
									/>
									<div>
										<h1 className="text-lg font-bold text-gray-900">
											AgriVision
										</h1>
										<p className="text-xs text-gray-500">AI Crop Doctor</p>
									</div>
								</div>
								<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
									<User className="w-5 h-5 text-gray-600" />
								</div>
							</div>

							{/* Stats Cards */}
							<div className="grid grid-cols-3 gap-2 mb-6">
								<div className="bg-white rounded-xl p-3 shadow-sm">
									<div className="text-2xl font-bold text-primary-600">94%</div>
									<div className="text-xs text-gray-500">Accuracy</div>
								</div>
								<div className="bg-white rounded-xl p-3 shadow-sm">
									<div className="text-2xl font-bold text-orange-500">50K+</div>
									<div className="text-xs text-gray-500">Farmers</div>
								</div>
								<div className="bg-white rounded-xl p-3 shadow-sm">
									<div className="text-2xl font-bold text-green-600">15+</div>
									<div className="text-xs text-gray-500">Diseases</div>
								</div>
							</div>
						</div>

						{/* Diagnosis Card */}
						<div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
							<div className="flex items-start gap-3 mb-4">
								<div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
									<CheckCircle className="w-7 h-7 text-white" />
								</div>
								<div className="flex-1">
									<h3 className="font-bold text-gray-900 mb-1">
										Diagnosis Complete
									</h3>
									<p className="text-sm text-gray-600">
										Early Blight detected with high confidence
									</p>
								</div>
							</div>

							{/* Progress Bar */}
							<div className="mb-4">
								<div className="flex justify-between text-xs text-gray-500 mb-1">
									<span>Confidence Level</span>
									<span className="font-semibold text-primary-600">94%</span>
								</div>
								<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
									<div className="h-full w-[94%] bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
								</div>
							</div>

							{/* Weather Info */}
							<div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl mb-4">
								<CloudRain className="w-4 h-4 text-blue-600" />
								<span className="text-xs text-gray-700">
									Weather data verified • High humidity
								</span>
							</div>

							{/* CTA Button */}
							<button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
								View Treatment Plan
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>

						{/* Quick Actions */}
						<div className="grid grid-cols-2 gap-3 mt-5">
							<button className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow flex items-center gap-3">
								<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
									<Microscope className="w-5 h-5 text-purple-600" />
								</div>
								<div className="text-left">
									<div className="font-semibold text-sm text-gray-900">
										History
									</div>
									<div className="text-xs text-gray-500">12 scans</div>
								</div>
							</button>
							<button className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow flex items-center gap-3">
								<div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
									<MessageSquare className="w-5 h-5 text-amber-600" />
								</div>
								<div className="text-left">
									<div className="font-semibold text-sm text-gray-900">
										AI Chat
									</div>
									<div className="text-xs text-gray-500">Ask me</div>
								</div>
							</button>
						</div>
					</div>

					{/* Home Indicator */}
					<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full"></div>
				</div>
			</div>

			{/* Shadow and Glow Effects */}
			<div className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 via-transparent to-orange-500/20 rounded-[4rem] blur-3xl -z-10 opacity-60"></div>
		</div>
	</div>
);

// ============================================
// IMAGE UPLOAD SLOT COMPONENT
// ============================================
const ImageSlot = ({ slot, file, preview, onSelect, onRemove }) => {
	const inputRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleChange = (e) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			onSelect(slot.id, selectedFile);
		}
		// Reset input so same file can be selected again
		e.target.value = "";
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const droppedFile = e.dataTransfer.files?.[0];
		if (droppedFile && droppedFile.type.startsWith("image/")) {
			onSelect(slot.id, droppedFile);
		}
	};

	return (
		<div className="relative group">
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				capture="environment"
				onChange={handleChange}
				className="hidden"
			/>

			{preview ? (
				// Premium Image Preview
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: "spring", stiffness: 300, damping: 25 }}
					className="relative"
				>
					<div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg ring-2 ring-primary-500/30 hover:ring-primary-500/50 transition-all duration-300">
						{/* Gradient overlay on hover */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
						<img
							src={preview}
							alt={slot.label}
							className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
						/>
						{/* Success Badge */}
						<motion.div
							initial={{ scale: 0, y: 10 }}
							animate={{ scale: 1, y: 0 }}
							transition={{ delay: 0.2, type: "spring" }}
							className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-20"
						>
							<CheckCircle className="w-3.5 h-3.5" />
							{slot.label}
						</motion.div>
					</div>
					{/* Premium Remove Button */}
					<motion.button
						type="button"
						onClick={() => onRemove(slot.id)}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className="absolute -top-2 -right-2 bg-white text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-xl shadow-lg transition-all duration-200 z-30 ring-2 ring-white"
					>
						<Trash2 className="w-4 h-4" />
					</motion.button>
				</motion.div>
			) : (
				// Premium Empty Slot
				<motion.button
					type="button"
					onClick={handleClick}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					whileHover={{ y: -4 }}
					whileTap={{ scale: 0.98 }}
					animate={{
						borderColor: isDragging ? "rgb(16 185 129)" : "rgb(226 232 240)",
						scale: isDragging ? 1.02 : 1,
					}}
					transition={{ duration: 0.2 }}
					className={`w-full aspect-square rounded-2xl border-2 border-dashed bg-gradient-to-br from-slate-50 to-white hover:from-primary-50/50 hover:to-white flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:border-primary-400 ${isDragging ? "border-emerald-500 bg-emerald-50/50" : ""}`}
				>
					{/* Icon Container */}
					<div className="relative">
						<motion.div
							animate={{
								scale: isDragging ? [1, 1.2, 1] : 1,
							}}
							transition={{ duration: 0.6, repeat: isDragging ? Infinity : 0 }}
							className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragging ? "bg-emerald-100" : "bg-slate-100 group-hover:bg-primary-100"}`}
						>
							<Camera
								className={`w-6 h-6 transition-colors duration-300 ${isDragging ? "text-emerald-600" : "text-slate-400 group-hover:text-primary-600"}`}
							/>
						</motion.div>
						{/* Animated ring on drag */}
						{isDragging && (
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1.5, opacity: 0 }}
								transition={{ duration: 1, repeat: Infinity }}
								className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
							/>
						)}
					</div>
					{/* Labels */}
					<div className="text-center px-2">
						<p className={`font-semibold text-sm transition-colors duration-300 ${isDragging ? "text-emerald-600" : "text-slate-700"}`}>
							{isDragging ? "Drop to upload" : slot.label}
						</p>
						<p className="text-xs text-slate-400 mt-1 leading-relaxed">
							{isDragging ? "Release to add image" : slot.description}
						</p>
					</div>
					{/* Action hint */}
					<div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${isDragging ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
						<ImagePlus className="w-3 h-3" />
						<span>{isDragging ? "Release now" : "Tap or drag"}</span>
					</div>
				</motion.button>
			)}
		</div>
	);
};

// ============================================
// GAMIFICATION COMPONENTS
// ============================================

// Confetti Component - Premium Color Palette
const Confetti = () => {
	const particles = Array.from({ length: 50 });
	const colors = [
		"#10b981", // primary-500 emerald
		"#059669", // primary-600
		"#f59e0b", // secondary-500 amber
		"#d97706", // secondary-600
		"#8b5cf6", // accent-500 violet
		"#7c3aed", // accent-600
		"#06b6d4", // cyan-500
		"#fbbf24", // amber-400
	];

	return (
		<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
			{particles.map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-3 h-3 rounded-sm"
					style={{
						backgroundColor: colors[i % colors.length],
						left: `${Math.random() * 100}%`,
						top: -20,
					}}
					initial={{ y: -20, opacity: 1, rotate: 0, scale: 1 }}
					animate={{
						y: window.innerHeight + 20,
						opacity: 0,
						rotate: Math.random() * 720 - 360,
						x: (Math.random() - 0.5) * 300,
						scale: Math.random() * 0.5 + 0.5,
					}}
					transition={{
						duration: 2.5 + Math.random() * 2,
						ease: "easeOut",
						delay: Math.random() * 0.3,
					}}
				/>
			))}
		</div>
	);
};

// Achievement Notification
const AchievementNotification = ({ achievement }) => {
	const getIcon = () => {
		switch (achievement.type) {
			case "level":
				return <Trophy className="w-6 h-6 text-yellow-300" />;
			case "badge":
				return <Award className="w-6 h-6 text-yellow-300" />;
			case "points":
				return <Star className="w-6 h-6 text-yellow-300" />;
			default:
				return <Zap className="w-6 h-6 text-yellow-300" />;
		}
	};

	return (
		<motion.div
			initial={{ y: -100, opacity: 0, scale: 0.8 }}
			animate={{ y: 20, opacity: 1, scale: 1 }}
			exit={{ y: -100, opacity: 0, scale: 0.8 }}
			className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"
		>
			<div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]">
				<motion.div
					animate={{ rotate: [0, 360] }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
				>
					{getIcon()}
				</motion.div>
				<div>
					<p className="font-bold text-lg">{achievement.message}</p>
				</div>
			</div>
		</motion.div>
	);
};

// Discount Unlock Popup
const DiscountPopup = ({ discount, onClose }) => {
	if (!discount) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.8, y: 50, opacity: 0 }}
				animate={{ scale: 1, y: 0, opacity: 1 }}
				exit={{ scale: 0.8, y: 50, opacity: 0 }}
				transition={{ type: "spring", damping: 15 }}
				className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="text-center">
					{/* Success Icon */}
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
						className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
					>
						<Award className="w-12 h-12 text-white" />
					</motion.div>

					{/* Title */}
					<h2 className="text-3xl font-bold text-gray-900 mb-3">
						🎉 Congratulations! 🎉
					</h2>

					{/* Discount Info */}
					<div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border-2 border-green-200">
						<p className="text-6xl font-black text-green-600 mb-2">
							{discount}%
						</p>
						<p className="text-xl font-bold text-gray-800 mb-3">
							Discount Unlocked!
						</p>
						<p className="text-sm text-gray-700 leading-relaxed">
							You've unlocked a{" "}
							<span className="font-bold text-green-600">
								{discount}% discount
							</span>{" "}
							on fruit plants from your local departmental farms under the{" "}
							<span className="font-bold">POSHAKA SAMRUDHI MISSION</span>
						</p>
					</div>

					{/* Additional Info */}
					<p className="text-xs text-gray-500 mb-6 leading-relaxed">
						Visit your nearest departmental farm and show your learning progress
						to claim this exclusive discount!
					</p>

					{/* Close Button */}
					<button
						onClick={onClose}
						className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
					>
						Awesome! Continue Learning
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};

// Points Earned Animation
const PointsEarned = ({ points }) => {
	if (!points) return null;

	return (
		<motion.div
			initial={{ y: 0, opacity: 1 }}
			animate={{ y: -50, opacity: 0 }}
			className="fixed top-24 right-8 z-40"
		>
			<div className="bg-gradient-to-r from-secondary-400 to-secondary-600 text-white px-4 py-2 rounded-full shadow-lg font-bold text-lg flex items-center gap-2">
				<Coins className="w-5 h-5" />+{points} XP
			</div>
		</motion.div>
	);
};

// Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (progress / 100) * circumference;

	return (
		<svg width={size} height={size} className="transform -rotate-90">
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke="currentColor"
				strokeWidth={strokeWidth}
				fill="none"
				className="text-gray-200"
			/>
			<motion.circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke="currentColor"
				strokeWidth={strokeWidth}
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				className="text-primary-600"
				initial={{ strokeDashoffset: circumference }}
				animate={{ strokeDashoffset: offset }}
				transition={{ duration: 1, ease: "easeOut" }}
			/>
		</svg>
	);
};

// Gamification Header
// Gamification Header
const GamificationHeader = ({ points, level, streak, totalScans }) => {
	const progressToNextLevel = points % 100;

	const containerVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white p-6 rounded-3xl shadow-2xl mb-8 border border-white/10"
		>
			{/* Background Decorative Elements */}
			<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
			<div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

			<div className="relative z-10 grid grid-cols-4 gap-4 text-center">
				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center"
				>
					<div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg border border-white/10">
						<Trophy className="w-5 h-5 text-yellow-300 drop-shadow-md" />
					</div>
					<span className="text-xs font-medium text-emerald-100 tracking-wide uppercase mb-0.5">
						Level
					</span>
					<div className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
						{level}
					</div>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center"
				>
					<div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg border border-white/10">
						<Star className="w-5 h-5 text-amber-300 drop-shadow-md" />
					</div>
					<span className="text-xs font-medium text-emerald-100 tracking-wide uppercase mb-0.5">
						XP
					</span>
					<div className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
						{points}
					</div>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center"
				>
					<div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg border border-white/10">
						<Flame className="w-5 h-5 text-orange-400 drop-shadow-md" />
					</div>
					<span className="text-xs font-medium text-emerald-100 tracking-wide uppercase mb-0.5">
						Streak
					</span>
					<div className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
						{streak}
					</div>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center"
				>
					<div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg border border-white/10">
						<Camera className="w-5 h-5 text-blue-200 drop-shadow-md" />
					</div>
					<span className="text-xs font-medium text-emerald-100 tracking-wide uppercase mb-0.5">
						Scans
					</span>
					<div className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
						{totalScans}
					</div>
				</motion.div>
			</div>

			<motion.div variants={itemVariants} className="mt-6 relative">
				<div className="flex justify-between text-xs font-medium text-emerald-50 mb-2 px-1">
					<span>Progress to Level {level + 1}</span>
					<span className="font-bold">{progressToNextLevel}/100 XP</span>
				</div>
				<div className="w-full bg-black/20 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/5">
					<motion.div
						className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
						initial={{ width: 0 }}
						animate={{ width: `${progressToNextLevel}%` }}
						transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
					/>
				</div>
			</motion.div>
		</motion.div>
	);
};

// ============================================
// MAIN APP COMPONENT
// ============================================
// Safe storage helpers to handle incognito/restricted modes
const safeGetItem = (key) => {
	try {
		return sessionStorage.getItem(key);
	} catch (e) {
		console.warn("Storage access denied:", e);
		return null;
	}
};

const safeSetItem = (key, value) => {
	try {
		sessionStorage.setItem(key, value);
	} catch (e) {
		console.warn("Storage access denied:", e);
	}
};

// ============================================
export default function App() {
	// Language State - Check if language was previously selected
	const [language, setLanguage] = useState(() => {
		return safeGetItem("preferredLanguage") || null;
	});
	const [showLanguageSelector, setShowLanguageSelector] = useState(!language);

	// Get translations for current language
	const t = translations[language] || translations.en;

	// Handle language selection
	const handleLanguageSelect = (langCode) => {
		setLanguage(langCode);
		safeSetItem("preferredLanguage", langCode);
		setShowLanguageSelector(false);

		// Show success toast
		const languageNames = {
			en: "English",
			hi: "हिंदी",
			mr: "मराठी",
			te: "తెలుగు",
			kn: "ಕನ್ನಡ",
			bn: "বাংলা",
			ta: "தமிழ்",
		};
		toast.success(`Language changed to ${languageNames[langCode]} 🌍`, {
			duration: 2000,
			icon: "✨",
		});
	};

	// App State - Start at LANDING page
	const [appState, setAppState] = useState(STATES.LANDING);
	const [currentStep, setCurrentStep] = useState(0);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	// Multi-Step Form State
	const [formStep, setFormStep] = useState(FORM_STEPS.IMAGES);

	// Gamification State
	const [userPoints, setUserPoints] = useState(() => {
		return parseInt(safeGetItem("userPoints") || "0");
	});
	const [userLevel, setUserLevel] = useState(() => {
		return parseInt(safeGetItem("userLevel") || "1");
	});
	const [totalScans, setTotalScans] = useState(() => {
		return parseInt(safeGetItem("totalScans") || "0");
	});
	const [streak, setStreak] = useState(() => {
		return parseInt(safeGetItem("streak") || "0");
	});
	const [badges, setBadges] = useState(() => {
		const saved = safeGetItem("badges");
		return saved ? JSON.parse(saved) : [];
	});
	const [showAchievement, setShowAchievement] = useState(null);
	const [showConfetti, setShowConfetti] = useState(false);
	const [earnedPoints, setEarnedPoints] = useState(0);

	// Form State
	const [formData, setFormData] = useState({
		lat: "",
		lon: "",
		farmer_name: "",
		village: "",
		crop_name: "Apple",
		sown_date: "",
		observations: "",
	});

	// Academy State
	const [activeUnit, setActiveUnit] = useState("unit_1");
	const [completedNodes, setCompletedNodes] = useState(() => {
		const saved = safeGetItem("completedNodes");
		return saved ? JSON.parse(saved) : [];
	});
	// New State for Daily Missions Persistence
	const [myMissions, setMyMissions] = useState(() => {
		const saved = safeGetItem("myMissions");
		// If saved, use it. If not, use the default from getDailyMissions (and maybe reset daily in a real app)
		const currentLang = safeGetItem("preferredLanguage") || "en";
		const t = translations[currentLang] || translations.en;
		return saved ? JSON.parse(saved) : getDailyMissions(t);
	});
	const [currentQuiz, setCurrentQuiz] = useState(null); // { nodeId, questions, currentQuestionIndex, score }
	const [calibrationData, setCalibrationData] = useState(null);
	const [showDiscountPopup, setShowDiscountPopup] = useState(null); // null, 50, or 100

	// Image Slots State - Array of 3 slots
	const [imageSlots, setImageSlots] = useState([null, null, null]);
	const [imagePreviews, setImagePreviews] = useState([null, null, null]);
	const [isGettingLocation, setIsGettingLocation] = useState(false);

	// Chat State
	const [chatMessages, setChatMessages] = useState([
		{
			role: "assistant",
			content:
				"I've analyzed your crop. Feel free to ask any questions about the diagnosis or treatment plan!",
		},
	]);
	const [chatInput, setChatInput] = useState("");

	// Refs
	const formRef = useRef(null);
	const chatEndRef = useRef(null);

	// Check if all 3 images are uploaded
	const allImagesUploaded = imageSlots.every((slot) => slot !== null);
	const uploadedCount = imageSlots.filter((slot) => slot !== null).length;

	// Scroll to chat end
	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatMessages]);

	// Trigger confetti for high confidence results
	useEffect(() => {
		if (result && appState === STATES.RESULT) {
			const confidence = (result.final_result?.confidence_score * 100).toFixed(
				0,
			);
			if (confidence >= 80) {
				setTimeout(() => {
					confetti({
						particleCount: 150,
						spread: 80,
						origin: { y: 0.6 },
						colors: ["#22c55e", "#f97316", "#3b82f6", "#fbbf24"],
					});
				}, 500);
			}
		}
	}, [result, appState]);

	// ============================================
	// HANDLERS
	// ============================================
	const getLocation = () => {
		// Check if geolocation is supported
		if (!navigator.geolocation) {
			toast.error("Geolocation is not supported by your browser", {
				duration: 4000,
			});
			return;
		}

		// Check if running on HTTPS (required for mobile browsers)
		if (
			window.location.protocol !== "https:" &&
			window.location.hostname !== "localhost"
		) {
			toast.error(
				"Location access requires HTTPS connection on mobile devices",
				{
					duration: 5000,
				},
			);
			return;
		}

		setIsGettingLocation(true);
		const loadingToast = toast.loading("Getting your location... 📍");

		// Try with lower accuracy first for better mobile compatibility
		const options = {
			enableHighAccuracy: false, // Start with lower accuracy for faster response
			timeout: 15000, // 15 seconds timeout for mobile
			maximumAge: 30000, // Accept 30-second old position
		};

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setFormData((prev) => ({
					...prev,
					lat: pos.coords.latitude.toFixed(6),
					lon: pos.coords.longitude.toFixed(6),
				}));
				setIsGettingLocation(false);
				toast.dismiss(loadingToast);
				toast.success("Location captured successfully! 🎯", {
					icon: "📍",
					duration: 2000,
				});
			},
			(error) => {
				let errorMessage = "";
				let helpText = "";

				// Provide specific error messages based on error code
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage = "Location access denied";
						helpText =
							"To enable: Go to Settings > Safari > Location Services > Allow";
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = "Location unavailable";
						helpText =
							"Please ensure Location Services are enabled in your device settings";
						break;
					case error.TIMEOUT:
						errorMessage = "Location request timed out";
						helpText = "Please ensure GPS is enabled and try again";
						break;
					default:
						errorMessage = "Could not get location";
						helpText = "Please check your device location settings";
						break;
				}

				setError(errorMessage);
				setIsGettingLocation(false);
				toast.dismiss(loadingToast);
				toast.error(
					<div>
						<div className="font-bold">{errorMessage}</div>
						<div className="text-xs mt-1">{helpText}</div>
					</div>,
					{
						duration: 7000,
					},
				);
			},
			options,
		);
	};

	const handleImageSelect = (slotId, file) => {
		const newSlots = [...imageSlots];
		const newPreviews = [...imagePreviews];

		// Revoke old preview URL if exists
		if (newPreviews[slotId]) {
			URL.revokeObjectURL(newPreviews[slotId]);
		}

		newSlots[slotId] = file;
		newPreviews[slotId] = URL.createObjectURL(file);

		setImageSlots(newSlots);
		setImagePreviews(newPreviews);

		// Toast notification for image upload
		toast.success(`Image ${slotId + 1} uploaded successfully! 📸`, {
			duration: 2000,
			icon: "✅",
		});
	};

	const handleImageRemove = (slotId) => {
		const newSlots = [...imageSlots];
		const newPreviews = [...imagePreviews];

		// Revoke preview URL
		if (newPreviews[slotId]) {
			URL.revokeObjectURL(newPreviews[slotId]);
		}

		newSlots[slotId] = null;
		newPreviews[slotId] = null;

		setImageSlots(newSlots);
		setImagePreviews(newPreviews);

		// Toast notification for image removal
		toast(`Image ${slotId + 1} removed`, {
			icon: "🗑️",
			duration: 1500,
		});
	};

	// Gamification Functions
	const awardPoints = (points, message) => {
		const newPoints = userPoints + points;
		setUserPoints(newPoints);
		setEarnedPoints(points);
		safeSetItem("userPoints", newPoints.toString());

		// Check for level up (every 100 points)
		const newLevel = Math.floor(newPoints / 100) + 1;
		if (newLevel > userLevel) {
			setUserLevel(newLevel);
			safeSetItem("userLevel", newLevel.toString());
			showAchievementNotification(`🎉 Level ${newLevel} Unlocked!`, "level");
			setShowConfetti(true);
			setTimeout(() => setShowConfetti(false), 3000);
		} else if (message) {
			showAchievementNotification(message, "points");
		}

		// Clear earned points after animation
		setTimeout(() => setEarnedPoints(0), 2000);
	};

	const showAchievementNotification = (message, type) => {
		setShowAchievement({ message, type });
		setTimeout(() => setShowAchievement(null), 3000);
	};

	const checkAndAwardBadge = (badgeId, badgeName, condition) => {
		if (condition && !badges.includes(badgeId)) {
			const newBadges = [...badges, badgeId];
			setBadges(newBadges);
			safeSetItem("badges", JSON.stringify(newBadges));
			showAchievementNotification(`🏆 Badge Earned: ${badgeName}!`, "badge");
			awardPoints(50, "");
		}
	};

	const scrollToForm = () => {
		console.log("scrollToForm called, setting state to FORM");
		setAppState(STATES.FORM);
		setFormStep(FORM_STEPS.IMAGES); // Reset to first step
		awardPoints(5, "Started new scan!");
		console.log("State set, formStep:", FORM_STEPS.IMAGES);
		setTimeout(() => {
			console.log("Scrolling to form, formRef:", formRef.current);
			formRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	};

	// Form Step Navigation
	const nextFormStep = () => {
		// Validate current step before proceeding
		if (formStep === FORM_STEPS.IMAGES && !allImagesUploaded) {
			setError(t.uploadImages + " (3/3)");
			return;
		}
		if (formStep === FORM_STEPS.FARMER_INFO) {
			if (!formData.farmer_name || !formData.village) {
				setError("Please fill in all required fields.");
				return;
			}
		}
		if (formStep === FORM_STEPS.CROP_INFO) {
			if (!formData.crop_name) {
				setError("Please select a crop.");
				return;
			}
		}

		setError(null);
		// Award points for completing steps
		if (formStep === FORM_STEPS.IMAGES) {
			awardPoints(20, "📸 Photos uploaded!");
			checkAndAwardBadge("photographer", "Photographer", true);
		} else if (formStep === FORM_STEPS.LOCATION) {
			awardPoints(10, "📍 Location added!");
		} else if (formStep === FORM_STEPS.FARMER_INFO) {
			awardPoints(15, "👤 Profile completed!");
		}

		if (formStep < FORM_STEPS.CROP_INFO) {
			setFormStep(formStep + 1);
		}
	};

	const prevFormStep = () => {
		setError(null);
		if (formStep > FORM_STEPS.IMAGES) {
			setFormStep(formStep - 1);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		// Validation
		if (!formData.farmer_name || !formData.village || !formData.crop_name) {
			setError("Please fill in all required fields.");
			toast.error("Please fill in all required fields", { icon: "⚠️" });
			return;
		}
		if (!allImagesUploaded) {
			setError("Please upload all 3 leaf photos before analyzing.");
			toast.error("Please upload all 3 leaf photos", { icon: "📸" });
			return;
		}

		setAppState(STATES.ANALYZING);
		setCurrentStep(0);
		awardPoints(30, "🎯 Analysis started!");

		// Show loading toast
		const loadingToast = toast.loading(
			"Analyzing your crop... This may take a moment 🔬",
		);

		// Update total scans
		const newScans = totalScans + 1;
		setTotalScans(newScans);
		safeSetItem("totalScans", newScans.toString());

		// Check for milestone badges
		checkAndAwardBadge("first_scan", "First Scan", newScans === 1);
		checkAndAwardBadge("experienced", "Experienced Farmer", newScans === 5);
		checkAndAwardBadge("expert", "Expert Diagnostician", newScans === 10);

		// Simulate progress
		const analysisSteps = getAnalysisSteps(t);
		const stepInterval = setInterval(() => {
			setCurrentStep((prev) => {
				if (prev >= analysisSteps.length - 1) {
					clearInterval(stepInterval);
					return prev;
				}
				return prev + 1;
			});
		}, 1500);

		try {
			const submitData = new FormData();
			submitData.append("lat", parseFloat(formData.lat || "18.5204"));
			submitData.append("lon", parseFloat(formData.lon || "73.8567"));
			submitData.append("farmer_name", formData.farmer_name);
			submitData.append("village", formData.village);
			submitData.append("crop_name", formData.crop_name);
			submitData.append("sown_date", formData.sown_date || "");
			submitData.append("observations", formData.observations || "");

			// Append all 3 images with key "files"
			let imageCount = 0;
			imageSlots.forEach((file) => {
				if (file) {
					submitData.append("files", file);
					imageCount++;
				}
			});

			// Debug logging
			console.log("Submitting to:", `${API_URL}/analyze`);
			console.log("Form data:", {
				lat: formData.lat,
				lon: formData.lon,
				farmer_name: formData.farmer_name,
				village: formData.village,
				crop_name: formData.crop_name,
				imageCount: imageCount,
			});

			const response = await axios.post(`${API_URL}/analyze`, submitData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			clearInterval(stepInterval);
			setCurrentStep(analysisSteps.length);

			// Dismiss loading toast and show success
			toast.dismiss(loadingToast);
			toast.success("Analysis complete! 🎉", { duration: 3000 });

			setTimeout(() => {
				setResult(response.data);
				setAppState(STATES.RESULT);

				// Trigger confetti for successful analysis
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 },
					colors: ["#22c55e", "#f97316", "#3b82f6"],
				});
			}, 500);
		} catch (err) {
			clearInterval(stepInterval);

			// Dismiss loading toast
			toast.dismiss(loadingToast);

			// Log full error for debugging
			console.error("Analysis error:", err);
			console.error("Error response:", err.response);
			console.error("Error message:", err.message);

			// Handle detailed error messages from backend
			let errorMessage = "Analysis failed. Please try again.";

			// Check if it's a network error
			if (!err.response) {
				if (err.message === "Network Error") {
					errorMessage =
						"Cannot connect to server. Please check:\n1. Backend is running on 192.168.18.178:8000\n2. Both devices are on same WiFi\n3. Firewall allows connections";
				} else {
					errorMessage = `Network error: ${err.message}`;
				}
			} else if (err.response?.data?.detail) {
				const detail = err.response.data.detail;

				// If detail is an object with structured error info
				if (typeof detail === "object" && detail.message) {
					errorMessage = detail.message;

					// Add suggestion if available
					if (detail.suggestion) {
						errorMessage += ` ${detail.suggestion}`;
					}

					// Add reasoning for invalid images
					if (detail.error === "invalid_image" && detail.reasoning) {
						errorMessage = `❌ ${detail.message}\n\n${detail.reasoning}\n\n${detail.suggestion || ""}`;
					}
				} else if (typeof detail === "string") {
					// If detail is just a string
					errorMessage = detail;
				}
			} else if (err.response?.status) {
				errorMessage = `Server error (${err.response.status}): ${err.response.statusText || "Unknown error"}`;
			}

			setError(errorMessage);
			setAppState(STATES.FORM);

			// Show error toast with more details
			toast.error(
				<div>
					<div className="font-bold">{errorMessage.split("\n")[0]}</div>
					{errorMessage.includes("\n") && (
						<div className="text-xs mt-1 opacity-90">
							{errorMessage.split("\n").slice(1).join("\n")}
						</div>
					)}
				</div>,
				{
					duration: 8000,
					icon: "❌",
				},
			);
		}
	};
	// ============================================
	// RENDER: CALIBRATION QUIZ
	// ============================================
	const renderCalibration = () => {
		// Initialize calibration data if not set
		if (!calibrationData) {
			setCalibrationData({
				soilFertility: null,
				pestAttacks: null,
				irrigationCost: null,
			});
		}

		const handleCalibrationSubmit = (e) => {
			e.preventDefault();
			// In a real app, we'd use the answers to customize the path ID
			// For now, we simulate "Saving" and then go to Academy
			setAppState(STATES.ACADEMY);
			awardPoints(50, "Calibration Complete!");
		};

		const updateCalibration = (field, value) => {
			setCalibrationData((prev) => ({
				...prev,
				[field]: value,
			}));
		};

		return (
			<div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
				<div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<CheckSquare className="w-8 h-8 text-green-600" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							{t.calibrationTitle || "Personalize Your Path"}
						</h2>
						<p className="text-gray-600">
							{t.calibrationDesc ||
								"Answer a few questions to get a custom learning plan."}
						</p>
					</div>

					<form onSubmit={handleCalibrationSubmit} className="space-y-6">
						<div>
							<label className="block text-gray-700 font-semibold mb-2">
								How is your soil fertility?
							</label>
							<div className="grid grid-cols-2 gap-4">
								<button
									type="button"
									onClick={() => updateCalibration("soilFertility", "low")}
									className={`p-4 border rounded-xl transition ${
										calibrationData?.soilFertility === "low"
											? "bg-green-100 border-green-500 ring-2 ring-green-500"
											: "hover:bg-green-50 hover:border-green-500"
									}`}
								>
									Low / Poor
								</button>
								<button
									type="button"
									onClick={() => updateCalibration("soilFertility", "good")}
									className={`p-4 border rounded-xl transition ${
										calibrationData?.soilFertility === "good"
											? "bg-green-100 border-green-500 ring-2 ring-green-500"
											: "hover:bg-green-50 hover:border-green-500"
									}`}
								>
									Good / Rich
								</button>
							</div>
						</div>

						<div>
							<label className="block text-gray-700 font-semibold mb-2">
								Do you face pest attacks often?
							</label>
							<div className="grid grid-cols-2 gap-4">
								<button
									type="button"
									onClick={() => updateCalibration("pestAttacks", "frequent")}
									className={`p-4 border rounded-xl transition ${
										calibrationData?.pestAttacks === "frequent"
											? "bg-green-100 border-green-500 ring-2 ring-green-500"
											: "hover:bg-green-50 hover:border-green-500"
									}`}
								>
									Yes, frequently
								</button>
								<button
									type="button"
									onClick={() => updateCalibration("pestAttacks", "rare")}
									className={`p-4 border rounded-xl transition ${
										calibrationData?.pestAttacks === "rare"
											? "bg-green-100 border-green-500 ring-2 ring-green-500"
											: "hover:bg-green-50 hover:border-green-500"
									}`}
								>
									Rarely
								</button>
							</div>
						</div>

						<div>
							<label className="block text-gray-700 font-semibold mb-2">
								Is irrigation water expensive?
							</label>
							<div className="grid grid-cols-2 gap-4">
								<button
									type="button"
									onClick={() =>
										updateCalibration("irrigationCost", "expensive")
									}
									className={`p-4 border rounded-xl transition ${
										calibrationData?.irrigationCost === "expensive"
											? "bg-green-100 border-green-500 ring-2 ring-green-500"
											: "hover:bg-green-50 hover:border-green-500"
									}`}
								>
									Yes, very
								</button>
								<button
									type="button"
									onClick={() => updateCalibration("irrigationCost", "okay")}
									className={`p-4 border rounded-xl transition ${
										calibrationData?.irrigationCost === "okay"
											? "bg-green-100 border-green-500 ring-2 ring-green-500"
											: "hover:bg-green-50 hover:border-green-500"
									}`}
								>
									No, usually okay
								</button>
							</div>
						</div>

						<button
							type="submit"
							className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
						>
							Create My Plan
						</button>
					</form>
				</div>
			</div>
		);
	};

	// ============================================
	// RENDER: QUIZ / LESSON
	// ============================================
	const StartNode = (node) => {
		if (node.type === "lesson") {
			const quizContent = node.content.find((c) => c.type === "quiz");
			if (quizContent) {
				setCurrentQuiz({
					nodeId: node.id,
					questions: [
						{ question: quizContent.question, options: quizContent.options },
					],
					currentIndex: 0,
					score: 0,
					showResult: false,
				});
			} else {
				setCurrentQuiz({
					nodeId: node.id,
					questions: [],
					content: node.content,
					currentIndex: 0,
					isLesson: true,
				});
			}
		} else if (node.type === "quiz_review") {
			setCurrentQuiz({
				nodeId: node.id,
				questions: node.questions,
				currentIndex: 0,
				score: 0,
			});
		}
		setAppState(STATES.QUIZ);
	};

	const handleQuizAnswer = (isCorrect) => {
		if (isCorrect) {
			awardPoints(5, "Correct Answer!");
			const newScore = (currentQuiz.score || 0) + 1;
			setCurrentQuiz((prev) => ({
				...prev,
				score: newScore,
				answerStatus: "correct",
			}));
		} else {
			// Deduct XP for wrong answer
			awardPoints(-3, "Wrong Answer!");
			setCurrentQuiz((prev) => ({ ...prev, answerStatus: "incorrect" }));
		}

		setTimeout(() => {
			setCurrentQuiz((prev) => {
				const nextIndex = prev.currentIndex + 1;
				if (nextIndex >= (prev.questions ? prev.questions.length : 0)) {
					completeNode(prev.nodeId);
					return { ...prev, showResult: true };
				}
				return { ...prev, currentIndex: nextIndex, answerStatus: null };
			});
		}, 1500);
	};

	const completeNode = (nodeId) => {
		if (!completedNodes.includes(nodeId)) {
			const newCompleted = [...completedNodes, nodeId];
			setCompletedNodes(newCompleted);
			safeSetItem("completedNodes", JSON.stringify(newCompleted));
			awardPoints(20, "Lesson Completed!");
			if (newCompleted.length % 3 === 0) {
				checkAndAwardBadge("scholar", "Scholar", true);
			}

			// Check if Unit 4 is completed (50% discount unlock)
			const unit4Nodes = ["u4_n1", "u4_n2", "u4_n3", "u4_n4"];
			const unit4Completed = unit4Nodes.every((node) =>
				newCompleted.includes(node),
			);
			const unit4WasNotCompleted = !unit4Nodes.every((node) =>
				completedNodes.includes(node),
			);

			if (unit4Completed && unit4WasNotCompleted) {
				setTimeout(() => {
					setShowDiscountPopup(50);
					setShowConfetti(true);
					setTimeout(() => setShowConfetti(false), 5000);
				}, 1500);
			}

			// Check if Unit 5 is completed (100% discount unlock)
			const unit5Nodes = ["u5_n1"];
			const unit5Completed = unit5Nodes.every((node) =>
				newCompleted.includes(node),
			);
			const unit5WasNotCompleted = !unit5Nodes.every((node) =>
				completedNodes.includes(node),
			);

			if (unit5Completed && unit5WasNotCompleted) {
				setTimeout(() => {
					setShowDiscountPopup(100);
					setShowConfetti(true);
					setTimeout(() => setShowConfetti(false), 5000);
				}, 1500);
			}
		}
	};

	const renderQuiz = () => {
		if (!currentQuiz) return null;

		if (currentQuiz.showResult) {
			return (
				<div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
					<div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md w-full">
						<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<Award className="w-10 h-10 text-green-600" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Lesson Complete!
						</h2>
						<p className="text-gray-600 mb-8">+20 XP Earned</p>
						<button
							onClick={() => {
								setCurrentQuiz(null);
								setAppState(STATES.ACADEMY);
							}}
							className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
						>
							Continue Learning
						</button>
					</div>
				</div>
			);
		}

		if (currentQuiz.isLesson && currentQuiz.content) {
			return (
				<div className="min-h-screen bg-white p-6 flex flex-col">
					<div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
						<Sprout className="w-16 h-16 text-green-500 mb-6" />
						{currentQuiz.content.map((block, i) => (
							<div key={i} className="mb-6">
								{block.type === "text" && (
									<p className="text-2xl font-medium text-gray-800 leading-relaxed">
										{block.text}
									</p>
								)}
							</div>
						))}
					</div>
					<button
						onClick={() => {
							completeNode(currentQuiz.nodeId);
							setCurrentQuiz((prev) => ({ ...prev, showResult: true }));
						}}
						className="w-full bg-green-600 text-white font-bold py-4 rounded-xl text-xl"
					>
						Got it!
					</button>
				</div>
			);
		}

		const question = currentQuiz.questions[currentQuiz.currentIndex];

		return (
			<div className="min-h-screen bg-gray-50 flex flex-col">
				<div className="bg-white p-4 shadow-sm flex items-center justify-between">
					<button onClick={() => setAppState(STATES.FORM)} className="p-2">
						<X className="w-6 h-6 text-gray-400" />
					</button>
					<div className="h-2 w-48 bg-gray-100 rounded-full overflow-hidden">
						<div
							className="h-full bg-green-500 transition-all duration-500"
							style={{
								width: `${(currentQuiz.currentIndex / currentQuiz.questions.length) * 100}%`,
							}}
						/>
					</div>
					<div className="font-bold text-green-600">
						{currentQuiz.score} pts
					</div>
				</div>

				<div className="flex-1 flex items-center justify-center p-6">
					<div className="max-w-xl w-full">
						<h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
							{question.question}
						</h2>

						<div className="space-y-4">
							{question.options.map((opt) => {
								let statusClass =
									"bg-white border-2 border-gray-200 hover:border-gray-300";
								if (currentQuiz.answerStatus) {
									if (opt.correct)
										statusClass =
											"bg-green-100 border-2 border-green-500 text-green-800";
									else if (
										!opt.correct &&
										currentQuiz.answerStatus === "incorrect"
									) {
										statusClass =
											"bg-white border-2 border-gray-200 opacity-50";
									}
								}

								return (
									<button
										key={opt.id}
										onClick={() =>
											!currentQuiz.answerStatus && handleQuizAnswer(opt.correct)
										}
										className={`w-full p-4 rounded-xl text-left font-medium transition-all transform hover:scale-[1.02] ${statusClass}`}
									>
										{opt.text}
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{currentQuiz.answerStatus && (
					<div
						className={`p-6 ${currentQuiz.answerStatus === "correct" ? "bg-green-100" : "bg-red-100"}`}
					>
						<div className="max-w-xl mx-auto flex items-center gap-4">
							{currentQuiz.answerStatus === "correct" ? (
								<>
									<div className="bg-green-500 rounded-full p-2">
										<CheckSquare className="w-6 h-6 text-white" />
									</div>
									<div className="font-bold text-green-800">Excellent!</div>
								</>
							) : (
								<>
									<div className="bg-red-500 rounded-full p-2">
										<X className="w-6 h-6 text-white" />
									</div>
									<div className="font-bold text-red-800">Incorrect</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		);
	};

	const renderAcademy = () => {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="min-h-screen bg-slate-50 pb-20"
			>
				<Navbar
					title={t.farmAcademy}
					showBack={true}
					onBack={() => setAppState(STATES.FORM)}
					t={t}
					currentLang={language}
					onLanguageClick={() => setShowLanguageSelector(true)}
				/>

				<main className="pt-24 px-4 w-full max-w-7xl mx-auto">
					{/* Header Card */}
					<motion.div
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="bg-green-600 rounded-3xl p-8 text-white mb-10 shadow-xl relative overflow-hidden"
					>
						<div className="relative z-10 flex items-start justify-between gap-4">
							<div className="flex-1">
								<h2 className="text-3xl font-bold mb-2">
									{t.sustainablePathTitle || "Sustainable Farming Path"}
								</h2>
								<p className="opacity-90 text-lg">
									{t.sustainablePathDesc ||
										"Master organic inputs & soil health."}
								</p>
							</div>

							{/* Reset Progress Button */}
							{completedNodes.length > 0 && (
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => {
										if (
											window.confirm(
												"Are you sure you want to reset all your progress in the Sustainable Farming Path? This action cannot be undone.",
											)
										) {
											setCompletedNodes([]);
											safeSetItem("completedNodes", JSON.stringify([]));
											toast.success("Progress reset successfully! 🔄", {
												duration: 3000,
												icon: "✨",
											});
										}
									}}
									className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg border border-white/30 transition-all text-sm font-semibold whitespace-nowrap"
								>
									<RefreshCw className="w-4 h-4" />
									<span className="hidden sm:inline">Reset Progress</span>
								</motion.button>
							)}
						</div>
						<Sprout className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-green-500 opacity-50" />
					</motion.div>{" "}
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
						{/* LEFT COLUMN: LEADERBOARD */}
						<motion.div
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="lg:col-span-1 space-y-6"
						>
							<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
								<h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
									<Trophy className="w-6 h-6 text-yellow-500" />
									{t.panchayatLeaderboard || "Panchayat Leaderboard"}
								</h3>
								<div className="space-y-4">
									{LEADERBOARD_DATA.map((user) => (
										<div
											key={user.rank}
											className={`flex items-center justify-between p-3 rounded-xl transition-colors ${user.name === "You" ? "bg-green-50 border border-green-100" : "hover:bg-gray-50"}`}
										>
											<div className="flex items-center gap-3">
												<div
													className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${user.rank <= 3 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}`}
												>
													{user.rank}
												</div>
												<div>
													<div className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
														{user.name}
														{user.badge && <span>{user.badge}</span>}
													</div>
													<div className="text-xs text-gray-500">
														{user.village}
													</div>
												</div>
											</div>
											<div className="font-bold text-green-600 text-sm">
												{user.name === "You" ? userPoints : user.xp} XP
											</div>
										</div>
									))}
								</div>
							</div>
						</motion.div>

						{/* CENTER COLUMN: PATH */}
						<div className="lg:col-span-2 space-y-12">
							{getSustainableFarmingCourse(t).map((unit, uIdx) => (
								<motion.div
									key={unit.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 + uIdx * 0.1 }}
									className="relative"
								>
									<div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
										<div
											className={`p-4 rounded-xl ${uIdx === 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
										>
											{React.createElement(unit.icon, { size: 28 })}
										</div>
										<div>
											<h3 className="font-bold text-gray-800 text-lg">
												{unit.title}
											</h3>
											<p className="text-sm text-gray-500">
												{unit.description}
											</p>
										</div>
									</div>

									<div className="flex flex-col items-center space-y-8 relative">
										{unit.nodes.map((node, nIdx) => {
											const isCompleted = completedNodes.includes(node.id);
											let isLocked = true;
											const allNodes = getSustainableFarmingCourse(t).flatMap(
												(u) => u.nodes,
											);
											const currentNodeIndex = allNodes.findIndex(
												(n) => n.id === node.id,
											);

											if (currentNodeIndex === 0) {
												isLocked = false;
											} else {
												const prevNodeId = allNodes[currentNodeIndex - 1].id;
												if (completedNodes.includes(prevNodeId)) {
													isLocked = false;
												}
											}

											const xOffset =
												nIdx % 2 === 0 ? "-translate-x-6" : "translate-x-6";

											return (
												<motion.button
													key={node.id}
													disabled={isLocked}
													onClick={() => !isLocked && StartNode(node)}
													whileHover={!isLocked ? { scale: 1.15 } : {}}
													whileTap={!isLocked ? { scale: 0.95 } : {}}
													className={`
                                                    w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-colors z-10
                                                    ${
																											isCompleted
																												? "bg-yellow-400 border-yellow-500"
																												: isLocked
																													? "bg-gray-200 border-gray-300 opacity-60 cursor-not-allowed"
																													: "bg-green-500 border-green-600 cursor-pointer"
																										}
                                                    ${xOffset}
                                                `}
												>
													{isCompleted ? (
														<Star className="text-white fill-white w-8 h-8" />
													) : isLocked ? (
														<Lock className="text-gray-500 w-8 h-8" />
													) : (
														<Star className="text-white w-8 h-8" />
													)}
												</motion.button>
											);
										})}
									</div>
								</motion.div>
							))}
						</div>

						{/* RIGHT COLUMN: MISSIONS & MASCOT - COMMENTED OUT */}
						{/* <motion.div
							initial={{ x: 50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="lg:col-span-1 space-y-8 sticky top-24"
						>
							<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
								<h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
									<CheckSquare className="w-5 h-5 text-orange-500" />
									{t.dailyMissions || "Daily Missions"}
								</h3>
								<div className="space-y-3">
									{myMissions.map((mission) => (
										<div
											key={mission.id}
											className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex flex-col gap-3"
										>
											<div>
												<p
													className={`font-semibold text-sm ${mission.completed ? "text-gray-400 line-through" : "text-gray-700"}`}
												>
													{mission.title}
												</p>
												<div className="flex items-center gap-1 text-xs text-orange-500 font-bold mt-1">
													<Zap className="w-3 h-3" />
													<span>+{mission.xp} XP</span>
												</div>
											</div>
											<div className="relative">
												<AnimatePresence mode="wait">
													{mission.completed ? (
														<motion.div
															initial={{ scale: 0, rotate: -180 }}
															animate={{ scale: 1, rotate: 0 }}
															transition={{
																type: "spring",
																stiffness: 200,
																damping: 15,
															}}
															className="w-full flex justify-center py-1"
														>
															<CheckCircle className="w-12 h-12 text-green-500" />
														</motion.div>
													) : (
														<motion.button
															initial={{ opacity: 1 }}
															exit={{ opacity: 0, scale: 0.8 }}
															whileTap={{ scale: 0.95 }}
															onClick={() => {
																const updated = myMissions.map((m) =>
																	m.id === mission.id
																		? { ...m, completed: true }
																		: m,
																);
																setMyMissions(updated);
																localStorage.setItem(
																	"myMissions",
																	JSON.stringify(updated),
																);
																awardPoints(mission.xp, "Mission Completed!");
															}}
															className="w-full py-2 rounded-lg text-xs font-bold transition-all bg-orange-100 text-orange-600 hover:bg-orange-200"
														>
															{t.claimReward || "Claim"}
														</motion.button>
													)}
												</AnimatePresence>
											</div>
										</div>
									))}
								</div>
							</div>
						</motion.div> */}
					</div>
				</main>
			</motion.div>
		);
	};
	const handleChatSubmit = async (e) => {
		e.preventDefault();
		if (!chatInput.trim()) return;

		const userMessage = { role: "user", content: chatInput };
		setChatMessages((prev) => [...prev, userMessage]);
		setChatInput("");

		setTimeout(() => {
			setChatMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: `Based on my analysis of ${result?.final_result?.disease_name || "the disease"}, I recommend following the treatment plan provided. The ${result?.final_result?.severity || "detected"} severity level suggests timely action is important.`,
				},
			]);
		}, 1000);
	};

	const resetApp = () => {
		setAppState(STATES.FORM);
		setResult(null);
		setImageSlots([null, null, null]);
		setImagePreviews([null, null, null]);
		setFormData({
			lat: "",
			lon: "",
			farmer_name: "",
			village: "",
			crop_name: "Apple",
			sown_date: "",
			observations: "",
		});
		setChatMessages([
			{
				role: "assistant",
				content: "I've analyzed your crop. Feel free to ask any questions!",
			},
		]);
	};

	// ============================================
	// RENDER: FORM STATE - MULTI-STEP WITH PROGRESS BAR
	// ============================================
	const renderForm = () => {
		console.log("renderForm called, current formStep:", formStep);
		const formSteps = [
			{
				id: FORM_STEPS.IMAGES,
				label: t.uploadImages || "Upload Photos",
				icon: Camera,
			},
			{
				id: FORM_STEPS.LOCATION,
				label: t.location || "Location",
				icon: MapPin,
			},
			{
				id: FORM_STEPS.FARMER_INFO,
				label: t.farmerDetails || "Your Info",
				icon: User,
			},
			{
				id: FORM_STEPS.CROP_INFO,
				label: t.cropDetails || "Crop Info",
				icon: Leaf,
			},
		];

		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="min-h-screen bg-gradient-mesh relative overflow-hidden"
				ref={formRef}
			>
				{/* Premium Background Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/30 via-primary-300/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
					<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-200/25 via-secondary-300/15 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
					<div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-accent-200/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
				</div>

				{/* Premium Navbar */}
				<nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-soft">
					<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow-primary">
								<Leaf className="w-5 h-5 text-white" />
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
								AgroVision
							</span>
						</div>
						<div className="flex items-center gap-3">
							<button
								onClick={() => setShowLanguageSelector(true)}
								className="p-2.5 rounded-xl bg-white/50 hover:bg-white/80 border border-white/40 transition-all text-slate-600 hover:text-slate-800"
							>
								<Globe className="w-5 h-5" />
							</button>
							<div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl border border-primary-200/50">
								<Zap className="w-4 h-4 text-primary-600" />
								<span className="text-sm font-semibold text-primary-700">{userPoints} XP</span>
							</div>
						</div>
					</div>
				</nav>

				<main className="relative z-10 pt-28 pb-16">
					<div className="max-w-3xl mx-auto px-6">
						{/* Premium Header */}
						<motion.div
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="text-center mb-10"
						>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-primary-200/50 shadow-soft mb-4">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
								</span>
								<span className="text-sm font-medium text-primary-700">AI-Powered Diagnosis</span>
							</div>
							<h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
								{t.newConsultation || "New Consultation"}
							</h1>
							<p className="text-slate-600 text-lg max-w-xl mx-auto">
								Upload clear photos of your crop for instant AI analysis
							</p>
						</motion.div>

						{/* Premium Progress Steps */}
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="mb-10"
						>
							<div className="flex items-center justify-between">
								{formSteps.map((step, idx) => {
									const StepIcon = step.icon;
									const isActive = formStep === step.id;
									const isCompleted = formStep > step.id;

									return (
										<React.Fragment key={step.id}>
											<motion.div 
												className="flex flex-col items-center"
												whileHover={{ scale: 1.05 }}
												transition={{ type: "spring", stiffness: 400 }}
											>
												<motion.div
													animate={isActive ? { scale: [1, 1.1, 1] } : {}}
													transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
													className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-all duration-500 ${
														isActive
															? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-glow-primary"
															: isCompleted
																? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-soft"
																: "bg-white/70 backdrop-blur-sm text-slate-400 border border-slate-200"
													}`}
												>
													{isCompleted ? (
														<motion.div
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															transition={{ type: "spring", stiffness: 500 }}
														>
															<CheckCircle className="w-6 h-6" />
														</motion.div>
													) : (
														<StepIcon className="w-6 h-6" />
													)}
												</motion.div>
												<span className={`text-xs font-semibold transition-all duration-300 ${
													isActive ? "text-primary-700" : isCompleted ? "text-primary-600" : "text-slate-400"
												}`}>
													{step.label}
												</span>
											</motion.div>
											{idx < formSteps.length - 1 && (
												<div className="flex-1 mx-3 relative">
													<div className="h-1 bg-slate-200 rounded-full overflow-hidden">
														<motion.div
															initial={{ width: 0 }}
															animate={{ width: isCompleted ? "100%" : "0%" }}
															transition={{ duration: 0.5, ease: "easeOut" }}
															className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
														/>
													</div>
												</div>
											)}
										</React.Fragment>
									);
								})}
							</div>
						</motion.div>

						{/* Premium Form Card */}
						<motion.div
							key={formStep}
							initial={{ opacity: 0, y: 30, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -30, scale: 0.98 }}
							transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
							className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-soft-xl border border-white/50 overflow-hidden"
						>
							{/* Card Top Gradient Accent */}
							<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-400" />
							
							{/* Decorative Elements */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/40 to-transparent rounded-full blur-3xl -z-0 transform translate-x-1/2 -translate-y-1/2" />
							<div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary-100/30 to-transparent rounded-full blur-2xl -z-0 transform -translate-x-1/2 translate-y-1/2" />
							
							<div className="relative z-10 p-8">
								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Error Alert */}
									{error && (
										<motion.div
											initial={{ opacity: 0, y: -10, scale: 0.95 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-5 py-4 rounded-2xl flex items-start gap-3"
										>
											<div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
												<AlertTriangle className="w-5 h-5 text-red-600" />
											</div>
											<div className="flex-1">
												<p className="font-semibold text-red-800 mb-1">Something went wrong</p>
												<span className="text-sm text-red-600 leading-relaxed">{error}</span>
											</div>
											<button type="button" onClick={() => setError(null)} className="p-2 hover:bg-red-100 rounded-xl transition-colors">
												<X className="w-4 h-4" />
											</button>
										</motion.div>
									)}

									{/* ============================================ */}
									{/* STEP 1: IMAGE UPLOAD */}
									{/* ============================================ */}
									{formStep === FORM_STEPS.IMAGES && (
										<div className="space-y-6">
											<div className="flex items-start justify-between">
												<div>
													<h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3">
														<div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center shadow-soft">
															<Camera className="w-6 h-6 text-primary-600" />
														</div>
														{t.uploadImages}
													</h2>
													<p className="text-slate-500 text-sm leading-relaxed max-w-md">
														Capture 3 clear photos of affected leaves from different angles for accurate AI diagnosis.
													</p>
												</div>
												{/* Circular Progress */}
												<div className="relative w-16 h-16 flex-shrink-0">
													<svg className="w-16 h-16 transform -rotate-90">
														<circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-100" />
														<motion.circle
															cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none"
															strokeDasharray={176}
															initial={{ strokeDashoffset: 176 }}
															animate={{ strokeDashoffset: 176 - (uploadedCount / 3) * 176 }}
															transition={{ duration: 0.5, ease: "easeOut" }}
															strokeLinecap="round"
															className={allImagesUploaded ? "text-primary-500" : "text-secondary-500"}
														/>
													</svg>
													<div className="absolute inset-0 flex items-center justify-center">
														<span className={`text-lg font-bold ${allImagesUploaded ? "text-primary-600" : "text-slate-600"}`}>
															{uploadedCount}/3
														</span>
													</div>
												</div>
											</div>

											{/* Premium 3 Image Slot Grid */}
											<div className="grid grid-cols-3 gap-4 mt-6">
												{IMAGE_SLOTS.map((slot) => (
													<ImageSlot
														key={slot.id}
														slot={slot}
														file={imageSlots[slot.id]}
														preview={imagePreviews[slot.id]}
														onSelect={handleImageSelect}
														onRemove={handleImageRemove}
													/>
												))}
											</div>

											{!allImagesUploaded && (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													className="flex items-center gap-2 p-4 bg-amber-50/80 backdrop-blur-sm rounded-2xl border border-amber-200/50"
												>
													<div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
														<AlertTriangle className="w-4 h-4 text-amber-600" />
													</div>
													<p className="text-sm text-amber-700 font-medium">
														All 3 photos are required for accurate diagnosis
													</p>
												</motion.div>
											)}
										</div>
									)}

									{/* ============================================ */}
									{/* STEP 2: LOCATION - Ultra Premium Design */}
									{/* ============================================ */}
									{formStep === FORM_STEPS.LOCATION && (
										<motion.div 
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="space-y-8 relative"
										>
											{/* Floating GPS Particles */}
											<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
												{[...Array(4)].map((_, i) => (
													<motion.div
														key={i}
														className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-primary-400/30 to-cyan-400/30"
														style={{
															left: `${20 + i * 20}%`,
															top: `${15 + (i % 2) * 40}%`,
														}}
														animate={{
															y: [0, -15, 0],
															scale: [1, 1.3, 1],
															opacity: [0.4, 0.7, 0.4],
														}}
														transition={{
															duration: 3 + i * 0.5,
															repeat: Infinity,
															ease: "easeInOut",
															delay: i * 0.4,
														}}
													/>
												))}
											</div>

											{/* Header with Animated Icon */}
											<div className="text-center relative">
												<motion.div
													initial={{ scale: 0, rotate: -180 }}
													animate={{ scale: 1, rotate: 0 }}
													transition={{ type: "spring", stiffness: 200, damping: 15 }}
													className="relative w-20 h-20 mx-auto mb-5"
												>
													<motion.div
														animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.2, 0.4] }}
														transition={{ duration: 2.5, repeat: Infinity }}
														className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-400 rounded-2xl blur-xl"
													/>
													<motion.div
														animate={{ rotate: 360 }}
														transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
														className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500 via-cyan-500 to-primary-500 opacity-70"
													/>
													<div className="relative w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl">
														<motion.div
															animate={{ y: [0, -3, 0] }}
															transition={{ duration: 2, repeat: Infinity }}
														>
															<MapPin className="w-10 h-10 text-white drop-shadow-lg" />
														</motion.div>
													</div>
												</motion.div>
												<motion.h2 
													initial={{ y: 20, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.2 }}
													className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent"
												>
													{t.location}
												</motion.h2>
												<motion.p 
													initial={{ y: 20, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.3 }}
													className="text-slate-500 mt-2 max-w-sm mx-auto"
												>
													Enable location for weather-based diagnosis
												</motion.p>
											</div>

											{/* Premium GPS Button */}
											<motion.button
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.4 }}
												type="button"
												onClick={getLocation}
												disabled={isGettingLocation}
												whileHover={{ scale: 1.02, y: -2 }}
												whileTap={{ scale: 0.98 }}
												className="w-full relative group bg-gradient-to-r from-primary-500 via-primary-600 to-cyan-600 hover:from-primary-600 hover:via-primary-700 hover:to-cyan-700 text-white font-semibold py-5 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary-500/30 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
											>
												<motion.div 
													className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
												/>
												{isGettingLocation ? (
													<Loader2 className="w-6 h-6 animate-spin relative z-10" />
												) : (
													<Navigation className="w-6 h-6 relative z-10" />
												)}
												<span className="relative z-10 text-lg">
													{isGettingLocation ? "Detecting Location..." : t.useLocation}
												</span>
											</motion.button>

											{/* Elegant Divider */}
											<motion.div 
												initial={{ scaleX: 0 }}
												animate={{ scaleX: 1 }}
												transition={{ delay: 0.5 }}
												className="relative py-4"
											>
												<div className="absolute inset-0 flex items-center">
													<div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
												</div>
												<div className="relative flex justify-center">
													<span className="px-5 bg-white text-sm text-slate-400 font-medium">
														or enter manually
													</span>
												</div>
											</motion.div>

											{/* Manual Input with Premium Styling */}
											<motion.div 
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.6 }}
												className="grid grid-cols-2 gap-4"
											>
												<div className="space-y-2">
													<label className="block text-sm font-semibold text-slate-700">
														Latitude
													</label>
													<div className="relative group">
														<input
															type="text"
															placeholder="e.g. 19.0760"
															value={formData.lat}
															onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
															className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-sm transition-all placeholder:text-slate-400 group-hover:border-slate-300"
														/>
													</div>
												</div>
												<div className="space-y-2">
													<label className="block text-sm font-semibold text-slate-700">
														Longitude
													</label>
													<div className="relative group">
														<input
															type="text"
															placeholder="e.g. 72.8777"
															value={formData.lon}
															onChange={(e) => setFormData({ ...formData, lon: e.target.value })}
															className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-sm transition-all placeholder:text-slate-400 group-hover:border-slate-300"
														/>
													</div>
												</div>
											</motion.div>

											{/* Success State with Animation */}
											{formData.lat && formData.lon && (
												<motion.div
													initial={{ opacity: 0, y: 20, scale: 0.95 }}
													animate={{ opacity: 1, y: 0, scale: 1 }}
													transition={{ type: "spring", stiffness: 300 }}
													className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 flex items-center gap-4 shadow-lg shadow-emerald-500/10"
												>
													<motion.div 
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{ delay: 0.2, type: "spring" }}
														className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30"
													>
														<CheckCircle className="w-7 h-7 text-white" />
													</motion.div>
													<div className="flex-1">
														<p className="font-bold text-emerald-900 text-lg">Location Confirmed</p>
														<p className="text-emerald-600 mt-0.5">
															{formData.lat}°N, {formData.lon}°E
														</p>
													</div>
													<motion.div
														animate={{ rotate: [0, 10, -10, 0] }}
														transition={{ duration: 2, repeat: Infinity }}
													>
														<Navigation className="w-6 h-6 text-emerald-500" />
													</motion.div>
												</motion.div>
											)}
										</motion.div>
									)}

									{/* ============================================ */}
									{/* STEP 3: FARMER DETAILS - Ultra Premium Design */}
									{/* ============================================ */}
									{formStep === FORM_STEPS.FARMER_INFO && (
										<motion.div 
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="space-y-8 relative"
										>
											{/* Floating Particles */}
											<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
												{[...Array(5)].map((_, i) => (
													<motion.div
														key={i}
														className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-violet-400/30 to-purple-400/30"
														style={{
															left: `${10 + i * 18}%`,
															top: `${20 + (i % 3) * 25}%`,
														}}
														animate={{
															y: [0, -12, 0],
															scale: [1, 1.2, 1],
															opacity: [0.3, 0.5, 0.3],
														}}
														transition={{
															duration: 3.5 + i * 0.4,
															repeat: Infinity,
															ease: "easeInOut",
															delay: i * 0.3,
														}}
													/>
												))}
											</div>

											{/* Header */}
											<div className="text-center relative">
												<motion.div
													initial={{ scale: 0, rotate: -180 }}
													animate={{ scale: 1, rotate: 0 }}
													transition={{ type: "spring", stiffness: 200, damping: 15 }}
													className="relative w-20 h-20 mx-auto mb-5"
												>
													<motion.div
														animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.2, 0.4] }}
														transition={{ duration: 2.5, repeat: Infinity }}
														className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 rounded-2xl blur-xl"
													/>
													<motion.div
														animate={{ rotate: 360 }}
														transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
														className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500 opacity-70"
													/>
													<div className="relative w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
														<User className="w-10 h-10 text-white drop-shadow-lg" />
													</div>
												</motion.div>
												<motion.h2 
													initial={{ y: 20, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.2 }}
													className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent"
												>
													{t.farmerDetails}
												</motion.h2>
												<motion.p 
													initial={{ y: 20, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.3 }}
													className="text-slate-500 mt-2"
												>
													Help us personalize your experience
												</motion.p>
											</div>

											{/* Form Fields */}
											<motion.div 
												initial={{ y: 30, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.4 }}
												className="space-y-5"
											>
												<div className="space-y-2">
													<label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
														<User className="w-4 h-4 text-violet-500" />
														{t.yourName}
													</label>
													<div className="relative group">
														<input
															type="text"
															value={formData.farmer_name}
															onChange={(e) => setFormData({ ...formData, farmer_name: e.target.value })}
															placeholder={t.enterName}
															className="w-full px-5 py-4 pl-12 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 placeholder:text-slate-400 group-hover:border-slate-300"
														/>
														<User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
													</div>
												</div>
												<div className="space-y-2">
													<label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
														<MapPin className="w-4 h-4 text-violet-500" />
														{t.village}
													</label>
													<div className="relative group">
														<input
															type="text"
															value={formData.village}
															onChange={(e) => setFormData({ ...formData, village: e.target.value })}
															placeholder={t.enterVillage}
															className="w-full px-5 py-4 pl-12 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 placeholder:text-slate-400 group-hover:border-slate-300"
														/>
														<MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
													</div>
												</div>
											</motion.div>
										</motion.div>
									)}

									{/* ============================================ */}
									{/* STEP 4: CROP DETAILS - Ultra Premium Design */}
									{/* ============================================ */}
									{formStep === FORM_STEPS.CROP_INFO && (
										<motion.div 
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="space-y-8 relative"
										>
											{/* Floating Particles Background */}
											<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
												{[...Array(6)].map((_, i) => (
													<motion.div
														key={i}
														className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-secondary-400/40 to-primary-400/40"
														style={{
															left: `${15 + i * 15}%`,
															top: `${10 + (i % 3) * 30}%`,
														}}
														animate={{
															y: [0, -20, 0],
															x: [0, 10, 0],
															scale: [1, 1.2, 1],
															opacity: [0.3, 0.6, 0.3],
														}}
														transition={{
															duration: 3 + i * 0.5,
															repeat: Infinity,
															ease: "easeInOut",
															delay: i * 0.3,
														}}
													/>
												))}
											</div>

											{/* Header with Animated Icon */}
											<div className="text-center relative">
												<motion.div
													initial={{ scale: 0, rotate: -180 }}
													animate={{ scale: 1, rotate: 0 }}
													transition={{ type: "spring", stiffness: 200, damping: 15 }}
													className="relative w-20 h-20 mx-auto mb-5"
												>
													{/* Animated rings */}
													<motion.div
														animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
														transition={{ duration: 2, repeat: Infinity }}
														className="absolute inset-0 bg-gradient-to-r from-secondary-400 to-orange-400 rounded-2xl blur-xl"
													/>
													<motion.div
														animate={{ rotate: 360 }}
														transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
														className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-secondary-500 via-orange-500 to-amber-500 opacity-75"
													/>
													<div className="relative w-full h-full bg-gradient-to-br from-secondary-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
														<motion.div
															animate={{ rotate: [0, 5, -5, 0] }}
															transition={{ duration: 4, repeat: Infinity }}
														>
															<Leaf className="w-10 h-10 text-white drop-shadow-lg" />
														</motion.div>
													</div>
												</motion.div>
												<motion.h2 
													initial={{ y: 20, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.2 }}
													className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent"
												>
													{t.cropDetails}
												</motion.h2>
												<motion.p 
													initial={{ y: 20, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.3 }}
													className="text-slate-500 mt-2"
												>
													Tell us about your crop for accurate analysis
												</motion.p>
											</div>

											{/* Premium Crop Selection Cards */}
											<motion.div 
												initial={{ y: 30, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.4 }}
												className="space-y-4"
											>
												<label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
													<Sprout className="w-4 h-4 text-primary-500" />
													{t.selectCrop}
												</label>
												<div className="grid grid-cols-3 gap-4">
													{CROPS.map((crop, idx) => {
														const isSelected = formData.crop_name === crop.value;
														return (
															<motion.button
																key={crop.value}
																type="button"
																onClick={() => setFormData({ ...formData, crop_name: crop.value })}
																initial={{ y: 20, opacity: 0 }}
																animate={{ y: 0, opacity: 1 }}
																transition={{ delay: 0.5 + idx * 0.1 }}
																whileHover={{ 
																	y: -8, 
																	rotateY: 5,
																	rotateX: 5,
																	transition: { duration: 0.3 }
																}}
																whileTap={{ scale: 0.95 }}
																className={`relative p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
																	isSelected
																		? "border-primary-500 bg-gradient-to-br from-primary-50 to-emerald-50 shadow-xl shadow-primary-500/25"
																		: "border-slate-200 bg-white hover:border-primary-300 hover:shadow-lg"
																}`}
																style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
															>
																{/* Shine effect on hover */}
																<motion.div
																	className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
																/>
																
																{/* Selection indicator */}
																{isSelected && (
																	<motion.div
																		initial={{ scale: 0 }}
																		animate={{ scale: 1 }}
																		transition={{ type: "spring", stiffness: 500 }}
																		className="absolute top-3 right-3 w-7 h-7 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
																	>
																		<CheckCircle className="w-4 h-4 text-white" />
																	</motion.div>
																)}
																
																{/* Crop Icon with animation */}
																<motion.div 
																	className="text-5xl mb-3 filter drop-shadow-sm"
																	animate={isSelected ? { 
																		y: [0, -5, 0],
																		rotate: [0, 5, -5, 0]
																	} : {}}
																	transition={{ duration: 2, repeat: Infinity }}
																>
																	{crop.icon}
																</motion.div>
																
																{/* Label */}
																<span className={`text-sm font-bold block transition-colors ${
																	isSelected ? "text-primary-700" : "text-slate-600 group-hover:text-slate-800"
																}`}>
																	{crop.value === "Apple" ? t.apple : crop.value === "Rice" ? t.rice : t.tomato}
																</span>
																
																{/* Bottom accent bar */}
																<motion.div
																	initial={{ scaleX: 0 }}
																	animate={{ scaleX: isSelected ? 1 : 0 }}
																	className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 origin-left"
																/>
															</motion.button>
														);
													})}
												</div>
											</motion.div>

											{/* Date Field - Premium Style */}
											<motion.div 
												initial={{ y: 30, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.6 }}
												className="space-y-3"
											>
												<label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
													<Calendar className="w-4 h-4 text-secondary-500" />
													{t.sownDate}
												</label>
												<div className="relative group">
													<input
														type="date"
														value={formData.sown_date}
														onChange={(e) => setFormData({ ...formData, sown_date: e.target.value })}
														className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 text-slate-700 font-medium group-hover:border-slate-300"
													/>
													<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
												</div>
											</motion.div>

											{/* Observations - Premium Textarea */}
											<motion.div 
												initial={{ y: 30, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.7 }}
												className="space-y-3"
											>
												<label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
													<FileText className="w-4 h-4 text-violet-500" />
													{t.observations}
												</label>
												<div className="relative group">
													<textarea
														value={formData.observations}
														onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
														placeholder={t.observationsPlaceholder}
														rows={4}
														className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 resize-none placeholder:text-slate-400 group-hover:border-slate-300"
													/>
													<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
													
													{/* Character hint */}
													<div className="absolute bottom-3 right-4 text-xs text-slate-400">
														{formData.observations?.length || 0} / 500
													</div>
												</div>
											</motion.div>

											{/* Pro Tip Card */}
											<motion.div
												initial={{ y: 30, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.8 }}
												className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-4 flex items-start gap-3"
											>
												<div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
													<Zap className="w-5 h-5 text-white" />
												</div>
												<div>
													<p className="font-semibold text-amber-900 text-sm">Pro Tip</p>
													<p className="text-amber-700 text-xs mt-0.5">
														Adding detailed observations helps our AI provide more accurate diagnosis and treatment recommendations.
													</p>
												</div>
											</motion.div>
										</motion.div>
									)}

									{/* ============================================ */}
									{/* NAVIGATION BUTTONS - Ultra Premium */}
									{/* ============================================ */}
									<motion.div 
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.5 }}
										className="flex gap-4 pt-8 mt-2"
									>
										{/* Back Button */}
										{formStep > FORM_STEPS.IMAGES && (
											<motion.button
												type="button"
												onClick={prevFormStep}
												whileHover={{ scale: 1.02, x: -4 }}
												whileTap={{ scale: 0.97 }}
												className="flex-1 relative group bg-white hover:bg-slate-50 text-slate-700 font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 overflow-hidden"
											>
												<motion.div 
													className="absolute inset-0 bg-gradient-to-r from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
												/>
												<ArrowLeft className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-x-1" />
												<span className="relative z-10">{t.back || "Back"}</span>
											</motion.button>
										)}

										{/* Next/Submit Button */}
										{formStep < FORM_STEPS.CROP_INFO ? (
											<motion.button
												type="button"
												onClick={nextFormStep}
												whileHover={{ scale: 1.02, x: 4 }}
												whileTap={{ scale: 0.97 }}
												className="flex-1 relative group bg-gradient-to-r from-primary-500 via-primary-600 to-emerald-600 hover:from-primary-600 hover:via-primary-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 overflow-hidden"
											>
												{/* Shine effect */}
												<motion.div 
													className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
												/>
												<span className="relative z-10">Continue</span>
												<ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
											</motion.button>
										) : (
											<motion.button
												type="submit"
												disabled={!allImagesUploaded}
												whileHover={allImagesUploaded ? { scale: 1.02 } : {}}
												whileTap={allImagesUploaded ? { scale: 0.97 } : {}}
												className={`flex-1 relative group font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden ${
													allImagesUploaded
														? "bg-gradient-to-r from-secondary-500 via-orange-500 to-amber-500 hover:from-secondary-600 hover:via-orange-600 hover:to-amber-600 text-white shadow-xl shadow-secondary-500/30 hover:shadow-secondary-500/50 cursor-pointer"
														: "bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200"
												}`}
											>
												{allImagesUploaded && (
													<motion.div 
														className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
													/>
												)}
												<Microscope className="w-5 h-5 relative z-10" />
												<span className="relative z-10">{t.analyzeCrop}</span>
												{allImagesUploaded && (
													<motion.div
														animate={{ rotate: [0, 15, -15, 0] }}
														transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
														className="relative z-10"
													>
														<Zap className="w-5 h-5" />
													</motion.div>
												)}
											</motion.button>
										)}
									</motion.div>
								</form>
							</div>
						</motion.div>
					</div>
				</main>
			</motion.div>
		);
	};

	// ============================================
	// RENDER: ANALYZING STATE - Premium SaaS Design
	// ============================================
	const renderAnalyzing = () => (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="min-h-screen bg-gradient-mesh relative overflow-hidden flex items-center justify-center p-6"
		>
			{/* Animated Background Orbs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{ 
						x: [0, 100, 0], 
						y: [0, -50, 0],
						scale: [1, 1.2, 1] 
					}}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary-300/30 to-transparent rounded-full blur-3xl"
				/>
				<motion.div
					animate={{ 
						x: [0, -80, 0], 
						y: [0, 60, 0],
						scale: [1, 1.1, 1] 
					}}
					transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
					className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-secondary-300/25 to-transparent rounded-full blur-3xl"
				/>
				<motion.div
					animate={{ 
						x: [0, 60, 0], 
						y: [0, -40, 0],
					}}
					transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
					className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gradient-to-br from-accent-300/20 to-transparent rounded-full blur-3xl"
				/>
			</div>

			{/* Floating Particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{Array.from({ length: 20 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute bg-primary-500/20 rounded-full"
						style={{
							width: `${Math.random() * 6 + 4}px`,
							height: `${Math.random() * 6 + 4}px`,
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -60, 0],
							opacity: [0.2, 0.6, 0.2],
						}}
						transition={{
							duration: 4 + Math.random() * 4,
							repeat: Infinity,
							delay: Math.random() * 4,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			{/* Main Card */}
			<motion.div 
				initial={{ scale: 0.95, y: 20 }}
				animate={{ scale: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
				className="relative z-10 w-full max-w-lg"
			>
				<div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-soft-xl border border-white/50 p-10 overflow-hidden">
					{/* Top Accent */}
					<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
					
					{/* Decorative Corner */}
					<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100/50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

					<div className="text-center mb-10 relative">
						{/* Premium Animated Icon */}
						<div className="relative inline-block mb-8">
							{/* Outer Glow Rings */}
							<motion.div
								animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
								transition={{ duration: 2.5, repeat: Infinity }}
								className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-2xl"
							/>
							<motion.div
								animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
								transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
								className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-primary-400 rounded-full blur-xl"
							/>
							
							{/* Main Icon Container */}
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
								className="relative w-32 h-32 mx-auto"
							>
								{/* Rotating Border */}
								<div className="absolute inset-0 rounded-full border-4 border-dashed border-primary-200/50" />
								<motion.div 
									animate={{ rotate: -360 }}
									transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
									className="absolute inset-2 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 rounded-full flex items-center justify-center shadow-glow-primary"
								>
									<motion.div
										animate={{ scale: [1, 1.1, 1] }}
										transition={{ duration: 1.5, repeat: Infinity }}
									>
										<Microscope className="w-14 h-14 text-white drop-shadow-lg" />
									</motion.div>
								</motion.div>
							</motion.div>
						</div>

						<motion.h2
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="text-3xl font-bold text-slate-800 mb-2"
						>
							{t.analyzingCrop}
						</motion.h2>
						<p className="text-slate-500 font-medium">{t.pleaseWait}</p>

						{/* Animated Status Message */}
						<motion.div
							key={currentStep}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full border border-primary-200/50"
						>
							<span className="relative flex h-2.5 w-2.5">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
							</span>
							<span className="text-sm font-semibold text-primary-700">
								{currentStep === 0 && "Scanning your images..."}
								{currentStep === 1 && "AI is thinking..."}
								{currentStep === 2 && "Checking disease database..."}
								{currentStep === 3 && "Analyzing weather patterns..."}
								{currentStep === 4 && "Almost there!"}
							</span>
						</motion.div>
					</div>

					{/* Premium Step Progress */}
					<div className="space-y-3">
						{getAnalysisSteps(t).map((step, idx) => {
							const Icon = step.icon;
							const isActive = idx === currentStep;
							const isComplete = idx < currentStep;

							return (
								<motion.div
									key={step.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: idx * 0.08 }}
									className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
										isActive
											? "bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-300 shadow-soft scale-[1.02]"
											: isComplete
												? "bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200"
												: "bg-slate-50/50 border border-slate-100 opacity-50"
									}`}
								>
									<motion.div
										animate={isActive ? { rotate: 360 } : {}}
										transition={isActive ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
										className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
											isActive
												? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-glow-primary"
												: isComplete
													? "bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-soft"
													: "bg-slate-200 text-slate-400"
										}`}
									>
										{isComplete ? (
											<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
												<CheckCircle className="w-6 h-6" />
											</motion.div>
										) : isActive ? (
											<Loader2 className="w-6 h-6" />
										) : (
											<Icon className="w-6 h-6" />
										)}
									</motion.div>
									<div className="flex-1 min-w-0">
										<span className={`font-semibold text-sm ${
											isActive ? "text-primary-800" : isComplete ? "text-emerald-700" : "text-slate-400"
										}`}>
											{step.label}
										</span>
										{isComplete && (
											<motion.div
												initial={{ width: 0 }}
												animate={{ width: "100%" }}
												className="h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mt-2"
											/>
										)}
									</div>
									{isComplete && (
										<motion.div
											initial={{ scale: 0, rotate: -180 }}
											animate={{ scale: 1, rotate: 0 }}
											transition={{ type: "spring", delay: 0.1 }}
										>
											<CheckCircle className="w-5 h-5 text-emerald-500" />
										</motion.div>
									)}
								</motion.div>
							);
						})}
					</div>

					{/* Overall Progress Bar */}
					<div className="mt-8 pt-6 border-t border-slate-100">
						<div className="flex justify-between text-sm mb-3">
							<span className="font-medium text-slate-600">Overall Progress</span>
							<span className="font-bold text-primary-600">
								{Math.round((currentStep / (getAnalysisSteps(t).length - 1)) * 100)}%
							</span>
						</div>
						<div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
							<motion.div
								className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 rounded-full"
								initial={{ width: 0 }}
								animate={{ width: `${(currentStep / (getAnalysisSteps(t).length - 1)) * 100}%` }}
								transition={{ duration: 0.5, ease: "easeOut" }}
							/>
						</div>
					</div>

					{/* XP Reward Indicator */}
					<motion.div
						animate={{ opacity: [0.6, 1, 0.6] }}
						transition={{ duration: 2, repeat: Infinity }}
						className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500"
					>
						<Zap className="w-4 h-4 text-secondary-500" />
						<span className="font-medium">Earning +30 XP</span>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);

	// ============================================
	// RENDER: RESULT STATE
	// ============================================
	const renderResult = () => {
		if (!result) return null;

		const { final_result, ai_diagnosis_log, weather_context, image_urls } =
			result;
		const confidence = (final_result?.confidence_score * 100).toFixed(0);
		const severityConfig = {
			mild: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20", icon: "🟢" },
			moderate: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", icon: "🟡" },
			severe: { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-500/20", icon: "🔴" },
		};
		const severity = severityConfig[final_result?.severity] || severityConfig.moderate;

		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"
			>
				{/* Premium Navbar */}
				<nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
					<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
								<Leaf className="w-5 h-5 text-white" />
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
								AgroVision
							</span>
						</div>
						<div className="flex items-center gap-3">
							<button
								onClick={() => setShowLanguageSelector(true)}
								className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all text-slate-600"
							>
								<Globe className="w-5 h-5" />
							</button>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={resetApp}
								className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
							>
								<RefreshCw className="w-4 h-4" />
								{t.newAnalysis}
							</motion.button>
						</div>
					</div>
				</nav>

				<main className="pt-28 pb-16 max-w-7xl mx-auto px-6">
					{/* Hero Stats Banner */}
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="relative mb-8 overflow-hidden"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl" />
						<div className="absolute inset-0 opacity-30 rounded-3xl" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
						<div className="relative px-8 py-10">
							<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
								<div className="flex items-center gap-5">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ type: "spring", duration: 0.8 }}
										className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30"
									>
										<Trophy className="w-10 h-10 text-white" />
									</motion.div>
									<div>
										<motion.h1 
											initial={{ x: -20, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ delay: 0.2 }}
											className="text-3xl md:text-4xl font-bold text-white mb-1"
										>
											Analysis Complete
										</motion.h1>
										<p className="text-white/80 text-lg">AI-powered diagnosis ready for review</p>
									</div>
								</div>
								<div className="flex items-center gap-8">
									{[
										{ value: "+65", label: "XP Earned", delay: 0.3 },
										{ value: totalScans, label: "Total Scans", delay: 0.4 },
										{ value: badges.length, label: "Badges", delay: 0.5 },
									].map((stat, idx) => (
										<motion.div
											key={idx}
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: stat.delay }}
											className="text-center"
										>
											<div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
											<div className="text-sm text-white/70">{stat.label}</div>
										</motion.div>
									))}
								</div>
							</div>
						</div>
					</motion.div>

					{/* Main Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
						{/* Primary Diagnosis Card */}
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="lg:col-span-8"
						>
							<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
								{/* Disease Header */}
								<div className="relative p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
									<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl" />
									<div className="relative flex items-start justify-between">
										<div>
											<span className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium mb-3">
												<Shield className="w-4 h-4" />
												{t.identifiedDisease}
											</span>
											<h2 className="text-4xl font-bold text-white mb-4">
												{final_result?.disease_name}
											</h2>
											<div className="flex flex-wrap items-center gap-3">
												<span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${severity.bg} ${severity.text} border ${severity.border}`}>
													{severity.icon} {final_result?.severity?.charAt(0).toUpperCase() + final_result?.severity?.slice(1)} Severity
												</span>
												<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
													<CloudRain className="w-4 h-4" />
													{weather_context}
												</span>
											</div>
										</div>
										<div className="text-right">
											<div className="relative">
												<svg className="w-28 h-28 transform -rotate-90">
													<circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-700" />
													<motion.circle
														initial={{ strokeDashoffset: 301 }}
														animate={{ strokeDashoffset: 301 - (301 * confidence) / 100 }}
														transition={{ duration: 1.5, ease: "easeOut" }}
														cx="56" cy="56" r="48" stroke="url(#gradient)" strokeWidth="8" fill="none"
														strokeLinecap="round" strokeDasharray="301"
													/>
													<defs>
														<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
															<stop offset="0%" stopColor="#10b981" />
															<stop offset="100%" stopColor="#06b6d4" />
														</linearGradient>
													</defs>
												</svg>
												<div className="absolute inset-0 flex flex-col items-center justify-center">
													<span className="text-3xl font-bold text-white">{confidence}%</span>
													<span className="text-xs text-slate-400">{t.confidence}</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Analyzed Images */}
								{image_urls && image_urls.length > 0 && (
									<div className="p-8 border-b border-slate-100">
										<h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
											<Camera className="w-5 h-5 text-emerald-600" />
											{t.analyzedImages}
											<span className="ml-2 text-sm font-normal text-slate-500">({image_urls.length} images)</span>
										</h3>
										<div className="grid grid-cols-3 gap-4">
											{image_urls.map((url, idx) => (
												<motion.div
													key={`img-${idx}`}
													initial={{ scale: 0.9, opacity: 0 }}
													animate={{ scale: 1, opacity: 1 }}
													transition={{ delay: 0.3 + idx * 0.1 }}
													className="relative group"
												>
													<img
														src={url}
														alt={`Leaf ${idx + 1}`}
														className="w-full aspect-square object-cover rounded-2xl border-2 border-slate-200 group-hover:border-emerald-400 transition-all shadow-lg"
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center pb-3">
														<span className="text-white text-sm font-medium">Image {idx + 1}</span>
													</div>
												</motion.div>
											))}
										</div>
									</div>
								)}

								{/* Treatment Plan */}
								<div className="p-8">
									<h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
										<FileText className="w-5 h-5 text-emerald-600" />
										{t.treatmentPlan}
									</h3>
									{final_result?.treatment_plan && (
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{final_result.treatment_plan.immediate?.length > 0 && (
												<motion.div
													initial={{ x: -20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													transition={{ delay: 0.4 }}
													className="p-5 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100"
												>
													<div className="flex items-center gap-3 mb-4">
														<div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
															<AlertCircle className="w-5 h-5 text-red-600" />
														</div>
														<h4 className="font-semibold text-red-800">{t.immediateActions}</h4>
													</div>
													<ul className="space-y-2">
														{final_result.treatment_plan.immediate.map((action, idx) => (
															<li key={`imm-${idx}`} className="flex items-start gap-3 text-sm text-red-700">
																<CheckCircle className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
																<span>{action}</span>
															</li>
														))}
													</ul>
												</motion.div>
											)}

											{final_result.treatment_plan.preventive?.length > 0 && (
												<motion.div
													initial={{ x: 20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													transition={{ delay: 0.5 }}
													className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100"
												>
													<div className="flex items-center gap-3 mb-4">
														<div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
															<Shield className="w-5 h-5 text-emerald-600" />
														</div>
														<h4 className="font-semibold text-emerald-800">{t.preventive}</h4>
													</div>
													<ul className="space-y-2">
														{final_result.treatment_plan.preventive.map((measure, idx) => (
															<li key={`prev-${idx}`} className="flex items-start gap-3 text-sm text-emerald-700">
																<CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
																<span>{measure}</span>
															</li>
														))}
													</ul>
												</motion.div>
											)}

											{final_result.treatment_plan.products?.length > 0 && (
												<motion.div
													initial={{ y: 20, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.6 }}
													className="md:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100"
												>
													<div className="flex items-center gap-3 mb-4">
														<div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
															<Package className="w-5 h-5 text-violet-600" />
														</div>
														<h4 className="font-semibold text-violet-800">{t.recommendedProducts}</h4>
													</div>
													<div className="flex flex-wrap gap-2">
														{final_result.treatment_plan.products.map((product, idx) => (
															<span
																key={`prod-${idx}`}
																className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-violet-700 border border-violet-200 shadow-sm"
															>
																{product}
															</span>
														))}
													</div>
												</motion.div>
											)}
										</div>
									)}
								</div>
							</div>
						</motion.div>

						{/* Sidebar */}
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="lg:col-span-4 space-y-6"
						>
							{/* Quick Actions Card */}
							<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/50 p-6">
								<h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
								<div className="space-y-3">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setAppState(STATES.CALIBRATION)}
										className="w-full flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
									>
										<Sprout className="w-5 h-5" />
										Start Recovery Plan
										<ArrowRight className="w-4 h-4 ml-auto" />
									</motion.button>
									<button
										onClick={resetApp}
										className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all"
									>
										<Camera className="w-5 h-5" />
										Scan Another Crop
										<ArrowRight className="w-4 h-4 ml-auto opacity-50" />
									</button>
									<button
										onClick={() => setAppState(STATES.ACADEMY)}
										className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all"
									>
										<BookOpen className="w-5 h-5" />
										Learn Prevention
										<ArrowRight className="w-4 h-4 ml-auto opacity-50" />
									</button>
								</div>
							</div>

							{/* AI Analysis Details */}
							{ai_diagnosis_log && (
								<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/50 p-6">
									<h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
										<Cpu className="w-5 h-5 text-emerald-600" />
										AI Analysis
									</h3>
									<div className="space-y-4">
										<div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
											<p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Initial Prediction</p>
											<p className="font-semibold text-slate-800">{ai_diagnosis_log.initial_prediction}</p>
										</div>
										{ai_diagnosis_log.texture_analysis && (
											<div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
												<p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Visual Symptoms</p>
												<p className="text-sm text-blue-800">{ai_diagnosis_log.texture_analysis}</p>
											</div>
										)}
										{ai_diagnosis_log.comparison_notes && (
											<div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
												<p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">Analysis Notes</p>
												<p className="text-sm text-emerald-800">{ai_diagnosis_log.comparison_notes}</p>
											</div>
										)}
									</div>
								</div>
							)}

							{/* Powered By */}
							<div className="text-center py-4">
								<p className="text-sm text-slate-400">Powered by GPT-4o Vision AI</p>
							</div>
						</motion.div>
					</div>
				</main>
			</motion.div>
		);
	};

	// ============================================
	// LANDING PAGE RENDER
	// ============================================
	const renderLanding = () => {
		return (
			<motion.div
				key="landing"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50"
			>
				{/* Navbar */}
				<Navbar
					onTryFree={() => setAppState(STATES.FORM)}
					t={t}
					onLanguageClick={() => setShowLanguageSelector(true)}
					currentLang={language}
					onHome={() => setAppState(STATES.LANDING)}
				/>

				{/* Hero Section */}
				<section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
					{/* Background Elements */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl" />
						<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-100/20 to-purple-100/20 rounded-full blur-3xl" />
					</div>

					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							{/* Left Content */}
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className="text-center lg:text-left"
							>
								{/* Badge */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200/50 mb-6"
								>
									<Sparkles className="w-4 h-4 text-emerald-600" />
									<span className="text-sm font-semibold text-emerald-700">{t.heroTagline || "AI-Powered Crop Health"}</span>
								</motion.div>

								{/* Main Heading */}
								<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
									<span className="block">{t.heroTitle1 || "Protect Your Crops"}</span>
									<span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
										{t.heroTitle2 || "Save Your Harvest"}
									</span>
								</h1>

								{/* Subtitle */}
								<p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
									{t.heroSubtitle || "Get instant AI diagnosis for crop diseases. Upload a photo, receive treatment recommendations in seconds."}
								</p>

								{/* CTA Buttons */}
								<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
									<motion.button
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setAppState(STATES.FORM)}
										className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-3"
									>
										<Camera className="w-5 h-5" />
										{t.startFreeAnalysis || "Start Free Analysis"}
										<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all flex items-center justify-center gap-2"
									>
										<PlayCircle className="w-5 h-5 text-emerald-600" />
										{t.watchDemo || "Watch Demo"}
									</motion.button>
								</div>

								{/* Trust Indicators */}
								<p className="text-sm text-slate-500 flex items-center justify-center lg:justify-start gap-2">
									<CheckCircle className="w-4 h-4 text-emerald-500" />
									{t.freeForever || "Free forever • No signup required"}
								</p>
							</motion.div>

							{/* Right - Hero Image/Illustration */}
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="relative"
							>
								<div className="relative mx-auto w-full max-w-lg">
									{/* Floating Cards */}
									<motion.div
										animate={{ y: [0, -10, 0] }}
										transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
										className="absolute -top-4 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl p-4 z-10"
									>
										<div className="flex items-center gap-3">
											<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
												<Leaf className="w-6 h-6 text-white" />
											</div>
											<div>
												<p className="text-sm font-bold text-slate-800">{t.feature1Title || "Instant Diagnosis"}</p>
												<p className="text-xs text-emerald-600 font-semibold">{t.accuracy || "95%+ Accuracy"}</p>
											</div>
										</div>
									</motion.div>

									<motion.div
										animate={{ y: [0, 10, 0] }}
										transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
										className="absolute -bottom-4 -right-4 sm:-right-8 bg-white rounded-2xl shadow-xl p-4 z-10"
									>
										<div className="flex items-center gap-3">
											<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
												<Globe className="w-6 h-6 text-white" />
											</div>
											<div>
												<p className="text-sm font-bold text-slate-800">{t.feature5Title || "Multilingual"}</p>
												<p className="text-xs text-amber-600 font-semibold">7+ Languages</p>
											</div>
										</div>
									</motion.div>

									{/* Main Image Container */}
									<div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 shadow-2xl border border-emerald-200/50">
										{/* Placeholder content - can be replaced with actual image */}
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="text-center p-8">
												<motion.div
													animate={{ rotate: [0, 5, -5, 0] }}
													transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
													className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg"
												>
													<Microscope className="w-16 h-16 text-white" />
												</motion.div>
												<p className="text-2xl font-bold text-emerald-800 mb-2">🌾 🍅 🍎</p>
												<p className="text-slate-600 font-medium">AI-Powered Analysis</p>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-16 bg-white/50 backdrop-blur-sm border-y border-slate-200/50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="grid grid-cols-2 lg:grid-cols-4 gap-8"
						>
							{[
								{ value: "50K+", label: t.statFarmers || "Farmers Helped", icon: User, color: "emerald" },
								{ value: "200K+", label: t.statDiagnoses || "Diagnoses Made", icon: Microscope, color: "blue" },
								{ value: "95%", label: t.statAccuracy || "Accuracy Rate", icon: CheckCircle, color: "amber" },
								{ value: "7+", label: t.statLanguages || "Languages", icon: Globe, color: "violet" },
							].map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className="text-center"
								>
									<div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-${stat.color}-100 flex items-center justify-center`}>
										<stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
									</div>
									<p className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">{stat.value}</p>
									<p className="text-slate-600 font-medium">{stat.label}</p>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-20 sm:py-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
								{t.featuresTitle || "Why Farmers Trust AgroVision"}
							</h2>
							<p className="text-lg text-slate-600 max-w-2xl mx-auto">
								{t.featuresSubtitle || "Advanced technology made simple for every farmer"}
							</p>
						</motion.div>

						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{[
								{ icon: Zap, title: t.feature1Title || "Instant Diagnosis", desc: t.feature1Desc || "Get accurate disease identification within seconds using GPT-4 Vision AI", color: "emerald" },
								{ icon: Sprout, title: t.feature2Title || "10+ Crops Supported", desc: t.feature2Desc || "Rice, Wheat, Tomato, Apple, Cotton, and many more crops covered", color: "green" },
								{ icon: FileText, title: t.feature3Title || "Treatment Plans", desc: t.feature3Desc || "Receive specific medicine recommendations and preventive measures", color: "blue" },
								{ icon: CloudRain, title: t.feature4Title || "Weather Aware", desc: t.feature4Desc || "AI considers your local weather for more accurate diagnosis", color: "cyan" },
								{ icon: Globe, title: t.feature5Title || "Multilingual", desc: t.feature5Desc || "Available in Hindi, Tamil, Telugu, Bengali, Kannada, Marathi & more", color: "amber" },
								{ icon: Shield, title: t.feature6Title || "Works Offline", desc: t.feature6Desc || "Access your previous diagnoses even without internet", color: "violet" },
							].map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ y: -5 }}
									className="group p-6 sm:p-8 bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-200/50 hover:shadow-xl hover:border-emerald-200/50 transition-all"
								>
									<div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
										<feature.icon className="w-7 h-7 text-white" />
									</div>
									<h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
									<p className="text-slate-600 leading-relaxed">{feature.desc}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* How It Works Section */}
				<section className="py-20 sm:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
								{t.howWorks || "How It Works"}
							</h2>
							<p className="text-lg text-slate-600 max-w-2xl mx-auto">
								{t.howWorksDesc || "Our AI-powered system provides accurate crop disease diagnosis in three simple steps."}
							</p>
						</motion.div>

						<div className="grid md:grid-cols-3 gap-8">
							{[
								{ step: "01", icon: Camera, title: t.step1Title || "Capture Photos", desc: t.step1Detail || "Take 3 clear photos of affected leaves from different angles" },
								{ step: "02", icon: Cpu, title: t.step2Title || "AI Analysis", desc: t.step2Detail || "Our AI compares your images with scientific disease databases" },
								{ step: "03", icon: FileText, title: t.step3Title || "Get Treatment", desc: t.step3Detail || "Receive instant diagnosis and actionable treatment plans" },
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.15 }}
									className="relative"
								>
									{/* Connector Line */}
									{index < 2 && (
										<div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-emerald-300 to-transparent" />
									)}
									
									<div className="text-center">
										<div className="relative inline-block mb-6">
											<div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center border-2 border-emerald-200">
												<item.icon className="w-10 h-10 text-emerald-600" />
											</div>
											<div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
												{item.step}
											</div>
										</div>
										<h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
										<p className="text-slate-600">{item.desc}</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className="py-20 sm:py-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
								{t.testimonialsTitle || "What Farmers Say"}
							</h2>
						</motion.div>

						<div className="grid md:grid-cols-3 gap-6 sm:gap-8">
							{[
								{ quote: t.testimonial1 || "AgroVision saved my tomato crop. The AI detected early blight before I could even see it clearly!", author: t.testimonial1Author || "Ramesh Kumar", location: t.testimonial1Location || "Farmer, Punjab" },
								{ quote: t.testimonial2 || "Finally an app that works in my language. The treatment suggestions are very accurate.", author: t.testimonial2Author || "Lakshmi Devi", location: t.testimonial2Location || "Farmer, Andhra Pradesh" },
								{ quote: t.testimonial3 || "I used to lose 30% of my crop to diseases. Now I catch them early and save money.", author: t.testimonial3Author || "Suresh Patel", location: t.testimonial3Location || "Farmer, Gujarat" },
							].map((testimonial, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200/50"
								>
									<div className="flex gap-1 mb-4">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
										))}
									</div>
									<p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
											{testimonial.author.charAt(0)}
										</div>
										<div>
											<p className="font-bold text-slate-900">{testimonial.author}</p>
											<p className="text-sm text-slate-500">{testimonial.location}</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 sm:py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
					{/* Background Pattern */}
					<div className="absolute inset-0 opacity-10">
						<div className="absolute inset-0" style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}} />
					</div>

					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
								{t.ctaTitle || "Ready to Protect Your Crops?"}
							</h2>
							<p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
								{t.ctaSubtitle || "Join thousands of farmers using AI to fight crop diseases"}
							</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setAppState(STATES.FORM)}
								className="px-10 py-5 bg-white text-emerald-700 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/25 transition-all flex items-center gap-3 mx-auto"
							>
								<Camera className="w-6 h-6" />
								{t.ctaButton || "Start Free Diagnosis Now"}
								<ArrowRight className="w-6 h-6" />
							</motion.button>
						</motion.div>
					</div>
				</section>

				{/* Footer */}
				<footer className="bg-slate-900 text-white py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-4 gap-8 mb-12">
							{/* Brand */}
							<div className="md:col-span-1">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
										<Leaf className="w-6 h-6 text-white" />
									</div>
									<span className="text-xl font-bold">AgroVision</span>
								</div>
								<p className="text-slate-400 text-sm mb-4">
									{t.footerDesc || "Empowering farmers with instant, accurate crop disease diagnosis."}
								</p>
							</div>

							{/* Links */}
							<div>
								<h4 className="font-bold mb-4">{t.footerProduct || "Product"}</h4>
								<ul className="space-y-2 text-slate-400 text-sm">
									<li><a href="#" className="hover:text-white transition-colors">{t.footerFeatures || "Features"}</a></li>
									<li><a href="#" className="hover:text-white transition-colors">{t.footerHowItWorks || "How It Works"}</a></li>
									<li><a href="#" className="hover:text-white transition-colors">{t.footerPricing || "Pricing"}</a></li>
								</ul>
							</div>

							<div>
								<h4 className="font-bold mb-4">{t.footerSupport || "Support"}</h4>
								<ul className="space-y-2 text-slate-400 text-sm">
									<li><a href="#" className="hover:text-white transition-colors">{t.footerHelp || "Help Center"}</a></li>
									<li><a href="#" className="hover:text-white transition-colors">{t.footerContact || "Contact Us"}</a></li>
									<li><a href="#" className="hover:text-white transition-colors">{t.footerFAQ || "FAQ"}</a></li>
								</ul>
							</div>

							<div>
								<h4 className="font-bold mb-4">{t.footerLegal || "Legal"}</h4>
								<ul className="space-y-2 text-slate-400 text-sm">
									<li><a href="#" className="hover:text-white transition-colors">{t.footerPrivacy || "Privacy Policy"}</a></li>
									<li><a href="#" className="hover:text-white transition-colors">{t.footerTerms || "Terms of Service"}</a></li>
								</ul>
							</div>
						</div>

						<div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
							<p>© {new Date().getFullYear()} AgroVision. {t.footerRights || "All rights reserved."}</p>
						</div>
					</div>
				</footer>
			</motion.div>
		);
	};

	// Sparkles icon component (if not already imported)
	const Sparkles = ({ className }) => (
		<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
		</svg>
	);

	// ============================================
	// MAIN RENDER
	// ============================================
	return (
		<>
			{/* Toast Notifications */}
			<Toaster
				position="top-right"
				reverseOrder={false}
				gutter={8}
				toastOptions={{
					duration: 3000,
					style: {
						background: "#fff",
						color: "#363636",
						padding: "16px",
						borderRadius: "12px",
						boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
						fontSize: "14px",
						fontWeight: "500",
					},
					success: {
						style: {
							background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
							color: "white",
						},
						iconTheme: {
							primary: "white",
							secondary: "#22c55e",
						},
						duration: 2500,
					},
					error: {
						style: {
							background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
							color: "white",
						},
						iconTheme: {
							primary: "white",
							secondary: "#ef4444",
						},
						duration: 4000,
					},
					loading: {
						style: {
							background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
							color: "white",
						},
						iconTheme: {
							primary: "white",
							secondary: "#3b82f6",
						},
					},
				}}
			/>

			{/* Language Selector Popup - Shows on first visit */}
			{showLanguageSelector && (
				<LanguageSelector
					onSelect={handleLanguageSelect}
					currentLang={language || "en"}
				/>
			)}

			{/* Gamification Overlays */}
			{showConfetti && <Confetti />}
			<AnimatePresence>
				{showAchievement && (
					<AchievementNotification achievement={showAchievement} />
				)}
			</AnimatePresence>
			<PointsEarned points={earnedPoints} />

			{/* Discount Unlock Popup */}
			<AnimatePresence>
				{showDiscountPopup && (
					<DiscountPopup
						discount={showDiscountPopup}
						onClose={() => setShowDiscountPopup(null)}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence mode="wait">
				{(() => {
					console.log(
						"Current appState:",
						appState,
						"STATES.LANDING:",
						STATES.LANDING,
					);
					return null;
				})()}
				{appState === STATES.LANDING && renderLanding()}
				{appState === STATES.FORM && renderForm()}
				{appState === STATES.ANALYZING && renderAnalyzing()}
				{appState === STATES.RESULT && renderResult()}
				{appState === STATES.ACADEMY && renderAcademy()}
				{appState === STATES.QUIZ && renderQuiz()}
				{appState === STATES.CALIBRATION && renderCalibration()}
				{appState === STATES.MISSIONS && renderAcademy()}
			</AnimatePresence>
		</>
	);
}
