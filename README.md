# Synthetic Interview QA Pairs

This repository contains tools for converting synthetic interview data from a CSV file into question-answer pairs in JSON format.

## Overview

The CSV file contains 1000 rows of interview data, with each row containing 33 question-answer pairs. The total number of QA pairs is 33,000.

Each QA pair is converted to the following JSON format:

```json
{"prompt": "question", "completion": "answer"}
```

## Sample QA Pairs

Here are a few examples of the converted QA pairs:

```json
{"prompt":"What factors influence your choice of market?","completion":"Moderately important."}
{"prompt":"How often do you buy this food?","completion":"Moderately important."}
{"prompt":"Were the quantity or types of food different today?","completion":"Not influenced much."}
```

## Tools Provided

This repository contains:

1. A sample of the first 1000 QA pairs in `qa_pairs_part_1.jsonl`
2. A Python script (`generate_qa_pairs.py`) to convert the entire CSV file
3. A JavaScript script (`generate_qa_pairs.js`) to convert the entire CSV file

## Using the Python Script

### Requirements

- Python 3.x
- CSV file named `500_Synthetic_Interviews_Data.csv` in the same directory

### Installation

No installation required, just make sure you have Python 3.x installed.

### Usage

1. Place the CSV file (`500_Synthetic_Interviews_Data.csv`) in the same directory as the script
2. Run the script:

```bash
python generate_qa_pairs.py
```

3. The output files will be generated in the `output` directory

## Using the JavaScript Script

### Requirements

- Node.js
- CSV file named `500_Synthetic_Interviews_Data.csv` in the same directory

### Installation

```bash
npm install csv-parser
```

### Usage

1. Place the CSV file (`500_Synthetic_Interviews_Data.csv`) in the same directory as the script
2. Run the script:

```bash
node generate_qa_pairs.js
```

3. The output files will be generated in the `output` directory

## Statistics

- Total QA pairs: 33,000
- Original CSV rows: 1,000
- QA pairs per row: 33
- Output files: Each file contains approximately 5,000 QA pairs (last file may contain fewer)
