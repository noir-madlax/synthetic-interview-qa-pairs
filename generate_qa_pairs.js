const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Configuration
const INPUT_CSV = '500_Synthetic_Interviews_Data.csv'; // Input CSV file
const OUTPUT_DIR = 'output'; // Output directory
const PAIRS_PER_FILE = 5000; // Number of QA pairs per output file

// Ensure output directory exists
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

// Process CSV file and generate QA pairs
async function processCSV(csvFilePath) {
  return new Promise((resolve, reject) => {
    const qaPairs = [];
    
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // Extract all QA pairs from this row
        for (let i = 1; i <= 33; i++) {
          const questionKey = `Q${i}`;
          const answerKey = `A${i}`;
          
          if (row[questionKey] && row[answerKey]) {
            const qaPair = {
              prompt: row[questionKey],
              completion: row[answerKey]
            };
            qaPairs.push(qaPair);
          }
        }
      })
      .on('end', () => {
        resolve(qaPairs);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Write QA pairs to output files
function writeOutputFiles(qaPairs) {
  const totalPairs = qaPairs.length;
  const numFiles = Math.ceil(totalPairs / PAIRS_PER_FILE);
  
  console.log(`Writing ${totalPairs} QA pairs to ${numFiles} files...`);
  
  for (let fileIdx = 0; fileIdx < numFiles; fileIdx++) {
    const startIdx = fileIdx * PAIRS_PER_FILE;
    const endIdx = Math.min(startIdx + PAIRS_PER_FILE, totalPairs);
    
    const outputFile = path.join(OUTPUT_DIR, `qa_pairs_part_${fileIdx + 1}.jsonl`);
    
    const fileContent = qaPairs
      .slice(startIdx, endIdx)
      .map(pair => JSON.stringify(pair))
      .join('\n');
    
    fs.writeFileSync(outputFile, fileContent, 'utf8');
    
    console.log(`Created ${outputFile} with ${endIdx - startIdx} QA pairs`);
  }
}

// Main function
async function main() {
  console.log(`Processing CSV file: ${INPUT_CSV}`);
  ensureOutputDir();
  
  try {
    const qaPairs = await processCSV(INPUT_CSV);
    console.log(`Extracted ${qaPairs.length} QA pairs from CSV`);
    
    writeOutputFiles(qaPairs);
    console.log('Done!');
  } catch (error) {
    console.error('Error processing CSV:', error);
  }
}

// Run the script
main();
