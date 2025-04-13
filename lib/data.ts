// Experience Data
export const experienceData = [
  {
    id: 1,
    title: "Senior Associate Consultant",
    company: "Cubastion Consulting Pvt Ltd",
    date: "Oct 2022 - Present",
    description:
      "Developed and deployed mobile and backend solutions for various in-house and client projects, enhancing system efficiency.",
    projects: [
      {
        name: "Mercedes Benz Dealer App (DSD Tabs)",
        role: "Flutter Developer",
        technologies: ["Flutter", "Swift"],
        description:
          "Created a dealer app for Mercedes Benz that provides real-time status of vehicle health checks, parts search functionality, and service request generation.",
        impact:
          "Reduced service time by 30% by enabling real-time updates and streamlined operations for dealership services.",
      },
      {
        name: "CLST (Cryptocurrency Trading Platform)",
        role: "Python Developer",
        technologies: ["Python", "REST API", "Sockets"],
        description:
          "Developed a module to fetch real-time cryptocurrency prices using REST API. Created a loan scheduling module to assist in financial planning and management.",
        impact:
          "Improved transaction accuracy by 40% and provided robust tools for financial management in the cryptocurrency domain.",
      },
      {
        name: "STC (Saudi Telecom Communications)",
        role: "Java Developer",
        technologies: ["Java", "Microservices", "ESB", "EAI", "Siebel"],
        description:
          "Code reviewer and developer for various modules, including authentication services, physical and logical resource management, and trouble ticketing. Worked on multiple systems in telecommunications, including ESB (Enterprise Service Bus), EAI (Enterprise Application Integration), and Siebel.",
        impact:
          "Improved system reliability and efficiency by 35% through comprehensive code reviews and the development of robust microservices architecture. Enhanced resource management and troubleshooting capabilities, reducing issue resolution time by 25%.",
      },
      {
        name: "Nelumbium Capital",
        role: "Java & Python Developer",
        technologies: ["Java", "Python", "LLM"],
        description: "Developing agent based economic crises simulation with Integration of LLM.",
        impact:
          "Got significantly improved result around 76% when compared with traditional agent-based simulation model when analysis is done In 2007 economic crises.",
      },
      {
        name: "Mitsubishi Fuso Truck and Bus Corporation",
        role: "Python Developer",
        technologies: ["Python", "Stable Diffusion", "Chatbot"],
        description:
          "Developed an agent-based chatbot capable of handling image-based queries and integrating with knowledge sources for engines and motors. Successfully implemented a Stable Diffusion pipeline for generating high-quality images to automate the creation of sales posters.",
        impact:
          "Reduced manual effort by automating tasks, achieving an accuracy improvement of 87%. Enhanced operational efficiency and contributed to a more engaging and visually compelling customer experience.",
      },
    ],
  },
]

// Projects Data
export const projectsData = [
  {
    id: 1,
    title: "Face Recognition App",
    description:
      "Developed the app using Swift language. Initially, a Python server was built for face recognition; later, Core ML was used to perform the recognition process on the mobile itself for faster results, resulting in a 70% increase in speed after migration. Created a custom-built model for mobile face recognition, removing dependency on an extra overhead server.",
    technologies: ["Swift", "Python", "Core ML", "Face Recognition"],
    image: "/facerecog.png?height=300&width=500",
  },
  {
    id: 2,
    title: "Finance Learning App",
    description:
      "Created for kids to gain finance knowledge, containing gamification elements like chapter completion rewards, daily login rewards, and certificates upon completion. Used Swift with Firebase and backend with Flask Python as microservice architecture.",
    technologies: ["Swift", "Firebase", "Flask", "Python", "Microservices"],
    image: "/flearning.png?height=300&width=500",
  },
  {
    id: 3,
    title: "Instagram Clone",
    description:
      "Developed using Flutter framework, compiled for all platforms. Firebase is used as the backend. Included functionalities similar to Instagram, such as liking posts, comments, status updates, follow and unfollow, and viewing shorts.",
    technologies: ["Flutter", "Firebase", "Mobile Development"],
    image: "/instaclone.png?height=300&width=500",
  },
  {
    id: 4,
    title: "Generative AI Chatbot",
    description:
      "Built a chatbot integrated with LLMs for answering domain-specific queries related to industrial engines and HR automation. Incorporated image-based queries and generated visuals using Stable Diffusion pipeline.",
    technologies: ["Python", "LLM", "Stable Diffusion", "GenAI", "Chatbot"],
    image: "/genai.png?height=300&width=500",
  },
  {
    id: 5,
    title: "CHIP-8 Emulator",
    description:
      "Developed a CHIP-8 emulator in C++ that interprets and runs old 8-bit programs. Implemented memory management, instruction decoding, and keyboard input handling.",
    technologies: ["C++", "Emulator", "Low-level Programming"],
    image: "/chip8.png?height=300&width=500",
  },
  {
    id: 6,
    title: "Dino Run Game",
    description:
      "Built a 2D endless runner game similar to Chrome's offline dinosaur game using Flutter and Flame game engine. Added features like parallax scrolling and smooth jump controls.",
    technologies: ["Flutter", "Flame", "Game Development"],
    image: "/dino_run.svg?height=300&width=500",
  },
  {
    id: 7,
    title: "Chess Game with Stockfish",
    description:
      "Built a multiplayer chess app using Flutter, supporting human vs. human and human vs. Stockfish engine gameplay. Integrated Stockfish engine for real-time analysis and move evaluation.",
    technologies: ["Flutter", "Stockfish", "Multiplayer", "Game AI"],
    image: "/pocketchess.png?height=300&width=500",
  }
];

// Skill Levels Data
export const skillLevels: Record<string, number> = {
  Python: 90,
  Swift: 85,
  Flutter: 88,
  Java: 82,
  "Objective-C": 75,
  "C++": 78,
  Git: 92,
  AWS: 80,
  PostgreSQL: 85,
  MongoDB: 83,
  Firebase: 90,
  Docker: 78,
  Unix: 85,
}

// Skills Data
export const skillsData = {
  programming: ["Python", "Swift", "Flutter", "Java", "Objective-C", "C++"],
  tools: ["Git", "AWS", "PostgreSQL", "MongoDB", "Firebase", "Docker", "Unix"],
}

// Education Data
export const educationData = [
  {
    id: 1,
    degree: "Master of Technology in Food Process Engineering",
    institution: "Indian Institute of Technology, Kharagpur",
    date: "May 2022",
    gpa: "8.60",
  },
  {
    id: 2,
    degree: "Bachelor of Technology in Agricultural Engineering",
    institution: "Acharya NG Ranga Agricultural University, Guntur",
    date: "Oct 2020",
    gpa: "7.49",
  },
]

// Certifications Data
export const certificationsData = [
  {
    id: 1,
    name: "Neo4j Certified Professional",
  },
  {
    id: 2,
    name: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
  },
  {
    id: 3,
    name: "Oracle Machine Learning using Autonomous Database 2021 Certified Specialist",
  },
  {
    id: 4,
    name: "MTA: Introduction to Programming Using Python - Certified 2021",
  },
]

