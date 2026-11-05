import {
  PersonalInfo,
  EducationItem,
  SkillCategory,
  Project,
  Achievement,
  Certificate,
  ExperienceItem,
} from '../types/portfolio';

export const initialPersonalInfo: PersonalInfo = {
  name: 'S. SANTHOSH',
  title: 'Artificial Intelligence & Data Science Undergraduate',
  tagline: 'Building intelligent solutions through technology, creativity and innovation.',
  bio: 'I am a passionate and dedicated B.Tech Artificial Intelligence and Data Science undergraduate at Velalar College of Engineering and Technology. With a strong foundation in core computer science, machine learning models, deep learning architectures, and generative AI systems, I focus on solving real-world challenges through technology. I have hands-on experience developing clinical biomedical imaging pipelines, full-stack web platforms, and intelligent algorithm systems. My objective is to contribute to innovative software and AI-driven solutions as a software engineer and AI specialist.',
  degree: 'B.Tech, Artificial Intelligence and Data Science',
  college: 'Velalar College of Engineering and Technology, Erode',
  cgpa: '8.22 (up to 4th semester)',
  email: 'santhoshsam2129@gmail.com',
  phone: '9080477928',
  location: 'Erode, Tamil Nadu, India',
  linkedin: 'https://www.linkedin.com/in/santhoshvcet',
  github: 'https://github.com/Santhosh-tech006',
  interests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Software Development',
    'Data Science',
  ],
  statusBadge: 'Open to Placements & Opportunities',
  typingTitles: [
    'AI & Data Science Student',
    'Python & Machine Learning Developer',
    'Full-Stack Developer',
  ],
  resumeUrl: '/resume-s-santhosh.pdf',
  profilePhoto: '/src/assets/images/santhosh_profile_1793870349436.jpg',
  subBlocks: {
    educationOverview:
      'Pursuing B.Tech in Artificial Intelligence & Data Science (2024–2028, 3rd Year) with an academic CGPA of 8.22 up to 4th semester at Velalar College of Engineering and Technology.',
    technicalInterests:
      'Deep learning for medical imaging, generative AI models, algorithmic problem solving, and modern full-stack web development.',
    careerGoals:
      'Aspiring to excel as a software development and AI engineer, contributing to production-ready scalable systems and data-driven solutions.',
    personalDevelopment:
      'Active participant in hackathons, open-source projects, technical challenges, and competitive chess.',
    academicJourney:
      'Solid coursework in Data Structures, Algorithms, Mathematics, Database Systems, and Neural Networks.',
  },
};

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    level: 'B.Tech',
    degreeOrExam: 'B.Tech in Artificial Intelligence and Data Science',
    institution: 'Velalar College of Engineering and Technology (VCET)',
    boardOrUniversity: 'Anna University Affiliated',
    scoreOrCgpa: 'CGPA: 8.22 (up to 4th semester)',
    period: '2024 – 2028 (3rd Year)',
    status: 'In Progress',
    isPlaceholder: false,
    highlights: [
      'Current Year: 3rd Year (Expected Graduation: 2028)',
      'Consistent academic standing: CGPA of 8.22 up to 4th semester',
      'Coursework: Machine Learning, Deep Learning, Data Structures, Algorithms, Database Systems',
    ],
  },
  {
    id: 'edu-2',
    level: '12th Grade / HSC',
    degreeOrExam: 'Higher Secondary School Certificate (12th)',
    institution: 'School Name (Click to Add details)',
    boardOrUniversity: 'State Board / CBSE',
    scoreOrCgpa: 'Score / Percentage: Add details',
    period: 'Year: Add details',
    status: 'Placeholder',
    isPlaceholder: true,
    highlights: ['Editable in admin panel'],
  },
  {
    id: 'edu-3',
    level: '10th Grade / SSLC',
    degreeOrExam: 'Secondary School Leaving Certificate (10th)',
    institution: 'School Name (Click to Add details)',
    boardOrUniversity: 'State Board / CBSE',
    scoreOrCgpa: 'Score / Percentage: Add details',
    period: 'Year: Add details',
    status: 'Placeholder',
    isPlaceholder: true,
    highlights: ['Editable in admin panel'],
  },
];

