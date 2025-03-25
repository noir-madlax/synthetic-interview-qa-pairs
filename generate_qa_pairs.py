#!/usr/bin/env python3
import csv
import json
import os

# Configuration
INPUT_CSV = "500_Synthetic_Interviews_Data.csv"  # Input CSV file
OUTPUT_DIR = "output"  # Output directory
PAIRS_PER_FILE = 5000  # Number of QA pairs per output file

def ensure_output_dir():
    """Create output directory if it doesn't exist"""
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

def process_csv(csv_file_path):
    """Process CSV file and generate QA pairs"""
    qa_pairs = []
    
    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Extract all QA pairs from this row
            for i in range(1, 34):  # QA pairs from 1 to 33
                question_key = f"Q{i}"
                answer_key = f"A{i}"
                
                if question_key in row and answer_key in row and row[question_key] and row[answer_key]:
                    qa_pair = {
                        "prompt": row[question_key],
                        "completion": row[answer_key]
                    }
                    qa_pairs.append(qa_pair)
    
    return qa_pairs

def write_output_files(qa_pairs):
    """Write QA pairs to output files"""
    total_pairs = len(qa_pairs)
    num_files = (total_pairs + PAIRS_PER_FILE - 1) // PAIRS_PER_FILE  # Ceiling division
    
    print(f"Writing {total_pairs} QA pairs to {num_files} files...")
    
    for file_idx in range(num_files):
        start_idx = file_idx * PAIRS_PER_FILE
        end_idx = min(start_idx + PAIRS_PER_FILE, total_pairs)
        
        output_file = os.path.join(OUTPUT_DIR, f"qa_pairs_part_{file_idx + 1}.jsonl")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            for idx in range(start_idx, end_idx):
                f.write(json.dumps(qa_pairs[idx], ensure_ascii=False) + '\n')
        
        print(f"Created {output_file} with {end_idx - start_idx} QA pairs")

def main():
    print(f"Processing CSV file: {INPUT_CSV}")
    ensure_output_dir()
    
    qa_pairs = process_csv(INPUT_CSV)
    print(f"Extracted {len(qa_pairs)} QA pairs from CSV")
    
    write_output_files(qa_pairs)
    print("Done!")

if __name__ == "__main__":
    main()
