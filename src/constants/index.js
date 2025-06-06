const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Education",
    link: "#education",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Experience",
    link: "#experience",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg", index: 0 },
  { text: "Concepts", imgPath: "/images/concepts.svg", index: 1 },
  { text: "Designs", imgPath: "/images/designs.svg", index: 2 },
  { text: "Code", imgPath: "/images/code.svg", index: 3 },
  { text: "Ideas", imgPath: "/images/ideas.svg", index: 4 },
  { text: "Concepts", imgPath: "/images/concepts.svg", index: 5 },
  { text: "Designs", imgPath: "/images/designs.svg", index: 6 },
  { text: "Code", imgPath: "/images/code.svg", index: 7 },
];

const counterItems = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 10, suffix: "+", label: "Completed Projects" },
  { value: 10, suffix: "+", label: "Certifications" },
  { value: 20, suffix: "+", label: "Skills Learned" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.jpg",
  },
  {
    imgPath: "/images/logos/company-logo-2.jpg",
  },
  {
    imgPath: "/images/logos/company-logo-3.jpg",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.jpg",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.jpg",
  },
];

const abilities = [
  {
    imgPath: "/images/curious.png",
    title: "🚀 Curious Learner",
    desc: "Always exploring new tech like Web3, AI, and RAG to stay ahead in the game.",
  },
  {
    imgPath: "/images/fullstack.png",
    title: "🌐 Full-Stack Developer",
    desc: "Skilled in building robust apps using MERN stack, Next.js, and modern frameworks.",
  },
  {
    imgPath: "/images/mindset.png",
    title: "🛠 Project-First Mindset",
    desc: "I build real-world solutions through hands-on development.",
  },
  {
    imgPath: "/images/hackathon.png",
    title: "⚡ Hackathon Enthusiast",
    desc: "Thrives in fast-paced environments, solving impactful problems with innovation.",
  },
  {
    imgPath: "/images/uiux.png",
    title: "🎨 Design-Aware Coder",
    desc: "Focused on clean UI and smooth UX—loves bringing ideas to life beautifully.",
  },
  {
    imgPath: "/images/tools.png",
    title: "🧰 Tool-Savvy Engineer",
    desc: "Proficient with cutting-edge tools.",
  },
  {
    imgPath: "/images/crossplatform.png",
    title: " 📱 Cross-Platform Creator",
    desc: "Builds across web, mobile, and desktop.",
  },
  {
    imgPath: "/images/growth.png",
    title: " 🧠 Product-Driven Thinker",
    desc: "Crafts solutions with user needs at the core.",
  },
  {
    imgPath: "/images/ai.png",
    title: " 🤖 AI-Integrated Builder",
    desc: "Merges AI with real-world apps.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/next_react-transformed.glb",
    scale: 1,
    rotation: [-Math.PI/2, Math.PI, -Math.PI],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
  {
    name: "AI/ML Enthusiast",
    modelPath: "/models/robo_face-transformed.glb",
    scale: 10,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const eduCards = [
  { 
    Institution: "Vidyavardhini's College of Engineering and Technology",
    overview: "Currently pursuing a Bachelor's degree in Computer Engineering, focusing on software development, machine learning, and scalable system design.",
    imgPath: "/images/edu1.jpg",
    logoPath: "/images/logo1.jpg",
    title: "Bachelor in Computer Engineering",
    date: "2023 – 2027",
    percentage: "8.54",
    learnings: [
      "Gained strong problem-solving and analytical thinking through subjects like Data Structures, Algorithms, and System Design.",
      "Built real-world software projects using React, Next.js, MongoDB, and backend tools like Node.js & Express.",
      "Explored emerging technologies like AI/ML, Blockchain, and RAG, developing practical knowledge in LLMs and scalable architecture.",
    ]
  },
  { 
    Institution: "Mithibai College of Science and Commerce",
    overview: "Completed higher secondary education in the science stream with a foundation in Physics, Chemistry, and Mathematics, preparing for engineering studies.",
    imgPath: "/images/edu2.jpg",
    logoPath: "/images/logo2.jpg",
    title: "11th and 12th in Science Stream",
    date: "2021 – 2023",
    percentage: "75.5%",
    learnings: [
      "Strengthened core foundations in Physics, Chemistry, and Mathematics essential for engineering logic.",
      "Developed time management and conceptual clarity while preparing for competitive entrance exams.",
      "Initiated self-learning in programming and tech fundamentals outside the curriculum.",
    ]
  },
  { 
    Institution: "Oxford International School",
    overview: "Completed schooling under the ICSE board, building strong fundamentals in Mathematics, Science, English, and Logical Reasoning.",
    imgPath: "/images/edu3.jpg",
    logoPath: "/images/logo3.jpg",
    title: "ICSE Schooling till 10th Grade",
    date: "2011 – 2021",
    percentage: "95.5%",
    learnings: [
      "Built a solid base in English communication, Science, Mathematics, and Logical Reasoning.",
      "Participated in co-curricular activities that shaped creativity, discipline, and team spirit.",
      "Learned basic programming logic and digital literacy, which sparked an early interest in software development.",
    ]
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const Experience = [
  {
    companyName: "Prodigy InfoTech",
    type: "Internship",
    duration: "1 Month",
    position: "Full Stack Developer",
    date: "Dec 2024 - jan 2025",
    mentions: "https://prodigyinfotech.dev/",
    review:
      "I can’t say enough good things about Vedant. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.jpg",
  },
  {
    companyName: "Devlok Avenue",
    type: "Internship",
    duration: "1 Month",
    position: "MERN Stack Developer",
    date: "Feb 2025 - May 2025",
    mentions: "https://devlokavenue.in/",
    review:
      "Working with Vedant was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client2.jpg",
  },
];

const socialImgs = [
  {
    name: "github",
    url: "https://github.com/VEDANTDHAVAN",
    imgPath: "/images/github.png",
  },
  {
    name: "insta",
    url: "https://www.instagram.com/dhavanvedant_2006",
    imgPath: "/images/insta.png",
  },
  {
    name: "x",
    url: "https://x.com/w35y4y",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/vedant-dhavan-5930ba2a3/",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  eduCards,
  expLogos,
  Experience,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
