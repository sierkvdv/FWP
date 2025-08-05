// Script om foute imports te vinden
const fs = require('fs');
const path = require('path');

function findFiles(dir, extensions = ['.tsx', '.ts', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filePath, extensions));
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

const files = findFiles('./src');
console.log('Checking files for bad imports...');

files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes("import") && content.includes("use") && content.includes("from 'react'")) {
      console.log(`Found potential bad import in: ${file}`);
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes("import") && line.includes("use") && line.includes("from 'react'")) {
          console.log(`  Line ${index + 1}: ${line.trim()}`);
        }
      });
    }
  } catch (err) {
    console.log(`Error reading ${file}:`, err.message);
  }
}); 