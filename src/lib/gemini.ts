import { GoogleGenerativeAI, type Part, type Content } from "@google/generative-ai";

export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  education: Array<{ degree: string; school: string; year: string; gpa?: string }>;
  certifications: Array<{ name: string; issuer: string; date: string }>;
  experience: Array<{ title: string; company: string; duration: string; description: string }>;
  skills: string[];
  selectedTheme: string;
}

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string | undefined;

if (!apiKey) {
  console.warn("VITE_GOOGLE_API_KEY is not set. Gemini features will be disabled.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : undefined;

const SYSTEM_PROMPT = `You are an expert resume LaTeX generator. Your sole purpose is to produce complete, valid, and compilable LaTeX code for a professional resume based on user-provided JSON data.

Your output MUST strictly adhere to the following:
1.  **Document Structure:** ALWAYS start with \\documentclass{article} and ALWAYS include \\begin{document} before any content and \\end{document} at the end. The structure must be:
    \\documentclass{article}
    \\usepackage[utf8]{inputenc}
    \\begin{document}
    [your resume content here]
    \\end{document}
2.  **Packages:** Use ONLY \\usepackage[utf8]{inputenc} for maximum compatibility with latex.js parser.
3.  **No Defined Colors:** Do NOT use \\definecolor commands. Use only predefined colors like \\textcolor{blue}{text}, \\textcolor{red}{text}, \\textcolor{black}{text}, \\textcolor{gray}{text}.
4.  **Raw LaTeX Only:** Do NOT include code fences (\`\`\`), markdown, or any conversational text in your final output. Return ONLY the raw LaTeX code.
5.  **Single Page:** Keep the entire resume to a single page if possible.
6.  **Formatting:** Use simple, clean, and ATS-friendly formatting. Avoid overly complex or graphical elements. Use \\section*{} for main headings to avoid numbering. Structure content clearly with appropriate spacing (e.g., \\vspace, \\hspace). Do NOT use \\hrulefill as it's not supported by latex.js - use simple text separators or \\rule instead.
7.  **Special Characters:** Escape ALL special LaTeX characters found in the input data. This includes: #, $, %, &, _, {, }, ^, ~, \\, <, >. For example:
    * "C++" becomes "C\\texttt{++}"
    * "50%" becomes "50\\%"
    * "Manager & Lead" becomes "Manager \\& Lead"
    * "My_File" becomes "My\\_File"
    * "A \\ B" becomes "A \\\\ B" (for a backslash)
    * "less < greater" becomes "less \\textless\\ greater"
    * "open { close }" becomes "open \\{\\ close \\}"
`;

// A minimal, valid LaTeX example for few-shot learning
const MINIMAL_LATEX_EXAMPLE = `\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\begin{document}

% Personal Information
\\section*{John Doe}
\\small\\noindent
john.doe@example.com \\textbullet\\ +1 (555) 123-4567 \\textbullet\\ New York, NY

\\vspace{0.5em}
\\rule{\\textwidth}{0.4pt}
\\vspace{0.5em}

% Summary
\\section*{Summary}
Highly motivated software engineer with 5+ years of experience in full-stack development. Proven ability to deliver robust and scalable solutions.

% Skills
\\section*{Skills}
\\begin{itemize}
    \\item \\textbf{Languages:} Python, JavaScript, Java, C++
    \\item \\textbf{Frameworks:} React, Node.js, Spring Boot, Django
    \\item \\textbf{Tools:} Docker, Git, AWS, Azure, PostgreSQL
\\end{itemize}

% Experience
\\section*{Experience}
\\textbf{Senior Software Engineer} \\hfill \\textbf{Jan 2020 -- Present}
Company A, City, State
\\begin{itemize}
    \\item Developed and maintained critical backend services using Python and Django, improving API response times by 20\\%.
    \\item Led a team of 3 junior developers in agile sprints.
\\end{itemize}

% Education
\\section*{Education}
\\textbf{M.S. Computer Science} \\hfill \\textbf{May 2019}
University of Example, City, State \\textbullet\\ GPA: 3.8/4.0

\\textbf{B.S. Computer Science} \\hfill \\textbf{May 2017}
Another University, City, State \\textbullet\\ GPA: 3.7/4.0

% Certifications
\\section*{Certifications}
\\begin{itemize}
    \\item AWS Certified Solutions Architect - Associate (Issued: Jan 2023)
\\end{itemize}

\\end{document}`;

export async function generateLatexFromResume(resume: ResumeData): Promise<string> {
  if (!genAI) {
    throw new Error("Missing VITE_GOOGLE_API_KEY. Set it in a .env file.");
  }
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const systemInstructionContent: Content = {
    role: "user",
    parts: [{ text: SYSTEM_PROMPT }],
  };

  // Few-shot example: user provides JSON, model provides valid LaTeX
  const exampleUserContent: Content = {
    role: "user",
    parts: [
      {
        text: [
          "Here is an example of JSON input for a resume. Generate the corresponding LaTeX output.",
          JSON.stringify({
            personal: {
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "+1 (555) 123-4567",
              location: "New York, NY",
              summary:
                "Highly motivated software engineer with 5+ years of experience in full-stack development. Proven ability to deliver robust and scalable solutions.",
            },
            education: [
              { degree: "M.S. Computer Science", school: "University of Example, City, State", year: "May 2019", gpa: "3.8/4.0" },
              { degree: "B.S. Computer Science", school: "Another University, City, State", year: "May 2017", gpa: "3.7/4.0" },
            ],
            certifications: [
              { name: "AWS Certified Solutions Architect - Associate", issuer: "Amazon Web Services", date: "Jan 2023" },
            ],
            experience: [
              {
                title: "Senior Software Engineer",
                company: "Company A",
                duration: "Jan 2020 - Present",
                description:
                  "Developed and maintained critical backend services using Python and Django, improving API response times by 20%. Led a team of 3 junior developers in agile sprints.",
              },
            ],
            skills: ["Python", "JavaScript", "React", "Node.js", "AWS", "Git", "Docker"],
            selectedTheme: "modern",
          }, null, 2),
        ].join("\n\n"),
      },
    ],
  };

  const exampleModelResponse: Content = {
    role: "model",
    parts: [{ text: MINIMAL_LATEX_EXAMPLE }],
  };

  // Your actual user request with the resume data
  const userRequestContent: Content = {
    role: "user",
    parts: [
      {
        text: [
          "Now, generate the complete LaTeX code for a professional resume using the provided JSON data. Remember to strictly follow all the rules and the example structure. CRITICAL: Your output must start with \\documentclass{article} and include \\begin{document} before any content and \\end{document} at the end.",
          JSON.stringify(resume, null, 2),
        ].join("\n\n"),
      },
    ],
  };

  const result = await model.generateContent({
    contents: [
      systemInstructionContent,
      exampleUserContent,    // Few-shot example
      exampleModelResponse,  // Model's perfect response to the example
      userRequestContent,    // Your actual request
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 4096,
    },
  });

  const text = result.response.text();
  console.log("Raw Gemini response:", text);
  
  // Ensure no lingering markdown fences or conversational filler
  let cleanedText = text
    .replace(/^```(?:latex)?\n*/i, "")
    .replace(/\n*```\s*$/i, "")
    .replace(/^\s*\[(?:START|BEGIN) LATEX\]\s*$/im, "") // Catch potential start markers
    .replace(/^\s*\[(?:END|FINISH) LATEX\]\s*$/im, "")   // Catch potential end markers
    .trim();
    
  console.log("Cleaned text:", cleanedText);
  console.log("Contains \\begin{document}:", cleanedText.includes('\\begin{document}'));

  // Always ensure we have a complete, valid LaTeX document
  // This is more robust than just checking for missing parts
  const hasDocumentBegin = cleanedText.includes('\\begin{document}');
  const hasDocumentEnd = cleanedText.includes('\\end{document}');
  const hasDocumentClass = cleanedText.includes('\\documentclass{article}');
  
  console.log("Document structure check:", {
    hasDocumentClass,
    hasDocumentBegin,
    hasDocumentEnd,
    textLength: cleanedText.length
  });
  
  // Always rebuild the document structure to ensure it's correct
  if (!hasDocumentClass || !hasDocumentBegin || !hasDocumentEnd) {
    console.log("Rebuilding document structure");
    
    // Extract just the content between \begin{document} and \end{document}
    let content = cleanedText;
    if (hasDocumentBegin && hasDocumentEnd) {
      const beginIndex = content.indexOf('\\begin{document}') + '\\begin{document}'.length;
      const endIndex = content.lastIndexOf('\\end{document}');
      if (beginIndex > 0 && endIndex > beginIndex) {
        content = content.substring(beginIndex, endIndex).trim();
      }
    }
    
    // Create a clean, complete document structure with minimal packages for latex.js compatibility
    cleanedText = `\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\begin{document}

${content}

\\end{document}`;
    
  console.log("Rebuilt document structure");
  console.log("Final cleaned text:", cleanedText);
}

// Post-process to replace unsupported commands
cleanedText = cleanedText
  .replace(/\\hrulefill/g, '\\rule{\\textwidth}{0.4pt}')  // Replace hrulefill with rule
  .replace(/\\textbullet/g, '•')  // Replace textbullet with actual bullet
  .replace(/\\textless/g, '<')    // Replace textless with actual <
  .replace(/\\textgreater/g, '>'); // Replace textgreater with actual >

console.log("Final processed text:", cleanedText);
return cleanedText;
}