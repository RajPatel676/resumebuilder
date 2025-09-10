import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';

export class PDFGenerator {
  static outputDir = path.join(process.cwd(), 'temp', 'pdfs');

  static async ensureOutputDir() {
    await fs.ensureDir(this.outputDir);
  }

  static getTemplateStyles(template) {
    const baseStyles = {
      modern: {
        primaryColor: '#1A73E8',
        secondaryColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
        accentColor: '#4285F4',
        layout: 'gradient'
      },
      classic: {
        primaryColor: '#2c3e50',
        secondaryColor: '#ecf0f1',
        fontFamily: 'Georgia, serif',
        accentColor: '#34495e',
        layout: 'traditional'
      },
      creative: {
        primaryColor: '#e74c3c',
        secondaryColor: '#f39c12',
        fontFamily: 'Helvetica, sans-serif',
        accentColor: '#e67e22',
        layout: 'sidebar'
      },
      elegant: {
        primaryColor: '#8e44ad',
        secondaryColor: '#e8e8e8',
        fontFamily: 'Calibri, sans-serif',
        accentColor: '#9b59b6',
        layout: 'refined'
      },
      executive: {
        primaryColor: '#34495e',
        secondaryColor: '#bdc3c7',
        fontFamily: 'Times New Roman, serif',
        accentColor: '#2c3e50',
        layout: 'professional'
      },
      minimal: {
        primaryColor: '#333333',
        secondaryColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
        accentColor: '#666666',
        layout: 'minimal'
      },
      technical: {
        primaryColor: '#0066cc',
        secondaryColor: '#f0f8ff',
        fontFamily: 'Consolas, monospace',
        accentColor: '#0052a3',
        layout: 'technical'
      },
      'latex-classic': {
        primaryColor: '#1f4e79',
        secondaryColor: '#f5f5f5',
        fontFamily: 'Times New Roman, serif',
        accentColor: '#2e5984',
        layout: 'academic'
      },
      'latex-modern': {
        primaryColor: '#0066cc',
        secondaryColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
        accentColor: '#004d99',
        layout: 'modern-academic'
      },
      'latex-minimal': {
        primaryColor: '#333333',
        secondaryColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        accentColor: '#555555',
        layout: 'latex-minimal'
      },
      'latex-sidebar': {
        primaryColor: '#1A73E8',
        secondaryColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        accentColor: '#4285F4',
        layout: 'latex-sidebar'
      }
    };

    return baseStyles[template] || baseStyles.modern;
  }

