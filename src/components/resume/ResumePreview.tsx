import React from 'react';
import { ResumeData } from '@/lib/gemini';

interface ResumePreviewProps {
  data: ResumeData;
  template: 'modern' | 'classic';
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const isModern = template === 'modern';

  return (
    <div className={`resume-preview ${isModern ? 'modern' : 'classic'}`}>
      <style jsx>{`
        .resume-preview {
          font-family: ${isModern ? "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" : "'Times New Roman', serif"};
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          color: ${isModern ? '#333' : '#000'};
          line-height: ${isModern ? '1.6' : '1.4'};
        }
        
        .resume-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: ${isModern ? '2px solid #2c3e50' : '1px solid #000'};
        }
        
        .resume-header h1 {
          font-size: ${isModern ? '2.5em' : '2.2em'};
          margin: 0 0 10px 0;
          color: ${isModern ? '#2c3e50' : '#000'};
          font-weight: ${isModern ? '300' : 'bold'};
          ${!isModern ? 'text-transform: uppercase; letter-spacing: 1px;' : ''}
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 0.9em;
          color: ${isModern ? '#666' : '#333'};
        }
        
        .contact-info span {
          ${isModern ? 'padding: 5px 10px; background: #f8f9fa; border-radius: 4px;' : ''}
        }
        
        .resume-section {
          margin-bottom: 25px;
        }
        
        .section-title {
          font-size: ${isModern ? '1.3em' : '1.2em'};
          color: ${isModern ? '#2c3e50' : '#000'};
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: ${isModern ? '1px solid #ecf0f1' : '1px solid #000'};
          font-weight: ${isModern ? '600' : 'bold'};
          ${!isModern ? 'text-transform: uppercase; letter-spacing: 0.5px;' : ''}
        }
        
        .experience-item, .education-item, .certification-item {
          margin-bottom: 20px;
          ${isModern ? 'padding-left: 20px; border-left: 3px solid #3498db; padding-left: 15px;' : ''}
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
          color: ${isModern ? '#2c3e50' : '#000'};
          font-size: 1.1em;
        }
        
        .item-company, .item-school {
          color: ${isModern ? '#7f8c8d' : '#333'};
          font-style: italic;
        }
        
        .item-date {
          color: ${isModern ? '#95a5a6' : '#666'};
          font-size: 0.9em;
          white-space: nowrap;
        }
        
        .item-description {
          color: ${isModern ? '#555' : '#000'};
          margin-top: 5px;
        }
        
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .skill-tag {
          background: ${isModern ? '#3498db' : '#f0f0f0'};
          color: ${isModern ? 'white' : '#000'};
          padding: 4px 12px;
          border-radius: ${isModern ? '20px' : '0'};
          font-size: 0.85em;
          font-weight: 500;
          ${!isModern ? 'border: 1px solid #ccc;' : ''}
        }
        
        .summary {
          background: ${isModern ? '#f8f9fa' : 'transparent'};
          padding: 15px;
          border-radius: ${isModern ? '8px' : '0'};
          border-left: ${isModern ? '4px solid #3498db' : 'none'};
          font-style: italic;
          color: ${isModern ? '#555' : '#000'};
        }
        
        @media print {
          .resume-preview {
            padding: 0;
            max-width: none;
          }
          .contact-info {
            justify-content: flex-start;
          }
        }
      `}</style>
      
      <div className="resume-header">
        <h1>{data.personal.name || 'Your Name'}</h1>
        <div className="contact-info">
          {data.personal.email && <span>📧 {data.personal.email}</span>}
          {data.personal.phone && <span>📱 {data.personal.phone}</span>}
          {data.personal.location && <span>📍 {data.personal.location}</span>}
        </div>
      </div>

      {data.personal.summary && (
        <div className="resume-section">
          <div className="section-title">{isModern ? 'Summary' : 'Objective'}</div>
          <div className="summary">{data.personal.summary}</div>
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div className="resume-section">
          <div className="section-title">Skills</div>
          <div className="skills-list">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="resume-section">
          <div className="section-title">Experience</div>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="item-header">
                <div>
                  <div className="item-title">{exp.title || 'Position'}</div>
                  <div className="item-company">{exp.company || 'Company'}</div>
                </div>
                <div className="item-date">{exp.duration || 'Duration'}</div>
              </div>
              {exp.description && <div className="item-description">{exp.description}</div>}
            </div>
          ))}
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div className="resume-section">
          <div className="section-title">Education</div>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="item-header">
                <div>
                  <div className="item-title">{edu.degree || 'Degree'}</div>
                  <div className="item-school">{edu.school || 'School'}</div>
                </div>
                <div className="item-date">{edu.year || 'Year'}</div>
              </div>
              {edu.gpa && <div className="item-description">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <div className="resume-section">
          <div className="section-title">Certifications</div>
          {data.certifications.map((cert, index) => (
            <div key={index} className="certification-item">
              <div className="item-header">
                <div>
                  <div className="item-title">{cert.name || 'Certification'}</div>
                  <div className="item-company">{cert.issuer || 'Issuer'}</div>
                </div>
                <div className="item-date">{cert.date || 'Date'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
