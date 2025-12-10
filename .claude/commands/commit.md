---
description: Create a conventional commit message for staged changes
---

Please create a commit for the staged changes following these guidelines:

1. Run these git commands in parallel to understand the changes:
   - `git status` to see all staged files
   - `git diff --staged` to see the actual changes
   - `git log --oneline -10` to understand the commit message style

2. Analyze the staged changes and create a conventional commit message following this format:

   ```
   <type>(<scope>): <short description>

   - Bullet point summary of changes
   - Additional context if needed
   ```

   **CRITICAL LINE LENGTH REQUIREMENT:**
   - The commit message body MUST NOT exceed 100 characters per line
   - If a bullet point is longer than 100 characters, wrap it across multiple lines
   - Use proper indentation (2 spaces) for wrapped lines to maintain readability
   - This is enforced by the commit-msg hook and will cause commit failure if violated

3. Commit types to use:
   - `feat`: New feature
   - `fix`: Bug fix
   - `chore`: Maintenance tasks, configuration, dependencies
   - `refactor`: Code restructuring without changing behavior
   - `docs`: Documentation changes
   - `test`: Adding or updating tests
   - `style`: Code style/formatting changes
   - `perf`: Performance improvements
   - `ci`: CI/CD changes

4. Create the commit using a heredoc for proper formatting:

   ```bash
   git commit -m "$(cat <<'EOF'
   <type>(<scope>): <description>

   - First bullet point with concise details
   - Second bullet point, wrapped to multiple lines if needed to stay
     under 100 characters per line
   - Third bullet point
   EOF
   )"
   ```

   **Example of proper line wrapping:**

   ```bash
   git commit -m "$(cat <<'EOF'
   feat(app): add user authentication with JWT tokens

   - Implement JWT-based authentication with refresh token rotation
   - Add login, logout, and token refresh endpoints to API routes
   - Create authentication middleware for protected route validation
   - Update user schema to include hashed password and refresh tokens
   EOF
   )"
   ```

## IMPORTANT NOTES - DO NOT IGNORE THE FOLLOWING:

- This repo has git hooks configured (Lefthook), so do NOT use `--no-verify`
- The hooks will run automatically and check: biome, linting, type-checking, spell-checking (cspell), and commit message format
- Do NOT interfere with hook execution - let them run naturally
- If any hook fails, the commit will be aborted and staged files will remain untouched
- If hooks modify files (like Biome formatting), do NOT re-add those changes - the hooks handle this automatically
- **If the commit fails due to the `body-max-line-length` error, retry ONCE with properly wrapped lines**
- **CRITICAL: If the commit fails due to cspell errors, NEVER add cspell disable comments or attempt to fix spelling**
- For cspell failures: Report the specific spelling errors to the user and stop - they will fix manually
- For other hook failures, report the error to the user and DO NOT offer to correct it
- Wait for the user to remediate non-formatting hook failures - they will fix the issues themselves
- Do NOT attempt to bypass or modify hook behavior
- Do NOT include any Claude Code or Anthropic attribution in commit messages
- Keep the commit message concise and focused on the "why" rather than the "what"
- Under any circumstances do not circumnavigate the commit signing process. All commits should be signed as per the local configuration.
