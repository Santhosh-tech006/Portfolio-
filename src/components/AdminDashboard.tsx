import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Lock,
  LogOut,
  FolderPlus,
  Trash2,
  Edit2,
  Check,
  Plus,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  Mail,
  UserCheck,
  Database,
  CloudUpload,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { Project, EducationItem, Certificate, Achievement, ExperienceItem, AchievementCategory, ExperienceCategory } from '../types/portfolio';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    isAdminLoggedIn,
    adminUser,
    loginAdmin,
    logoutAdmin,
    isFirebaseLive,
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
    deleteAchievement,
    certifications,
    addCertification,
    deleteCertification,
    experiences,
    addExperience,
    deleteExperience,
    messages,
    markMessageRead,
    deleteMessage,
    resetToDefaults,
  } = usePortfolio();

  // Auth Form State
  const [loginEmail, setLoginEmail] = useState('santhoshsam2129@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'skills' | 'education' | 'experience' | 'achievements' | 'certifications' | 'messages'
  >('overview');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    const res = await loginAdmin(loginEmail, loginPassword);
    if (!res.success) {
      setAuthError(res.error || 'Authentication failed.');
    } else {
      showToast('Welcome back, S. Santhosh!');
    }
    setAuthLoading(false);
  };

  // State for adding a new project
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: 'AI & Data Science',
    summary: '',
    tags: [],
    imageUrl: '',
    githubUrl: 'https://github.com/Santhosh-tech006',
    problemStatement: '',
    methodology: '',
    implementation: '',
    results: 'Add results',
  });
  const [tagInput, setTagInput] = useState('');

  // State for editing an existing project
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // State for new certificate
  const [newCert, setNewCert] = useState({
    courseName: '',
    issuer: '',
    completionDate: '',
    credentialId: '',
    verificationLink: '',
    imageUrl: '',
  });

  // State for new achievement
  const [newAch, setNewAch] = useState({
    title: '',
    category: 'Hackathons' as AchievementCategory,
    date: '2026',
    event: '',
    roleOrResult: '',
    description: '',
  });

  // State for new experience
  const [newExp, setNewExp] = useState({
    category: 'Academic Projects' as ExperienceCategory,
    title: '',
    organization: '',
    period: '',
    location: 'Erode, Tamil Nadu',
    description: '',
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Portfolio Admin Center
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {isFirebaseLive ? 'Firebase Connected' : 'Local / Offline Sync'}
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Authorized for S. Santhosh ({personalInfo.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={async () => {
                  await logoutAdmin();
                  showToast('Logged out of admin session');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-16 right-6 z-50 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-md">
            {toastMessage}
          </div>
        )}

        {/* Content Body: Login screen vs Admin tabs */}
        {!isAdminLoggedIn ? (
          /* Secure Login View */
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center bg-slate-50/50">
            <div className="max-w-md w-full p-8 rounded-xl border border-slate-200 bg-white shadow-xs space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Administrator Login
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your registered administrator email to edit projects, update education, or read contact messages.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">
                    Password / Passcode
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Enter password (min 6 characters)"
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    For immediate access, enter any passcode ($\ge 6$ chars) with your admin email.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-xs disabled:opacity-50 transition-colors"
                >
                  {authLoading ? 'Verifying...' : 'Sign In as S. Santhosh'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard Workspace */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Left navigation sidebar */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-200 p-3 sm:p-4 bg-slate-50 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1.5 shrink-0">
              {[
                { id: 'overview', label: 'Overview & Bio', icon: ShieldCheck },
                { id: 'projects', label: 'Projects', icon: FolderPlus, count: projects.length },
                { id: 'skills', label: 'Skills Stack', icon: Layers },
                { id: 'education', label: 'Education', icon: BookOpen },
                { id: 'experience', label: 'Experience', icon: Briefcase, count: experiences.length },
                { id: 'achievements', label: 'Achievements', icon: Award, count: achievements.length },
                { id: 'certifications', label: 'Certificates', icon: CloudUpload, count: certifications.length },
                { id: 'messages', label: 'Inbox', icon: Mail, count: messages.filter(m => !m.read).length },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 md:w-full ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </span>
                    {typeof tab.count === 'number' && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="hidden md:block mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all editable content to S. Santhosh default seed data?')) {
                      resetToDefaults();
                      showToast('Portfolio reset to default verified state');
                    }
                  }}
                  className="w-full text-left text-[11px] font-mono text-slate-400 hover:text-rose-400 p-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset to Initial Seed
                </button>
              </div>
            </div>

            {/* Right Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* TAB 1: OVERVIEW & BIO */}
              {activeTab === 'overview' && (
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Personal Information & Status
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-500">Full Name</label>
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={e => updatePersonalInfo({ name: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-500">Status Badge</label>
                      <input
                        type="text"
                        value={personalInfo.statusBadge}
                        onChange={e => updatePersonalInfo({ statusBadge: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-500">Title / Subtitle</label>
                    <input
                      type="text"
                      value={personalInfo.title}
                      onChange={e => updatePersonalInfo({ title: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-500">Tagline</label>
                    <input
                      type="text"
                      value={personalInfo.tagline}
                      onChange={e => updatePersonalInfo({ tagline: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-500">Bio Description</label>
                    <textarea
                      rows={4}
                      value={personalInfo.bio}
                      onChange={e => updatePersonalInfo({ bio: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-500">Resume Download URL (Firebase Storage / Local PDF)</label>
                    <input
                      type="text"
                      value={personalInfo.resumeUrl}
                      onChange={e => updatePersonalInfo({ resumeUrl: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
                      placeholder="e.g. /resume-s-santhosh.pdf or https://firebasestorage.googleapis.com/..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-500">Profile Photo URL</label>
                    <input
                      type="text"
                      value={personalInfo.profilePhoto}
                      onChange={e => updatePersonalInfo({ profilePhoto: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
                    />
                  </div>

                  <button
                    onClick={() => showToast('Profile updated and saved')}
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Featured Projects ({projects.length})
                    </h3>
                  </div>

                  {/* Add New Project Form */}
                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                      Add New Project
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Project Title *</label>
                        <input
                          type="text"
                          value={newProject.title}
                          onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                          placeholder="e.g., Medical Image Segmentation"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Category *</label>
                        <input
                          type="text"
                          value={newProject.category}
                          onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                          placeholder="e.g., Biomedical AI / Computer Vision"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-500">Summary *</label>
                      <textarea
                        rows={2}
                        value={newProject.summary}
                        onChange={e => setNewProject({ ...newProject, summary: e.target.value })}
                        placeholder="Concise 1-2 sentence overview"
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">GitHub Link</label>
                        <input
                          type="text"
                          value={newProject.githubUrl}
                          onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Image URL</label>
                        <input
                          type="text"
                          value={newProject.imageUrl}
                          onChange={e => setNewProject({ ...newProject, imageUrl: e.target.value })}
                          placeholder="/src/assets/images/... or web URL"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-500">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        placeholder="Python, PyTorch, OpenCV, TensorFlow"
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (!newProject.title?.trim() || !newProject.summary?.trim()) {
                          showToast('Please provide a title and summary.');
                          return;
                        }
                        const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
                        await addProject({
                          title: newProject.title,
                          category: newProject.category || 'General',
                          summary: newProject.summary,
                          tags: tags.length ? tags : ['AI', 'Python'],
                          imageUrl: newProject.imageUrl || '/src/assets/images/brain_tumor_project_1793870349677.jpg',
                          githubUrl: newProject.githubUrl || 'https://github.com/Santhosh-tech006',
                          problemStatement: newProject.problemStatement,
                          methodology: newProject.methodology,
                          implementation: newProject.implementation,
                          results: 'Add results',
                        });
                        setNewProject({
                          title: '',
                          category: 'AI & Data Science',
                          summary: '',
                          tags: [],
                          imageUrl: '',
                          githubUrl: 'https://github.com/Santhosh-tech006',
                          results: 'Add results',
                        });
                        setTagInput('');
                        showToast('New project created!');
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                    >
                      Publish Project
                    </button>
                  </div>

                  {/* List of Existing Projects */}
                  <div className="space-y-4">
                    {projects.map(proj => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                            {proj.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{proj.summary}</p>
                          <p className="text-[11px] font-mono text-slate-400 mt-1">
                            Results: {proj.results || 'Add results'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              const newRes = prompt('Enter empirical results / benchmark for ' + proj.title + ':', proj.results || '');
                              if (newRes !== null) {
                                updateProject({ ...proj, results: newRes.trim() || 'Add results' });
                                showToast('Project results updated.');
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium hover:border-cyan-500"
                          >
                            Edit Results
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                                showToast('Project deleted.');
                              }
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Skill Proficiency Levels
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure your proficiency percentages (0-100%). Leaving level as null keeps it in the neutral "not set" state.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {skillCategories.map(cat => (
                      <div key={cat.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {cat.name}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {cat.skills.map(s => (
                            <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                              <span className="font-medium text-slate-800 dark:text-slate-200">{s.name}</span>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  placeholder="Not set"
                                  value={s.level ?? ''}
                                  onChange={e => {
                                    const val = e.target.value === '' ? null : Math.min(100, Math.max(0, Number(e.target.value)));
                                    updateSkillLevel(cat.id, s.name, val);
                                  }}
                                  className="w-20 px-2 py-1 text-center font-mono rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
                                />
                                <span className="font-mono text-slate-400">%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: EDUCATION */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Education & Qualification Entries
                  </h3>

                  <div className="space-y-4">
                    {education.map(item => (
                      <div
                        key={item.id}
                        className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                            {item.level}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{item.period}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-mono text-slate-500">Degree / Examination</label>
                            <input
                              type="text"
                              value={item.degreeOrExam}
                              onChange={e => updateEducation({ ...item, degreeOrExam: e.target.value })}
                              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-mono text-slate-500">Institution / School Name</label>
                            <input
                              type="text"
                              value={item.institution}
                              onChange={e => updateEducation({ ...item, institution: e.target.value, isPlaceholder: false })}
                              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-mono text-slate-500">Board / University</label>
                            <input
                              type="text"
                              value={item.boardOrUniversity}
                              onChange={e => updateEducation({ ...item, boardOrUniversity: e.target.value })}
                              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-mono text-slate-500">Score / Percentage / CGPA</label>
                            <input
                              type="text"
                              value={item.scoreOrCgpa}
                              onChange={e => updateEducation({ ...item, scoreOrCgpa: e.target.value })}
                              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => showToast('Education details updated successfully')}
                    className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
                  >
                    Save All Education Details
                  </button>
                </div>
              )}

              {/* TAB 5: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Experience & Activities
                  </h3>

                  {/* Add Experience form */}
                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                      Add Experience Entry
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Category</label>
                        <select
                          value={newExp.category}
                          onChange={e => setNewExp({ ...newExp, category: e.target.value as any })}
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        >
                          <option value="Academic Projects">Academic Projects</option>
                          <option value="Freelance Work">Freelance Work</option>
                          <option value="Technical Learning">Technical Learning</option>
                          <option value="Leadership">Leadership</option>
                          <option value="Team Collaborations">Team Collaborations</option>
                          <option value="Personal Initiatives">Personal Initiatives</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Role / Title *</label>
                        <input
                          type="text"
                          value={newExp.title}
                          onChange={e => setNewExp({ ...newExp, title: e.target.value })}
                          placeholder="e.g. Lead Developer / Core Member"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Organization / Team *</label>
                        <input
                          type="text"
                          value={newExp.organization}
                          onChange={e => setNewExp({ ...newExp, organization: e.target.value })}
                          placeholder="e.g. VCET AI Lab"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Period *</label>
                        <input
                          type="text"
                          value={newExp.period}
                          onChange={e => setNewExp({ ...newExp, period: e.target.value })}
                          placeholder="e.g. Jan 2026 – Present"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-500">Description</label>
                      <textarea
                        rows={2}
                        value={newExp.description}
                        onChange={e => setNewExp({ ...newExp, description: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (!newExp.title.trim() || !newExp.organization.trim()) {
                          showToast('Please fill in role and organization.');
                          return;
                        }
                        await addExperience({
                          category: newExp.category,
                          title: newExp.title,
                          organization: newExp.organization,
                          period: newExp.period || '2026',
                          location: newExp.location,
                          description: newExp.description,
                          contributions: [],
                        });
                        setNewExp({
                          category: 'Academic Projects',
                          title: '',
                          organization: '',
                          period: '',
                          location: 'Erode, Tamil Nadu',
                          description: '',
                        });
                        showToast('Experience entry created');
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
                    >
                      Add Entry
                    </button>
                  </div>

                  {/* List of Experiences */}
                  <div className="space-y-3">
                    {experiences.map(exp => (
                      <div key={exp.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400">[{exp.category}]</span>{' '}
                          <span className="font-bold text-slate-900 dark:text-white">{exp.title}</span> @ {exp.organization}
                        </div>
                        <button
                          onClick={() => deleteExperience(exp.id)}
                          className="text-rose-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: ACHIEVEMENTS */}
              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Hackathons & Achievements
                  </h3>

                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                      Add New Milestone
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Category</label>
                        <select
                          value={newAch.category}
                          onChange={e => setNewAch({ ...newAch, category: e.target.value as any })}
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        >
                          <option value="Hackathons">Hackathons</option>
                          <option value="Technical Competitions">Technical Competitions</option>
                          <option value="Academic">Academic</option>
                          <option value="Chess">Chess</option>
                          <option value="Certifications">Certifications</option>
                          <option value="Workshops">Workshops</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Title / Event Name *</label>
                        <input
                          type="text"
                          value={newAch.title}
                          onChange={e => setNewAch({ ...newAch, title: e.target.value })}
                          placeholder="e.g. AI Innovation Sprint"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Role / Placement</label>
                        <input
                          type="text"
                          value={newAch.roleOrResult}
                          onChange={e => setNewAch({ ...newAch, roleOrResult: e.target.value })}
                          placeholder="e.g. Participant / Finalist"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Year / Date</label>
                        <input
                          type="text"
                          value={newAch.date}
                          onChange={e => setNewAch({ ...newAch, date: e.target.value })}
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-500">Description</label>
                      <textarea
                        rows={2}
                        value={newAch.description}
                        onChange={e => setNewAch({ ...newAch, description: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (!newAch.title.trim()) {
                          showToast('Please provide an achievement title.');
                          return;
                        }
                        await addAchievement({
                          category: newAch.category,
                          title: newAch.title,
                          event: newAch.event || newAch.title,
                          date: newAch.date,
                          roleOrResult: newAch.roleOrResult || 'Participant',
                          description: newAch.description,
                        });
                        setNewAch({
                          title: '',
                          category: 'Hackathons',
                          date: '2026',
                          event: '',
                          roleOrResult: '',
                          description: '',
                        });
                        showToast('Milestone saved!');
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
                    >
                      Save Milestone
                    </button>
                  </div>

                  <div className="space-y-3">
                    {achievements.map(ach => (
                      <div key={ach.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400">[{ach.category}]</span>{' '}
                          <span className="font-bold text-slate-900 dark:text-white">{ach.title}</span> - {ach.roleOrResult}
                        </div>
                        <button
                          onClick={() => deleteAchievement(ach.id)}
                          className="text-rose-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: CERTIFICATIONS */}
              {activeTab === 'certifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Certifications & Credentials
                  </h3>

                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                      Upload Certificate Credential
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Course / Certification Name *</label>
                        <input
                          type="text"
                          value={newCert.courseName}
                          onChange={e => setNewCert({ ...newCert, courseName: e.target.value })}
                          placeholder="e.g. Deep Learning Specialization"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Issuer / Organization *</label>
                        <input
                          type="text"
                          value={newCert.issuer}
                          onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                          placeholder="e.g. Coursera / DeepLearning.AI / Google"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Completion Date</label>
                        <input
                          type="text"
                          value={newCert.completionDate}
                          onChange={e => setNewCert({ ...newCert, completionDate: e.target.value })}
                          placeholder="e.g. March 2026"
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-500">Credential ID / Verify URL</label>
                        <input
                          type="text"
                          value={newCert.verificationLink}
                          onChange={e => setNewCert({ ...newCert, verificationLink: e.target.value })}
                          placeholder="https://..."
                          className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-500">Certificate Image URL</label>
                      <input
                        type="text"
                        value={newCert.imageUrl}
                        onChange={e => setNewCert({ ...newCert, imageUrl: e.target.value })}
                        placeholder="Image URL or Firebase Storage URL"
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (!newCert.courseName.trim() || !newCert.issuer.trim()) {
                          showToast('Please provide course name and issuer.');
                          return;
                        }
                        await addCertification({
                          courseName: newCert.courseName,
                          issuer: newCert.issuer,
                          completionDate: newCert.completionDate || '2026',
                          credentialId: newCert.credentialId,
                          verificationLink: newCert.verificationLink,
                          imageUrl: newCert.imageUrl,
                        });
                        setNewCert({
                          courseName: '',
                          issuer: '',
                          completionDate: '',
                          credentialId: '',
                          verificationLink: '',
                          imageUrl: '',
                        });
                        showToast('Certificate added to portfolio!');
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
                    >
                      Publish Certificate
                    </button>
                  </div>

                  <div className="space-y-3">
                    {certifications.map(c => (
                      <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">{c.courseName}</span> ({c.issuer})
                        </div>
                        <button
                          onClick={() => deleteCertification(c.id)}
                          className="text-rose-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Contact Messages ({messages.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Inbound messages submitted through the portfolio contact form.
                      </p>
                    </div>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-mono text-xs rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                      No contact messages received yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-5 rounded-xl border transition-colors ${
                            msg.read
                              ? 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40'
                              : 'border-cyan-500/40 bg-cyan-500/5'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900 dark:text-white">{msg.name}</span>
                                <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">&lt;{msg.email}&gt;</span>
                              </div>
                              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                                {msg.subject}
                              </p>
                            </div>

                            <span className="text-[11px] font-mono text-slate-400">
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 my-3 leading-relaxed">
                            {msg.message}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
                            >
                              Reply directly &rarr;
                            </a>

                            <div className="flex items-center gap-3">
                              {!msg.read && (
                                <button
                                  onClick={() => markMessageRead(msg.id)}
                                  className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => deleteMessage(msg.id)}
                                className="text-rose-500 hover:text-rose-400"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
