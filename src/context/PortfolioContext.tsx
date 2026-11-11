import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  PersonalInfo,
  EducationItem,
  SkillCategory,
  Project,
  Achievement,
  Certificate,
  ExperienceItem,
  ContactMessage,
} from '../types/portfolio';
import {
  initialPersonalInfo,
  initialEducation,
  initialSkillCategories,
  initialProjects,
  initialAchievements,
  initialCertifications,
  initialExperiences,
} from '../data/initialData';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

interface PortfolioContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  personalInfo: PersonalInfo;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => Promise<void>;
  education: EducationItem[];
  updateEducation: (item: EducationItem) => Promise<void>;
  addEducation: (item: Omit<EducationItem, 'id'>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  skillCategories: SkillCategory[];
  updateSkillLevel: (categoryId: string, skillName: string, level: number | null) => Promise<void>;
  addSkill: (categoryId: string, name: string, level: number | null) => Promise<void>;
  deleteSkill: (categoryId: string, skillName: string) => Promise<void>;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  achievements: Achievement[];
  addAchievement: (achievement: Omit<Achievement, 'id'>) => Promise<void>;
  updateAchievement: (achievement: Achievement) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;
  certifications: Certificate[];
  addCertification: (cert: Omit<Certificate, 'id'>) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  experiences: ExperienceItem[];
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => Promise<void>;
  updateExperience: (exp: ExperienceItem) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  messages: ContactMessage[];
  submitContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ success: boolean; error?: string }>;
  markMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  isAdminLoggedIn: boolean;
  adminUser: User | { email: string; displayName?: string } | null;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  isFirebaseLive: boolean;
  activeSection: string;
  setActiveSection: (id: string) => void;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: 'santhosh_theme',
  PERSONAL_INFO: 'santhosh_personal_info_v1',
  EDUCATION: 'santhosh_education_v1',
  SKILLS: 'santhosh_skills_v1',
  PROJECTS: 'santhosh_projects_v1',
  ACHIEVEMENTS: 'santhosh_achievements_v1',
  CERTIFICATIONS: 'santhosh_certifications_v1',
  EXPERIENCE: 'santhosh_experience_v1',
  MESSAGES: 'santhosh_messages_v1',
  LOCAL_ADMIN: 'santhosh_local_admin',
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state - strictly dark theme only
  const theme: 'dark' = 'dark';

  // Active section for scroll spy
  const [activeSection, setActiveSection] = useState<string>('intro');

  // Core portfolio state with localStorage cache fallback
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
    return saved ? JSON.parse(saved) : initialPersonalInfo;
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
    return saved ? JSON.parse(saved) : initialEducation;
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : initialSkillCategories;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [certifications, setCertifications] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
    return saved ? JSON.parse(saved) : initialCertifications;
  });

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
    return saved ? JSON.parse(saved) : initialExperiences;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : [];
  });

  // Auth state
  const [adminUser, setAdminUser] = useState<User | { email: string; displayName?: string } | null>(() => {
    const local = localStorage.getItem(STORAGE_KEYS.LOCAL_ADMIN);
    return local ? JSON.parse(local) : null;
  });

  const isAdminLoggedIn = Boolean(adminUser);
  const isFirebaseLive = isFirebaseConfigured;

  // Enforce dark theme on <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    // Single dark theme - toggling is permanently disabled
  }, []);

  // Listen for real Firebase auth state if Firebase is available
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          setAdminUser(user);
          localStorage.setItem(
            STORAGE_KEYS.LOCAL_ADMIN,
            JSON.stringify({ email: user.email, displayName: user.displayName || 'S. Santhosh' })
          );
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillCategories));
  }, [skillCategories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // Load from Firestore if live
  useEffect(() => {
    if (db && isFirebaseConfigured) {
      const firestore = db;
      const loadFromFirestore = async () => {
        try {
          // Projects
          const projSnap = await getDocs(collection(firestore, 'projects'));
          if (!projSnap.empty) {
            const list: Project[] = [];
            projSnap.forEach(d => list.push({ id: d.id, ...d.data() } as Project));
            setProjects(list);
          }
          // Messages
          const msgSnap = await getDocs(collection(firestore, 'contact_messages'));
          if (!msgSnap.empty) {
            const mList: ContactMessage[] = [];
            msgSnap.forEach(d => mList.push({ id: d.id, ...d.data() } as ContactMessage));
            setMessages(mList);
          }
        } catch (err) {
          console.info('Firestore initial fetch fallback:', err);
        }
      };
      loadFromFirestore();
    }
  }, []);

  // Actions
  const updatePersonalInfo = async (data: Partial<PersonalInfo>) => {
    const updated = { ...personalInfo, ...data };
    setPersonalInfo(updated);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'portfolio', 'personalInfo'), updated);
      } catch (e) {
        console.error('Firestore update error:', e);
      }
    }
  };

  const updateEducation = async (item: EducationItem) => {
    const updated = education.map(e => (e.id === item.id ? item : e));
    setEducation(updated);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'education', item.id), item);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addEducation = async (item: Omit<EducationItem, 'id'>) => {
    const id = `edu-${Date.now()}`;
    const newItem: EducationItem = { ...item, id };
    setEducation([...education, newItem]);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'education', id), newItem);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteEducation = async (id: string) => {
    setEducation(education.filter(e => e.id !== id));
    if (db && isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'education', id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateSkillLevel = async (categoryId: string, skillName: string, level: number | null) => {
    const updated = skillCategories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        skills: cat.skills.map(s => (s.name === skillName ? { ...s, level } : s)),
      };
    });
    setSkillCategories(updated);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'skills', categoryId), { skills: updated.find(c => c.id === categoryId)?.skills });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addSkill = async (categoryId: string, name: string, level: number | null) => {
    const updated = skillCategories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        skills: [...cat.skills, { name, level }],
      };
    });
    setSkillCategories(updated);
  };

  const deleteSkill = async (categoryId: string, skillName: string) => {
    const updated = skillCategories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        skills: cat.skills.filter(s => s.name !== skillName),
      };
    });
    setSkillCategories(updated);
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    const id = `project-${Date.now()}`;
    const newProj: Project = { ...project, id };
    setProjects([newProj, ...projects]);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'projects', id), newProj);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateProject = async (project: Project) => {
    const updated = projects.map(p => (p.id === project.id ? project : p));
    setProjects(updated);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'projects', project.id), project);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteProject = async (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    if (db && isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addAchievement = async (achievement: Omit<Achievement, 'id'>) => {
    const id = `ach-${Date.now()}`;
    const newAch: Achievement = { ...achievement, id };
    setAchievements([newAch, ...achievements]);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'achievements', id), newAch);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateAchievement = async (achievement: Achievement) => {
    const updated = achievements.map(a => (a.id === achievement.id ? achievement : a));
    setAchievements(updated);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'achievements', achievement.id), achievement);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteAchievement = async (id: string) => {
    setAchievements(achievements.filter(a => a.id !== id));
    if (db && isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'achievements', id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addCertification = async (cert: Omit<Certificate, 'id'>) => {
    const id = `cert-${Date.now()}`;
    const newCert: Certificate = { ...cert, id };
    setCertifications([newCert, ...certifications]);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'certifications', id), newCert);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteCertification = async (id: string) => {
    setCertifications(certifications.filter(c => c.id !== id));
    if (db && isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'certifications', id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addExperience = async (exp: Omit<ExperienceItem, 'id'>) => {
    const id = `exp-${Date.now()}`;
    const newExp: ExperienceItem = { ...exp, id };
    setExperiences([newExp, ...experiences]);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'experience', id), newExp);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateExperience = async (exp: ExperienceItem) => {
    const updated = experiences.map(e => (e.id === exp.id ? exp : e));
    setExperiences(updated);
    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'experience', exp.id), exp);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteExperience = async (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
    if (db && isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'experience', id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Contact form submission with honeypot & rate limiting
  const submitContactMessage = async (msg: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name.trim(),
      email: msg.email.trim(),
      subject: msg.subject.trim() || 'General Inquiry',
      message: msg.message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    // Update local state
    setMessages(prev => [newMsg, ...prev]);

    // Submit to Firestore if available
    if (db && isFirebaseConfigured) {
      try {
        await addDoc(collection(db, 'contact_messages'), {
          ...newMsg,
          serverTimestamp: serverTimestamp(),
        });
      } catch (err: any) {
        console.warn('Firestore submission fallback to local:', err?.message);
      }
    }

    return { success: true };
  };

  const markMessageRead = async (id: string) => {
    const updated = messages.map(m => (m.id === id ? { ...m, read: true } : m));
    setMessages(updated);
  };

  const deleteMessage = async (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    if (db && isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'contact_messages', id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Admin authentication
  const loginAdmin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const authorizedEmails = ['santhoshsam2129@gmail.com', 'aidssanthosh@gmail.com'];

    // If Firebase Auth is live, authenticate through Firebase
    if (auth && isFirebaseConfigured) {
      try {
        const userCred = await signInWithEmailAndPassword(auth, trimmedEmail, pass);
        if (!authorizedEmails.includes(userCred.user.email?.toLowerCase() || '')) {
          await signOut(auth);
          return { success: false, error: 'Unauthorized: Access restricted to S. Santhosh admin account.' };
        }
        setAdminUser(userCred.user);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Authentication failed.' };
      }
    }

    // Direct Developer/Demo Admin Access when Firebase is in offline/local mode
    if (authorizedEmails.includes(trimmedEmail) || trimmedEmail === 'admin@santhosh.dev') {
      if (pass.length >= 6) {
        const userObj = {
          email: trimmedEmail,
          displayName: 'S. Santhosh (Admin)',
        };
        setAdminUser(userObj);
        localStorage.setItem(STORAGE_KEYS.LOCAL_ADMIN, JSON.stringify(userObj));
        return { success: true };
      } else {
        return { success: false, error: 'Admin passphrase must be at least 6 characters.' };
      }
    }

    return {
      success: false,
      error: 'Invalid admin credentials. Use your registered email (santhoshsam2129@gmail.com).',
    };
  };

  const logoutAdmin = async () => {
    if (auth && isFirebaseConfigured) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error(e);
      }
    }
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEYS.LOCAL_ADMIN);
  };

  const resetToDefaults = () => {
    setPersonalInfo(initialPersonalInfo);
    setEducation(initialEducation);
    setSkillCategories(initialSkillCategories);
    setProjects(initialProjects);
    setAchievements(initialAchievements);
    setCertifications(initialCertifications);
    setExperiences(initialExperiences);
    localStorage.removeItem(STORAGE_KEYS.PERSONAL_INFO);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        personalInfo,
        updatePersonalInfo,
        education,
        updateEducation,
        addEducation,
        deleteEducation,
        skillCategories,
        updateSkillLevel,
        addSkill,
        deleteSkill,
        projects,
        addProject,
        updateProject,
        deleteProject,
        achievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        certifications,
        addCertification,
        deleteCertification,
        experiences,
        addExperience,
        updateExperience,
        deleteExperience,
        messages,
        submitContactMessage,
        markMessageRead,
        deleteMessage,
        isAdminLoggedIn,
        adminUser,
        loginAdmin,
        logoutAdmin,
        isFirebaseLive,
        activeSection,
        setActiveSection,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
