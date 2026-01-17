import {
	Award,
	BookOpen,
	Bug,
	Droplets,
	ShieldAlert,
	Sprout,
} from "lucide-react";

// This function generates the course structure with translations
export const getSustainableFarmingCourse = (t) => [
	{
		id: "unit_1",
		title: t.unit1Title || "Unit 1: Healthy Soil, Healthy Farm",
		description: t.unit1Desc || "Master the basics of soil health",
		icon: Sprout,
		nodes: [
			{
				id: "u1_n1",
				title: t.lesson_u1_n1_title || "What improves soil?",
				type: "lesson",
				content: [
					{
						type: "text",
						text:
							t.lesson_u1_n1_text ||
							"Soil is the foundation of your farm. Healthy soil means better yields and less disease.",
					},
					{
						type: "quiz",
						question:
							t.lesson_u1_n1_q || "Which practice helps soil health the most?",
						options: [
							{ id: "a", text: t.lesson_u1_n1_a || "Burning crop residue" },
							{
								id: "b",
								text: t.lesson_u1_n1_b || "Adding organic matter (Compost)",
								correct: true,
							},
							{ id: "c", text: t.lesson_u1_n1_c || "Flooding the field" },
						],
					},
				],
			},
			{
				id: "u1_n2",
				title: t.lesson_u1_n2_title || "Organic Inputs",
				type: "lesson",
				content: [
					{
						type: "text",
						text:
							t.lesson_u1_n2_text ||
							"Organic inputs like compost and cow dung enrich the soil with microbes.",
					},
					{
						type: "quiz",
						question:
							t.lesson_u1_n2_q || "What is an example of an organic input?",
						options: [
							{ id: "a", text: t.lesson_u1_n2_a || "Urea" },
							{
								id: "b",
								text: t.lesson_u1_n2_b || "Compost/Cow Dung",
								correct: true,
							},
							{ id: "c", text: t.lesson_u1_n2_c || "Pesticide" },
						],
					},
				],
			},
			{
				id: "u1_n3",
				title: t.lesson_u1_n3_title || "Quick Checks",
				type: "quiz_review",
				questions: [
					{
						question:
							t.lesson_u1_n3_q ||
							"True or False: Burning residue is good for soil.",
						options: [
							{ id: "a", text: t.lesson_u1_n3_a || "True" },
							{ id: "b", text: t.lesson_u1_n3_b || "False", correct: true },
						],
					},
				],
			},
		],
	},
	{
		id: "unit_2",
		title: t.unit2Title || "Unit 2: Power of Organic Inputs",
		description: t.unit2Desc || "Reduce costs with homemade inputs",
		icon: Droplets,
		nodes: [
			{
				id: "u2_n1",
				title: t.lesson_u2_n1_title || "Why use compost?",
				type: "lesson",
				content: [
					{
						type: "text",
						text:
							t.lesson_u2_n1_text ||
							"Compost improves water retention and adds nutrients slowly.",
					},
				],
			},
			{
				id: "u2_n2",
				title: t.lesson_u2_n2_title || "Microbes & Fertility",
				type: "lesson",
				content: [
					{
						type: "text",
						text:
							t.lesson_u2_n2_text ||
							"Microbes interact with roots to help plants eat.",
					},
				],
			},
			{
				id: "u2_n3",
				title: t.lesson_u2_n3_title || "Knowledge Check",
				type: "quiz_review",
				questions: [
					{
						question: t.lesson_u2_n3_q || "Compost helps soil hold more...",
						options: [
							{ id: "a", text: t.lesson_u2_n3_a || "Water", correct: true },
							{ id: "b", text: t.lesson_u2_n3_b || "Heat" },
						],
					},
				],
			},
		],
	},
	{
		id: "unit_3",
		title: t.unit3Title || "Unit 3: Mixed Cropping Mastery",
		description: t.unit3Desc || "Protect against pests naturally",
		icon: Bug,
		nodes: [
			{
				id: "u3_n1",
				title: t.lesson_u3_n1_title || "Benefits of Mixed Cropping",
				type: "lesson",
				content: [
					{
						type: "quiz",
						question: t.lesson_u3_n1_q || "Why do farmers use mixed cropping?",
						options: [
							{ id: "a", text: t.lesson_u3_n1_a || "It looks nice" },
							{
								id: "b",
								text: t.lesson_u3_n1_b || "Reduces pests & improves soil",
								correct: true,
							},
						],
					},
				],
			},
			{
				id: "u3_n2",
				title: t.lesson_u3_n2_title || "Good Combinations",
				type: "lesson",
				content: [
					{
						type: "text",
						text:
							t.lesson_u3_n2_text ||
							"Example: Maize + Beans. Beans fix nitrogen for the maize.",
					},
				],
			},
			{
				id: "u3_n3",
				title: t.lesson_u3_n3_title || "Reinforcement",
				type: "quiz_review",
				questions: [
					{
						question: t.lesson_u3_n3_q || "What is a risk of mono-cropping?",
						options: [
							{
								id: "a",
								text: t.lesson_u3_n3_a || "High pest risk",
								correct: true,
							},
							{ id: "b", text: t.lesson_u3_n3_b || "Too much yield" },
						],
					},
				],
			},
		],
	},
	{
		id: "unit_4",
		title: t.unit4Title || "Unit 4: Avoiding Harmful Practices",
		description: t.unit4Desc || "Stop wasting money and hurting land",
		icon: ShieldAlert,
		nodes: [
			{
				id: "u4_n1",
				title: t.lesson_u4_n1_title || "Over-irrigation Harms",
				type: "lesson",
				content: [
					{
						type: "quiz",
						question:
							t.lesson_u4_n1_q || "What happens when you over-irrigate?",
						options: [
							{
								id: "a",
								text: t.lesson_u4_n1_a || "Root rot & nutrient loss",
								correct: true,
							},
							{ id: "b", text: t.lesson_u4_n1_b || "Faster growth" },
						],
					},
				],
			},
			{
				id: "u4_n2",
				title: t.lesson_u4_n2_title || "Excess Chemical Risks",
				type: "lesson",
				content: [
					{
						type: "text",
						text:
							t.lesson_u4_n2_text ||
							"Too many chemicals kill the good microbes.",
					},
				],
			},
			{
				id: "u4_n3",
				title: t.lesson_u4_n3_title || "Mono-cropping",
				type: "lesson",
				content: [
					{
						type: "text",
						text:
							t.lesson_u4_n3_text ||
							"Planting the same thing every year depletes soil.",
					},
				],
			},
			{
				id: "u4_n4",
				title: t.lesson_u4_n4_title || "Review Challenge",
				type: "quiz_review",
				questions: [
					{
						question: t.lesson_u4_n4_q || "Which of these is unsustainable?",
						options: [
							{ id: "a", text: t.lesson_u4_n4_a || "Crop Rotation" },
							{
								id: "b",
								text: t.lesson_u4_n4_b || "Heavy Chemical Use",
								correct: true,
							},
						],
					},
				],
			},
		],
	},
	{
		id: "unit_5",
		title: t.unit5Title || "Unit 5: Grand Review",
		description: t.unit5Desc || "Prove your knowledge",
		icon: Award,
		nodes: [
			{
				id: "u5_n1",
				title: t.lesson_u5_n1_title || "Sustainable Farming Challenge",
				type: "quiz_review",
				questions: [
					{
						question:
							t.lesson_u5_n1_q1 ||
							"Which practice reduces chemical use naturally?",
						options: [
							{
								id: "a",
								text: t.lesson_u5_n1_q1_a || "Mixed Cropping",
								correct: true,
							},
							{ id: "b", text: t.lesson_u5_n1_q1_b || "Spraying more" },
						],
					},
					{
						question:
							t.lesson_u5_n1_q2 || "What is an example of an organic input?",
						options: [
							{
								id: "a",
								text: t.lesson_u5_n1_q2_a || "Compost",
								correct: true,
							},
							{ id: "b", text: t.lesson_u5_n1_q2_b || "Urea" },
						],
					},
					{
						question: t.lesson_u5_n1_q3 || "Why check soil health?",
						options: [
							{
								id: "a",
								text: t.lesson_u5_n1_q3_a || "To save money & improve yield",
								correct: true,
							},
							{ id: "b", text: t.lesson_u5_n1_q3_b || "It is fun" },
						],
					},
				],
			},
		],
	},
];

export const getDailyMissions = (t) => [
	{
		id: "m1",
		title: t.mission1 || "Complete 1 Sustainable Farming Lesson",
		xp: 10,
		completed: false,
	},
	{
		id: "m2",
		title: t.mission2 || "Upload photo proof: Using compost",
		xp: 50,
		completed: false,
	},
	{
		id: "m3",
		title: t.mission3 || "Answer 3 mixed-cropping flashcards",
		xp: 15,
		completed: false,
	},
];

export const LEADERBOARD_DATA = [
	{ rank: 1, name: "Ramesh Kumar", village: "Rampur", xp: 1250, badge: "🏆" },
	{ rank: 2, name: "Suresh Patel", village: "Rampur", xp: 980, badge: "🥈" },
	{ rank: 3, name: "Anita Devi", village: "Rampur", xp: 850, badge: "🥉" },
	{ rank: 4, name: "You", village: "Rampur", xp: 0, badge: "⭐" }, // XP will be updated dynamically
	{ rank: 5, name: "Vikram Singh", village: "Rampur", xp: 0, badge: "" },
];