  static generateHTML(resumeData, template = 'modern') {
    const { personal_info, education, experience, skills, summary, certifications, projects } = resumeData;

    console.log('=== PDF TEMPLATE DEBUG ===');
    console.log('generateHTML called with template:', template);
    console.log('Template type:', typeof template);
    console.log('Template length:', template?.length);

    const templateStyles = this.getTemplateStyles(template);
    console.log('Template styles for', template, ':', JSON.stringify(templateStyles, null, 2));
    console.log('Primary color:', templateStyles.primaryColor);
    console.log('Font family:', templateStyles.fontFamily);
    console.log('Layout:', templateStyles.layout);

    // Special verification for Executive template
    if (template === 'executive') {
      console.log('🎯 EXECUTIVE TEMPLATE PROCESSING:');
      console.log('  - Primary Color:', templateStyles.primaryColor, '(should be #34495e)');
      console.log('  - Font Family:', templateStyles.fontFamily, '(should be Times New Roman, serif)');
      console.log('  - Layout:', templateStyles.layout, '(should be professional)');

      if (templateStyles.primaryColor !== '#34495e') {
        console.error('❌ EXECUTIVE TEMPLATE STYLES NOT APPLIED CORRECTLY!');
      } else {
        console.log('✅ Executive template styles confirmed');
      }
    }

    return `
<!DOCTYPE html>
<html lang="en">
<!-- PDF Template: ${template} -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${personal_info.fullName || 'Resume'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${templateStyles.fontFamily};
            line-height: 1.3;
            color: #333;
            background: white;
            font-size: ${templateStyles.layout === 'technical' ? '11px' : '12px'};
        }

        .container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.4in;
            background: white;
            height: 10.5in;
            overflow: hidden;
            ${templateStyles.layout === 'sidebar' || templateStyles.layout === 'latex-sidebar' ? 'display: flex; padding: 0;' : ''}
        }

        ${templateStyles.layout === 'sidebar' || templateStyles.layout === 'latex-sidebar' ? `
        .sidebar {
            width: 35%;
            background: ${templateStyles.primaryColor};
            color: white;
            padding: 0.5in;
        }

        .main-content {
            width: 65%;
            padding: 0.5in;
        }

        .sidebar .section-title {
            color: white;
            border-bottom: 1px solid rgba(255,255,255,0.3);
        }

        .sidebar .skill-item {
            background: rgba(255,255,255,0.1);
            border-left: 3px solid white;
            color: white;
        }
        ` : ''}
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid ${templateStyles.primaryColor};
            ${templateStyles.layout === 'gradient' ? `background: linear-gradient(135deg, ${templateStyles.primaryColor}20, ${templateStyles.accentColor}20); border-radius: 10px; padding: 25px;` : ''}
        }

        .name {
            font-size: ${templateStyles.layout === 'minimal' ? '24px' : '28px'};
            font-weight: bold;
            color: ${templateStyles.primaryColor};
            margin-bottom: 10px;
            font-family: ${templateStyles.fontFamily};
        }
        
        .contact-info {
            font-size: 14px;
            color: #666;
        }
        
        .contact-info span {
            margin: 0 10px;
        }
        
        .section {
            margin-bottom: 15px;
        }

        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: ${templateStyles.primaryColor};
            border-bottom: ${templateStyles.layout === 'minimal' ? '0' : '1px solid #ddd'};
            padding-bottom: 3px;
            margin-bottom: 8px;
            ${templateStyles.layout === 'academic' ? 'text-transform: uppercase; letter-spacing: 1px;' : ''}
            ${templateStyles.layout === 'latex-sidebar' ? 'background: ' + templateStyles.primaryColor + '; color: white; padding: 8px 12px; border-radius: 4px; margin-bottom: 12px;' : ''}
        }
        
        .summary {
            font-size: 14px;
            line-height: 1.6;
            text-align: justify;
        }
        
        .experience-item, .education-item {
            margin-bottom: 8px;
        }

        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3px;
        }

        .position, .degree {
            font-weight: bold;
            font-size: 13px;
        }
        
        .company, .institution {
            color: ${templateStyles.accentColor};
            font-weight: 500;
        }
        
        .date {
            color: #666;
            font-size: 14px;
        }
        
        .description {
            font-size: 14px;
            margin-left: 15px;
            color: #555;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
        }
        
        .skill-item {
            background: ${templateStyles.secondaryColor};
            padding: 8px 12px;
            border-radius: ${templateStyles.layout === 'minimal' ? '0' : '5px'};
            border-left: 3px solid ${templateStyles.primaryColor};
            ${templateStyles.layout === 'technical' ? 'font-family: monospace; border: 1px solid ' + templateStyles.primaryColor + '; border-left: 3px solid ' + templateStyles.primaryColor + ';' : ''}
        }
        
        .skill-name {
            font-weight: 500;
        }
        
        .skill-level {
            font-size: 12px;
            color: #666;
        }
        
        @media print {
            body {
                -webkit-print-color-adjust: exact;
            }
            
            .container {
                padding: 0.3in;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${templateStyles.layout === 'sidebar' || templateStyles.layout === 'latex-sidebar' ? `
        <div class="sidebar">
            <h1 class="name">${personal_info.fullName || 'Your Name'}</h1>
            <div class="contact-info">
                ${personal_info.email ? `<div>📧 ${personal_info.email}</div>` : ''}
                ${personal_info.phone ? `<div>📞 ${personal_info.phone}</div>` : ''}
                ${personal_info.address ? `<div>📍 ${personal_info.address}</div>` : ''}
                ${personal_info.linkedin ? `<div>💼 ${personal_info.linkedin}</div>` : ''}
                ${personal_info.website ? `<div>🌐 ${personal_info.website}</div>` : ''}
            </div>

            ${skills && skills.length > 0 ? `
            <section class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    ${skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-name">${skill.name || 'Skill'}</div>
                            ${skill.level ? `<div class="skill-level">${skill.level}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
        <div class="main-content">
        ` : `
        <header class="header">
            <h1 class="name">${personal_info.fullName || 'Your Name'}</h1>
            <div class="contact-info">
                ${personal_info.email ? `<span>📧 ${personal_info.email}</span>` : ''}
                ${personal_info.phone ? `<span>📞 ${personal_info.phone}</span>` : ''}
                ${personal_info.address ? `<span>📍 ${personal_info.address}</span>` : ''}
                ${personal_info.linkedin ? `<span>💼 ${personal_info.linkedin}</span>` : ''}
                ${personal_info.website ? `<span>🌐 ${personal_info.website}</span>` : ''}
            </div>
        </header>
        `}

        ${summary ? `
        <section class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p class="summary">${summary}</p>
        </section>
        ` : ''}

        ${experience && experience.length > 0 ? `
        <section class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${experience.map(exp => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="position">${exp.position || 'Position'}</div>
                            <div class="company">${exp.company || 'Company'}</div>
                        </div>
                        <div class="date">${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}</div>
                    </div>
                    ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
                </div>
            `).join('')}
        </section>
        ` : ''}

        ${education && education.length > 0 ? `
        <section class="section">
            <h2 class="section-title">Education</h2>
            ${education.map(edu => `
                <div class="education-item">
                    <div class="item-header">
                        <div>
                            <div class="degree">${edu.degree || 'Degree'} ${edu.field ? `in ${edu.field}` : ''}</div>
                            <div class="institution">${edu.institution || 'Institution'}</div>
                        </div>
                        <div class="date">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                    </div>
                    ${edu.gpa ? `<div class="description">GPA: ${edu.gpa}</div>` : ''}
                </div>
            `).join('')}
        </section>
        ` : ''}

        ${skills && skills.length > 0 && templateStyles.layout !== 'sidebar' && templateStyles.layout !== 'latex-sidebar' ? `
        <section class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
                ${skills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-name">${skill.name || 'Skill'}</div>
                        ${skill.level ? `<div class="skill-level">${skill.level}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${certifications && certifications.length > 0 ? `
        <section class="section">
            <h2 class="section-title">Certifications</h2>
            ${certifications.map(cert => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="position">${cert.name || 'Certification'}</div>
                            <div class="company">${cert.issuer || 'Issuer'}</div>
                        </div>
                        <div class="date">${cert.date || ''}</div>
                    </div>
                </div>
            `).join('')}
        </section>
        ` : ''}

        ${projects && projects.length > 0 ? `
        <section class="section">
            <h2 class="section-title">Projects</h2>
            ${projects.map(project => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="position">${project.name || 'Project'}</div>
                            ${project.url ? `<div class="company">${project.url}</div>` : ''}
                        </div>
                        <div class="date">${project.date || ''}</div>
                    </div>
                    ${project.description ? `<div class="description">${project.description}</div>` : ''}
                </div>
            `).join('')}
        </section>
        ` : ''}
        ${templateStyles.layout === 'sidebar' || templateStyles.layout === 'latex-sidebar' ? `</div>` : ''}
    </div>
</body>
</html>
    `;
  }

  static async generatePDF(resumeData, template = 'modern') {
    try {
      console.log('PDFGenerator.generatePDF called with template:', template);
      await this.ensureOutputDir();

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `resume_${timestamp}.pdf`;
      const outputPath = path.join(this.outputDir, filename);

      // Generate HTML content
      const htmlContent = this.generateHTML(resumeData, template);
      console.log('Generated HTML for template:', template);

      // Launch Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      
      // Set content and wait for it to load
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // Generate PDF
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        scale: 0.9,
        margin: {
          top: '0.3in',
          right: '0.3in',
          bottom: '0.3in',
          left: '0.3in'
        }
      });

      await browser.close();

      return {
        success: true,
        filename,
        path: outputPath
      };

    } catch (error) {
      console.error('PDF generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static async cleanupOldFiles(maxAgeMs = 24 * 60 * 60 * 1000) {
    try {
      await this.ensureOutputDir();
      const files = await fs.readdir(this.outputDir);
      const now = Date.now();

      for (const file of files) {
        const filePath = path.join(this.outputDir, file);
        const stats = await fs.stat(filePath);
        
        if (now - stats.mtime.getTime() > maxAgeMs) {
          await fs.remove(filePath);
        }
      }
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}
