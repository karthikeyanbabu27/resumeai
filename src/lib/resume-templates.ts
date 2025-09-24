import { ResumeData } from './gemini';

export interface ResumeTemplate {
  name: string;
  generate: (data: ResumeData) => string;
}

export const modernTemplate: ResumeTemplate = {
  name: 'Modern',
  generate: (data: ResumeData) => {
    return `
      <div class="resume-modern">
        <style>
          .resume-modern {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            color: #333;
            line-height: 1.6;
          }
          .resume-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #2c3e50;
          }
          .resume-header h1 {
            font-size: 2.5em;
            margin: 0 0 10px 0;
            color: #2c3e50;
            font-weight: 300;
          }
          .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 0.9em;
            color: #666;
          }
          .contact-info span {
            padding: 5px 10px;
            background: #f8f9fa;
            border-radius: 4px;
          }
          .resume-section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 1.3em;
            color: #2c3e50;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ecf0f1;
            font-weight: 600;
          }
          .experience-item, .education-item, .certification-item {
            margin-bottom: 20px;
            padding-left: 20px;
            border-left: 3px solid #3498db;
            padding-left: 15px;
          }
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
            flex-wrap: wrap;
          }
          .item-title {
            font-weight: 600;
            color: #2c3e50;
            font-size: 1.1em;
          }
          .item-company, .item-school {
            color: #7f8c8d;
            font-style: italic;
          }
          .item-date {
            color: #95a5a6;
            font-size: 0.9em;
            white-space: nowrap;
          }
          .item-description {
            color: #555;
            margin-top: 5px;
          }
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .skill-tag {
            background: #3498db;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 500;
          }
          .summary {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
            font-style: italic;
            color: #555;
          }
          @media print {
            .resume-modern {
              padding: 0;
              max-width: none;
            }
            .contact-info {
              justify-content: flex-start;
            }
          }
        </style>
        
        <div class="resume-header">
          <h1>${data.personal.name || 'Your Name'}</h1>
          <div class="contact-info">
            ${data.personal.email ? `<span>📧 ${data.personal.email}</span>` : ''}
            ${data.personal.phone ? `<span>📱 ${data.personal.phone}</span>` : ''}
            ${data.personal.location ? `<span>📍 ${data.personal.location}</span>` : ''}
          </div>
        </div>

        ${data.personal.summary ? `
          <div class="resume-section">
            <div class="section-title">Summary</div>
            <div class="summary">${data.personal.summary}</div>
          </div>
        ` : ''}

        ${data.skills && data.skills.length > 0 ? `
          <div class="resume-section">
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        ${data.experience && data.experience.length > 0 ? `
          <div class="resume-section">
            <div class="section-title">Experience</div>
            ${data.experience.map(exp => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.title || 'Position'}</div>
                    <div class="item-company">${exp.company || 'Company'}</div>
                  </div>
                  <div class="item-date">${exp.duration || 'Duration'}</div>
                </div>
                ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.education && data.education.length > 0 ? `
          <div class="resume-section">
            <div class="section-title">Education</div>
            ${data.education.map(edu => `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.degree || 'Degree'}</div>
                    <div class="item-school">${edu.school || 'School'}</div>
                  </div>
                  <div class="item-date">${edu.year || 'Year'}</div>
                </div>
                ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.certifications && data.certifications.length > 0 ? `
          <div class="resume-section">
            <div class="section-title">Certifications</div>
            ${data.certifications.map(cert => `
              <div class="certification-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${cert.name || 'Certification'}</div>
                    <div class="item-company">${cert.issuer || 'Issuer'}</div>
                  </div>
                  <div class="item-date">${cert.date || 'Date'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }
};

export const classicTemplate: ResumeTemplate = {
  name: 'Classic',
  generate: (data: ResumeData) => {
    return `
      <div class="resume-classic">
        <style>
          .resume-classic {
            font-family: 'Times New Roman', serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            color: #000;
            line-height: 1.4;
          }
          .resume-header {
            text-align: center;
            margin-bottom: 30px;
          }
          .resume-header h1 {
            font-size: 2.2em;
            margin: 0 0 10px 0;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .contact-info {
            font-size: 0.9em;
            color: #333;
          }
          .resume-section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #000;
            padding-bottom: 2px;
          }
          .experience-item, .education-item, .certification-item {
            margin-bottom: 15px;
          }
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 5px;
          }
          .item-title {
            font-weight: bold;
          }
          .item-company, .item-school {
            font-style: italic;
          }
          .item-date {
            font-size: 0.9em;
          }
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }
          .skill-tag {
            background: #f0f0f0;
            padding: 2px 8px;
            border: 1px solid #ccc;
            font-size: 0.85em;
          }
        </style>
        
        <div class="resume-header">
          <h1>${data.personal.name || 'Your Name'}</h1>
          <div class="contact-info">
            ${data.personal.email ? `${data.personal.email}` : ''}
            ${data.personal.phone ? ` | ${data.personal.phone}` : ''}
            ${data.personal.location ? ` | ${data.personal.location}` : ''}
          </div>
        </div>

        ${data.personal.summary ? `
          <div class="resume-section">
            <div class="section-title">Objective</div>
            <div>${data.personal.summary}</div>
          </div>
        ` : ''}

        ${data.skills && data.skills.length > 0 ? `
          <div class="resume-section">
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        ${data.experience && data.experience.length > 0 ? `
          <div class="resume-section">
            <div class="section-title">Experience</div>
            ${data.experience.map(exp => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.title || 'Position'}</div>
                    <div class="item-company">${exp.company || 'Company'}</div>
                  </div>
                  <div class="item-date">${exp.duration || 'Duration'}</div>
                </div>
                ${exp.description ? `<div>${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.education && data.education.length > 0 ? `
          <div class="resume-section">
            <div class="section-title">Education</div>
            ${data.education.map(edu => `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.degree || 'Degree'}</div>
                    <div class="item-school">${edu.school || 'School'}</div>
                  </div>
                  <div class="item-date">${edu.year || 'Year'}</div>
                </div>
                ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.certifications && data.certifications.length > 0 ? `
          <div class="resume-section">
            <div class="section-title">Certifications</div>
            ${data.certifications.map(cert => `
              <div class="certification-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${cert.name || 'Certification'}</div>
                    <div class="item-company">${cert.issuer || 'Issuer'}</div>
                  </div>
                  <div class="item-date">${cert.date || 'Date'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }
};

export const templates: ResumeTemplate[] = [modernTemplate, classicTemplate];
