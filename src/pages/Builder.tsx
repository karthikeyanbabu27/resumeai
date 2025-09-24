import { useMemo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  User,
  GraduationCap,
  Award,
  Briefcase,
  Palette,
  FileText,
  Plus,
  X,
  Lightbulb, // For skills
} from "lucide-react";
import { generateLatexFromResume, type ResumeData } from "@/lib/gemini"; // Import ResumeData type
import { ResumePreview } from "@/components/resume/ResumePreview";
import { downloadResumeAsPDF, printResume } from "@/lib/pdf-export";

// Make sure your ResumeData interface in gemini.ts and here match!
// Assuming ResumeData is imported from gemini.ts now.

const Builder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      name: "Karthikeyan B",
      email: "karthikeyanbabu02@gmail.com",
      phone: "+91 9003702299",
      location: "Chennai, IN",
      summary: "AI/ML Engineering student with hands-on experience in machine learning, computer vision, and data science. Passionate about building innovative solutions using Python, OpenCV, and deep learning frameworks. Strong foundation in NLP, image processing, and predictive modeling.",
    },
    education: [
      { 
        degree: "BE IN ARTIFICIAL INTELLIGENCE & MACHINE LEARNING", 
        school: "SATHYABAMA INSTITUTE OF SCIENCE & TECHNOLOGY", 
        year: "Expected 2026", 
        gpa: "8.5/10" 
      }
    ],
    certifications: [
      { name: "AICTE NSIC-TSC ML Internship", issuer: "NSIC Technical Services Centre", date: "2024" },
      { name: "AI for India 2.0", issuer: "GUVI", date: "2024" },
      { name: "Python Programming", issuer: "NPTEL", date: "2024" }
    ],
    experience: [
      { 
        title: "AI/ML INTERN", 
        company: "AICTE NSIC-TSC", 
        duration: "June 2024 - July 2024", 
        description: "• Built machine learning models (Logistic Regression, Decision Tree, SVM) to detect fake news from datasets using Python and scikit-learn.\n• Preprocessed data (stopword removal, stemming) and vectorized text using TF-IDF.\n• Achieved 94% accuracy in the final model and deployed results in Jupyter Notebook." 
      },
      { 
        title: "MACHINE LEARNING TRAINEE", 
        company: "SKILL DEVELOPMENT PROGRAM", 
        duration: "July 2024", 
        description: "• Completed 40+ hours of hands-on training on ML algorithms and model evaluation.\n• Applied Linear Regression and KNN on real-world datasets using pandas, matplotlib, seaborn." 
      }
    ],
    skills: [
      "Python", "C++", "Java", "SQL", "HTML", "CSS", "Pandas", "NumPy", 
      "scikit-learn", "OpenCV", "TensorFlow", "Matplotlib", "Jupyter", 
      "Git/GitHub", "Machine Learning", "Natural Language Processing", 
      "Neural Networks", "Data Structures & Algorithms", "Computer Vision"
    ],
    selectedTheme: "modern",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [latexSource, setLatexSource] = useState<string>("");
  const [skillInput, setSkillInput] = useState<string>(""); // For adding skills
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic'>('modern');
  const [previewMode, setPreviewMode] = useState<'react' | 'latex'>('react');
  const [isDownloading, setIsDownloading] = useState(false);

  const canUseGemini = useMemo(() => Boolean(import.meta.env.VITE_GOOGLE_API_KEY), []);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const filename = `${resumeData.personal.name?.replace(/\s+/g, '_') || 'resume'}.pdf`;
      await downloadResumeAsPDF('resume-preview', filename);
    } catch (error: any) {
      console.error('Error downloading PDF:', error);
      alert(`Error downloading PDF: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    try {
      printResume('resume-preview');
    } catch (error: any) {
      console.error('Error printing:', error);
      alert(`Error printing: ${error.message}`);
    }
  };

  const clearAllData = () => {
    setResumeData({
      personal: {
        name: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
      },
      education: [{ degree: "", school: "", year: "", gpa: "" }],
      certifications: [{ name: "", issuer: "", date: "" }],
      experience: [{ title: "", company: "", duration: "", description: "" }],
      skills: [],
      selectedTheme: "modern",
    });
  };

  const loadSampleData = () => {
    setResumeData({
      personal: {
        name: "Karthikeyan B",
        email: "karthikeyanbabu02@gmail.com",
        phone: "+91 9003702299",
        location: "Chennai, IN",
        summary: "AI/ML Engineering student with hands-on experience in machine learning, computer vision, and data science. Passionate about building innovative solutions using Python, OpenCV, and deep learning frameworks. Strong foundation in NLP, image processing, and predictive modeling.",
      },
      education: [
        { 
          degree: "BE IN ARTIFICIAL INTELLIGENCE & MACHINE LEARNING", 
          school: "SATHYABAMA INSTITUTE OF SCIENCE & TECHNOLOGY", 
          year: "Expected 2026", 
          gpa: "8.5/10" 
        }
      ],
      certifications: [
        { name: "AICTE NSIC-TSC ML Internship", issuer: "NSIC Technical Services Centre", date: "2024" },
        { name: "AI for India 2.0", issuer: "GUVI", date: "2024" },
        { name: "Python Programming", issuer: "NPTEL", date: "2024" }
      ],
      experience: [
        { 
          title: "AI/ML INTERN", 
          company: "AICTE NSIC-TSC", 
          duration: "June 2024 - July 2024", 
          description: "• Built machine learning models (Logistic Regression, Decision Tree, SVM) to detect fake news from datasets using Python and scikit-learn.\n• Preprocessed data (stopword removal, stemming) and vectorized text using TF-IDF.\n• Achieved 94% accuracy in the final model and deployed results in Jupyter Notebook." 
        },
        { 
          title: "MACHINE LEARNING TRAINEE", 
          company: "SKILL DEVELOPMENT PROGRAM", 
          duration: "July 2024", 
          description: "• Completed 40+ hours of hands-on training on ML algorithms and model evaluation.\n• Applied Linear Regression and KNN on real-world datasets using pandas, matplotlib, seaborn." 
        }
      ],
      skills: [
        "Python", "C++", "Java", "SQL", "HTML", "CSS", "Pandas", "NumPy", 
        "scikit-learn", "OpenCV", "TensorFlow", "Matplotlib", "Jupyter", 
        "Git/GitHub", "Machine Learning", "Natural Language Processing", 
        "Neural Networks", "Data Structures & Algorithms", "Computer Vision"
      ],
      selectedTheme: "modern",
    });
  };

  const renderLatexPreview = (latex: string) => {
    // For now, show LaTeX source instead of trying to parse it
    return (
      <div style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap', padding: '20px', background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px'}}>
        <h3 style={{marginTop: 0, color: '#495057'}}>LaTeX Source (Preview not available)</h3>
        <p style={{color: '#6c757d', marginBottom: '15px'}}>LaTeX preview is temporarily disabled. You can copy this LaTeX code and use it in a LaTeX editor.</p>
        <pre style={{background: 'white', padding: '15px', borderRadius: '4px', overflowX: 'auto'}}>{latex}</pre>
      </div>
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLatexSource("Generating LaTeX..."); // Provide immediate feedback
    try {
      const latex = await generateLatexFromResume(resumeData);
      setLatexSource(latex);
    } catch (err: any) {
      console.error("Error during LaTeX generation:", err);
      setLatexSource(`Error generating LaTeX: ${err.message || String(err)}`);
    } finally {
      setIsGenerating(false);
    }
  };


  const totalSteps = 6; // Updated total steps to include Skills

  const themes = [
    { id: "modern", name: "Modern", preview: "Clean lines, contemporary design" },
    { id: "classic", name: "Classic", preview: "Traditional, professional layout" },
    { id: "creative", name: "Creative", preview: "Bold design, perfect for creative roles" },
    { id: "minimal", name: "Minimal", preview: "Simple, elegant, focus on content" },
  ];

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: GraduationCap },
    { number: 3, title: "Certifications", icon: Award },
    { number: 4, title: "Experience", icon: Briefcase },
    { number: 5, title: "Skills", icon: Lightbulb }, // Added Skills step
    { number: 6, title: "Theme", icon: Palette },
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground mb-6">Personal Information</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={resumeData.personal.name}
            onChange={(e) =>
              setResumeData((prev) => ({
                ...prev,
                personal: { ...prev.personal, name: e.target.value },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={resumeData.personal.email}
            onChange={(e) =>
              setResumeData((prev) => ({
                ...prev,
                personal: { ...prev.personal, email: e.target.value },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={resumeData.personal.phone}
            onChange={(e) =>
              setResumeData((prev) => ({
                ...prev,
                personal: { ...prev.personal, phone: e.target.value },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={resumeData.personal.location}
            onChange={(e) =>
              setResumeData((prev) => ({
                ...prev,
                personal: { ...prev.personal, location: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          placeholder="Brief overview of your professional background and career objectives..."
          rows={4}
          value={resumeData.personal.summary}
          onChange={(e) =>
            setResumeData((prev) => ({
              ...prev,
              personal: { ...prev.personal, summary: e.target.value },
            }))
          }
        />
      </div>
    </div>
  );

  // Education Section
  const handleAddEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "", gpa: "" }],
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (
    index: number,
    field: keyof typeof resumeData.education[0],
    value: string
  ) => {
    setResumeData((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      return { ...prev, education: updatedEducation };
    });
  };

  const renderEducation = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground mb-6">Education</h3>
      {resumeData.education.map((edu, index) => (
        <Card key={index} className="p-4 bg-muted/20 border-border/50 relative">
          <h4 className="font-semibold text-lg mb-4 text-primary-foreground">Degree {index + 1}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree/Program</Label>
              <Input
                id={`degree-${index}`}
                placeholder="B.S. Computer Science"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`school-${index}`}>University/Institution</Label>
              <Input
                id={`school-${index}`}
                placeholder="University of Example"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, "school", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`year-${index}`}>Graduation Year</Label>
              <Input
                id={`year-${index}`}
                placeholder="2020"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, "year", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
              <Input
                id={`gpa-${index}`}
                placeholder="3.8 / 4.0"
                value={edu.gpa}
                onChange={(e) => handleEducationChange(index, "gpa", e.target.value)}
              />
            </div>
          </div>
          {resumeData.education.length > 1 && (
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-4 right-4 h-8 w-8 p-0"
              onClick={() => handleRemoveEducation(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </Card>
      ))}
      <Button variant="outline" onClick={handleAddEducation}>
        <Plus className="w-4 h-4 mr-2" /> Add Education
      </Button>
    </div>
  );

  // Certifications Section
  const handleAddCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuer: "", date: "" }],
    }));
  };

  const handleRemoveCertification = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleCertificationChange = (
    index: number,
    field: keyof typeof resumeData.certifications[0],
    value: string
  ) => {
    setResumeData((prev) => {
      const updatedCerts = [...prev.certifications];
      updatedCerts[index] = { ...updatedCerts[index], [field]: value };
      return { ...prev, certifications: updatedCerts };
    });
  };

  const renderCertifications = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground mb-6">Certifications</h3>
      {resumeData.certifications.map((cert, index) => (
        <Card key={index} className="p-4 bg-muted/20 border-border/50 relative">
          <h4 className="font-semibold text-lg mb-4 text-primary-foreground">Certification {index + 1}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`cert-name-${index}`}>Name</Label>
              <Input
                id={`cert-name-${index}`}
                placeholder="AWS Certified Solutions Architect"
                value={cert.name}
                onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
              <Input
                id={`cert-issuer-${index}`}
                placeholder="Amazon Web Services"
                value={cert.issuer}
                onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
              />
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label htmlFor={`cert-date-${index}`}>Date Obtained</Label>
              <Input
                id={`cert-date-${index}`}
                placeholder="Jan 2023"
                value={cert.date}
                onChange={(e) => handleCertificationChange(index, "date", e.target.value)}
              />
            </div>
          </div>
          {resumeData.certifications.length > 1 && (
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-4 right-4 h-8 w-8 p-0"
              onClick={() => handleRemoveCertification(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </Card>
      ))}
      <Button variant="outline" onClick={handleAddCertification}>
        <Plus className="w-4 h-4 mr-2" /> Add Certification
      </Button>
    </div>
  );

  // Experience Section
  const handleAddExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", duration: "", description: "" }],
    }));
  };

  const handleRemoveExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof typeof resumeData.experience[0],
    value: string
  ) => {
    setResumeData((prev) => {
      const updatedExp = [...prev.experience];
      updatedExp[index] = { ...updatedExp[index], [field]: value };
      return { ...prev, experience: updatedExp };
    });
  };

  const renderExperience = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground mb-6">Experience</h3>
      {resumeData.experience.map((exp, index) => (
        <Card key={index} className="p-4 bg-muted/20 border-border/50 relative">
          <h4 className="font-semibold text-lg mb-4 text-primary-foreground">Position {index + 1}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
              <Input
                id={`exp-title-${index}`}
                placeholder="Software Engineer"
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`exp-company-${index}`}>Company</Label>
              <Input
                id={`exp-company-${index}`}
                placeholder="Tech Corp Inc."
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
              />
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              {" "}
              {/* Make duration full width on small screens, half on medium */}
              <Label htmlFor={`exp-duration-${index}`}>Duration</Label>
              <Input
                id={`exp-duration-${index}`}
                placeholder="Jan 2020 - Dec 2022"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor={`exp-description-${index}`}>Description / Responsibilities</Label>
              <Textarea
                id={`exp-description-${index}`}
                placeholder="Developed and maintained web applications; Led a team of 3..."
                rows={4}
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
              />
            </div>
          </div>
          {resumeData.experience.length > 1 && (
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-4 right-4 h-8 w-8 p-0"
              onClick={() => handleRemoveExperience(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </Card>
      ))}
      <Button variant="outline" onClick={handleAddExperience}>
        <Plus className="w-4 h-4 mr-2" /> Add Experience
      </Button>
    </div>
  );

  // Skills Section
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (skillInput.trim() !== "" && !resumeData.skills.includes(skillInput.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput(""); // Clear input after adding
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const renderSkills = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground mb-6">Skills</h3>

      <form onSubmit={handleAddSkill} className="flex gap-2">
        <Input
          placeholder="e.g., React, Python, AWS, Project Management"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" variant="secondary">
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {resumeData.skills.length === 0 ? (
          <p className="text-muted-foreground">Add some key skills to showcase your abilities.</p>
        ) : (
          resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary-foreground"
            >
              {skill}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 hover:bg-primary/20"
                onClick={() => handleRemoveSkill(skill)}
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))
        )}
      </div>
    </div>
  );

  const renderThemeSelection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground mb-6">Choose Your Theme</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
              resumeData.selectedTheme === theme.id
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setResumeData((prev) => ({ ...prev, selectedTheme: theme.id }))}
          >
            <div className="space-y-4">
              <div className="h-32 bg-gradient-to-br from-muted to-accent rounded-lg flex items-center justify-center">
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{theme.name}</h4>
                <p className="text-sm text-muted-foreground">{theme.preview}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderEducation();
      case 3:
        return renderCertifications();
      case 4:
        return renderExperience();
      case 5: // New Skills step
        return renderSkills();
      case 6: // Theme selection is now step 6
        return renderThemeSelection();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    currentStep >= step.number
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-px w-12 mx-4 ${
                      currentStep > step.number ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <Card className="max-w-4xl mx-auto p-8 bg-card/50 backdrop-blur-sm border-border/50">
          {renderCurrentStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <Button variant="hero" onClick={handleGenerate} disabled={isGenerating || !canUseGemini}>
                  {isGenerating ? "Generating..." : "Generate Resume"}
                  <FileText className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Template Selection and Actions */}
        <div className="max-w-6xl mx-auto mt-8">
          <Card className="p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="template-select">Template:</Label>
                <select
                  id="template-select"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value as 'modern' | 'classic')}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                </select>
                
                <Label htmlFor="preview-mode">Preview Mode:</Label>
                <select
                  id="preview-mode"
                  value={previewMode}
                  onChange={(e) => setPreviewMode(e.target.value as 'react' | 'latex')}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="react">React Preview</option>
                  <option value="latex">LaTeX Source</option>
                </select>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={loadSampleData}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Load Sample
                </Button>
                <Button
                  onClick={clearAllData}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading || previewMode === 'latex'}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {isDownloading ? 'Downloading...' : 'Download PDF'}
                </Button>
                <Button
                  onClick={handlePrint}
                  disabled={previewMode === 'latex'}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Print
                </Button>
                {canUseGemini && (
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'Generate LaTeX'}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Resume Preview</h3>
            <div className="border rounded-md bg-white min-h-[600px] overflow-auto">
              {previewMode === 'react' ? (
                <div id="resume-preview">
                  <ResumePreview data={resumeData} template={selectedTemplate} />
                </div>
              ) : (
                <div className="p-4">
                  {latexSource ? (
                    renderLatexPreview(latexSource)
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      {canUseGemini
                        ? "Click 'Generate LaTeX' to create LaTeX source code"
                        : "Set VITE_GOOGLE_API_KEY in your .env file to enable LaTeX generation"}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Builder;