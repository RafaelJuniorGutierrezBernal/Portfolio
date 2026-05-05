const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, '../rafael-junior-portfolio.html');
const content = fs.readFileSync(srcFile, 'utf8');


function extractHTML(sectionName) {
  const regex = new RegExp(`<!-- ={60}\\s*${sectionName}\\s*={60} -->\\s*(<section[\\s\\S]*?</section>)`, 'i');
  const match = content.match(regex);
  if (match) return match[1].trim();
  
 
  if (sectionName === 'FOOTER') {
    const footerRegex = new RegExp(`<!-- ={60}\\s*FOOTER\\s*={60} -->\\s*(<footer[\\s\\S]*?</footer>)`, 'i');
    const footerMatch = content.match(footerRegex);
    if (footerMatch) return footerMatch[1].trim();
  }
  return '';
}


function extractCSS(sectionName) {
  const regex = new RegExp(`/\\* ={60}\\s*${sectionName}\\s*={60} \\*/\\s*([\\s\\S]*?)(?=/\\* ={60}|</style>)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

const components = [
  { name: 'about', html: 'ABOUT', css: 'ABOUT', path: 'src/app/features/about/about' },
  { name: 'skills', html: 'SKILLS', css: 'SKILLS', path: 'src/app/features/skills/skills' },
  { name: 'projects', html: 'PROJECTS', css: 'PROJECTS', path: 'src/app/features/projects/projects' },
  { name: 'education', html: 'EDUCATION', css: 'EXPERIENCE / EDUCATION', path: 'src/app/features/education/education' },
  { name: 'contact', html: 'CONTACT', css: 'CONTACT', path: 'src/app/features/contact/contact' },
  { name: 'footer', html: 'FOOTER', css: 'FOOTER', path: 'src/app/core/footer/footer' }
];

components.forEach(comp => {
  const htmlContent = extractHTML(comp.html);
  const cssContent = extractCSS(comp.css);
  
  if (htmlContent) {
    fs.writeFileSync(path.join(__dirname, comp.path + '.html'), htmlContent);
  }
  if (cssContent) {
    fs.writeFileSync(path.join(__dirname, comp.path + '.css'), cssContent);
  }
});

console.log('Migration completed successfully.');
