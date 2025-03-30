# Cursor Rules and Guidelines

## Pre-Editing Checklist
1. Always read the existing code thoroughly before making changes
2. Check for dependencies and imports
3. Verify the context of the code being edited
4. Ensure you have complete file context (not just partial views)
5. Check for any existing linter errors

## Code Editing Rules
1. Never output code directly to the user unless specifically requested
2. Use code edit tools at most once per turn
3. Always include necessary imports and dependencies
4. Maintain consistent code style with the existing codebase
5. Add appropriate comments for complex logic
6. Ensure proper error handling
7. Follow security best practices (especially for API keys and sensitive data)

## Common Mistakes to Avoid
1. Making assumptions about code without reading the full context
2. Forgetting to add required imports
3. Breaking existing functionality while fixing issues
4. Not checking for linter errors after making changes
5. Making multiple unrelated changes in a single edit
6. Not maintaining proper indentation and formatting
7. Forgetting to handle edge cases
8. Not testing the changes before proceeding
9. Making changes without understanding the full impact
10. Not following the project's coding standards

## Best Practices
1. Make small, focused changes
2. Test changes thoroughly
3. Document significant changes
4. Keep the code DRY (Don't Repeat Yourself)
5. Follow SOLID principles
6. Write clean, maintainable code
7. Consider performance implications
8. Ensure proper error handling
9. Add appropriate logging
10. Consider backward compatibility

## When to Stop
1. After 3 failed attempts to fix linter errors
2. When changes might affect multiple components
3. When security concerns are identified
4. When the scope of changes becomes unclear
5. When dependencies need to be updated

## Review Process
1. Review the changes before committing
2. Check for potential side effects
3. Verify all tests pass
4. Ensure documentation is updated
5. Check for security vulnerabilities

Remember: Quality and reliability are more important than speed. Take the time to do things right the first time. 