export const initialSkillCategories: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    description: 'Core languages for algorithmic logic and computational problem solving',
    skills: [
      { name: 'Python', level: null, iconName: 'Terminal' },
      { name: 'Java', level: null, iconName: 'Coffee' },
      { name: 'SQL', level: null, iconName: 'Database' },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Machine learning, deep neural networks, and generative models',
    skills: [
      { name: 'Machine Learning', level: null, iconName: 'Cpu' },
      { name: 'Deep Learning', level: null, iconName: 'Brain' },
      { name: 'TensorFlow', level: null, iconName: 'Layers' },
      { name: 'PyTorch', level: null, iconName: 'Flame' },
      { name: 'Generative AI', level: null, iconName: 'Sparkles' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Platforms',
    description: 'Version control, telemetry, databases, and developer environments',
    skills: [
      { name: 'Git', level: null, iconName: 'GitBranch' },
      { name: 'GitHub', level: null, iconName: 'Github' },
      { name: 'Google Colab', level: null, iconName: 'Cloud' },
      { name: 'VS Code', level: null, iconName: 'Code' },
      { name: 'Grafana', level: null, iconName: 'Activity' },
      { name: 'MySQL', level: null, iconName: 'Database' },
      { name: 'MQTT', level: null, iconName: 'Radio' },
    ],
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Full-stack engineering, web user interfaces, and server services',
    skills: [
      { name: 'HTML', level: null, iconName: 'FileCode' },
      { name: 'CSS', level: null, iconName: 'Palette' },
      { name: 'JavaScript', level: null, iconName: 'Braces' },
      { name: 'React', level: null, iconName: 'Atom' },
      { name: 'Node.js', level: null, iconName: 'Server' },
    ],
  },
];

export const initialProjects: Project[] = [
  {
    id: 'brain-tumor-detection',
    title: 'Brain Tumor Detection',
    category: 'AI & Medical Imaging',
    summary:
      'MRI image enhancement and brain tumor classification using a dual-module approach.',
    tags: ['Python', 'Deep Learning', 'PyTorch', 'TensorFlow', 'OpenCV'],
    imageUrl: '/src/assets/images/brain_tumor_project_1793870349677.jpg',
    githubUrl: 'https://github.com/Santhosh-tech006',
    presentationUrl: '',
    liveUrl: '',
    problemStatement:
      'Accurate and early detection of brain tumors from magnetic resonance imaging (MRI) is essential in medical diagnostics, yet raw scans often suffer from noise, low contrast, and complex tissue boundaries.',
    objectives: [
      'Design a two-stage medical imaging pipeline separating enhancement from classification.',
      'Enhance soft-tissue structural definition and reduce MRI acquisition noise.',
      'Classify brain tumor presence with reliable deep learning models.',
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'NumPy', 'Matplotlib'],
    methodology:
      'Module 1 applies spatial filtering and adaptive histogram contrast enhancement to highlight tissue boundaries. Module 2 feeds enhanced scans into a deep convolutional neural network for tumor localization and classification.',
    implementation:
      'Built with Python and PyTorch. Includes automated data preprocessing, image normalization, convolutional neural networks, and model evaluation routines.',
    results: 'Add results',
    features: [
      'Dual-module architecture for enhancement and classification',
      'MRI slice noise reduction and artifact attenuation',
      'Brain tumor region feature extraction',
      'Modular pipeline ready for clinical dataset benchmarking',
    ],
    isFeatured: true,
  },
  {
    id: 'sportzweb',
    title: 'SPORTZWEB',
    category: 'Full-Stack Platform',
    summary:
      'Sports technology and academy website development platform.',
    tags: ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'MySQL'],
    imageUrl: '/src/assets/images/sportzweb_project_1793870351399.jpg',
    githubUrl: 'https://github.com/Santhosh-tech006',
    presentationUrl: '',
    liveUrl: '',
    problemStatement:
      'Sports academies often lack unified web presences and modern software to manage courses, coach rosters, student memberships, and court reservations in a single location.',
    objectives: [
      'Build a modern, high-performance web platform tailored for sports academies and clinics.',
      'Provide intuitive management for coach profiles, courses, and student enrollments.',
      'Implement an interactive scheduling and booking system.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    methodology:
      'Engineered a modular single-page React frontend paired with RESTful backend endpoints and structured database schemas for sports academies, trainers, schedules, and athletes.',
    implementation:
      'Developed responsive UI components, coach directories, course catalogs, student registration workflows, and an administrative oversight dashboard.',
    results: 'Add results',
    features: [
      'Academy website solutions & custom portal design',
      'Detailed coach profiles and accreditation showcases',
      'Course and training session management',
      'Student membership and progress records',
      'Booking system for sessions and athletic facilities',
    ],
    isFeatured: true,
  },
  {
    id: 'checkmate-connect',
    title: 'CHECKMATE CONNECT',
    category: 'AI & Web Platform',
    summary:
      'Chess learning, puzzles, analysis and AI-powered chess assistant platform.',
    tags: ['React', 'JavaScript', 'Python', 'Stockfish API', 'HTML', 'CSS'],
    imageUrl: '/src/assets/images/checkmate_project_1793870350639.jpg',
    githubUrl: 'https://github.com/Santhosh-tech006',
    presentationUrl: '',
    liveUrl: '',
    problemStatement:
      'Chess learners often struggle to pinpoint their tactical mistakes without expensive personal coaches, needing interactive analysis and targeted training modules.',
    objectives: [
      'Provide an interactive digital chessboard with real-time legal move validation.',
      'Integrate Stockfish evaluation engine for move analysis and blunder identification.',
      'Offer structured learning materials, tactical puzzles, and an AI-powered chess assistant.',
    ],
    technologies: ['React', 'TypeScript', 'Stockfish API', 'Tailwind CSS', 'Python'],
    methodology:
      'Combined client-side chessboard mechanics with an asynchronous engine worker for deep evaluation analysis and dynamic tactical puzzle generation.',
    implementation:
      'Features responsive chessboard controls, position evaluation bars, tactical puzzle sequences, and interactive training recommendations.',
    results: 'Add results',
    features: [
      'Interactive chessboard with move validation and animations',
      'Tactical puzzles and progressive training modules',
      'Stockfish engine evaluation and tactical suggestions',
      'AI-powered chess assistant explaining tactical concepts',
      'Opening repertoires and endgame reference material',
    ],
    isFeatured: true,
  },
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'QUANTIX 2K26 Hackathon',
    category: 'Hackathons',
    date: '2026',
    event: 'QUANTIX 2K26 Technical Hackathon',
    roleOrResult: 'Participant (Editable Entry)',
    description:
      'Participated in the QUANTIX 2K26 Hackathon, collaborating on technology solutions and rapid sprint software development.',
    isEditableParticipation: true,
  },
];

export const initialCertifications: Certificate[] = [];

export const initialExperiences: ExperienceItem[] = [];
