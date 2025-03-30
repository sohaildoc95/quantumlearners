# Test Management Guide

This guide explains how to manage and update tests for Quantum Learners.

## Directory Structure

```
assets/tests/
├── test-template.json       # Template for creating new tests
├── class-tests/            # Regular class tests
│   ├── year7-math.json
│   ├── year7-english.json
│   └── ...
└── competitive-tests/      # Competitive exam tests
    ├── year11-sats.json
    └── ...
```

## Creating a New Test

1. Copy `test-template.json` to create a new test file
2. Name the file using the format: `[year]-[subject].json` for class tests or `[year]-[exam].json` for competitive tests
3. Update the following fields:
   - `testId`: Unique identifier (e.g., "year7-math")
   - `testName`: Display name of the test
   - `subject`: Subject area
   - `yearGroup`: Target year group
   - `examType`: "Regular" or "Competitive"
   - `questions`: Array of question objects

## Question Format

Each question should include:
```json
{
    "id": 1,
    "question": "Question text here?",
    "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
    ],
    "correctAnswer": 0,  // Index of correct option (0-3)
    "explanation": "Explanation for the answer",
    "subject": "Specific topic",
    "marks": 1
}
```

## Updating Tests

To update existing tests:
1. Open the relevant JSON file
2. Modify questions, options, or answers as needed
3. Ensure the JSON format remains valid
4. Update the test version if tracking versions

## Best Practices

1. Always validate JSON syntax after making changes
2. Keep questions clear and concise
3. Provide helpful explanations for answers
4. Use consistent formatting
5. Back up test files before making major changes

## File Naming Convention

- Class Tests: `year[number]-[subject].json`
  Example: `year7-math.json`, `year8-science.json`

- Competitive Tests: `year[number]-[exam].json`
  Example: `year11-sats.json`, `year6-11plus.json`

## Adding New Subjects

To add a new subject:
1. Create a new JSON file following the naming convention
2. Copy the structure from `test-template.json`
3. Add subject-specific questions and answers

## Feedback Ranges

Customize feedback messages based on score ranges:
```json
"feedbackRanges": [
    {
        "min": 0,
        "max": 40,
        "message": "Custom message for low scores"
    },
    // ... add more ranges as needed
]
``` 