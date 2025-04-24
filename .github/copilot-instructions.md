# Copilot Instructions for TimeTap

## Overview
TimeTap is a time-tracking app designed to help users maintain a healthy work-life balance. This document provides specific instructions for using GitHub Copilot effectively within the TimeTap project.

---

## General Guidelines
1. **Follow TypeScript Best Practices**: Ensure all code adheres to the TypeScript configuration defined in `tsconfig.json`.
2. **React and Tailwind CSS**: Use React for UI components and Tailwind CSS for styling. Follow the existing patterns in the `src/components` directory.
3. **LocalStorage Usage**: When working with user data, ensure it is stored and retrieved from `localStorage` as demonstrated in `SettingsContextProvider.tsx`.
4. **Notification API**: Use the browser's Notification API responsibly, as shown in `Options.tsx`.

---

## File-Specific Instructions

### `src/components`
- **New Components**: Place new components in this directory. Follow the structure and naming conventions of existing components like `Timer.tsx` and `Settings.tsx`.
- **Styling**: Use Tailwind CSS classes for styling. Avoid inline styles unless necessary.

### `src/contexts`
- **Context Management**: Use the `SettingsContext` for managing global state. Ensure new context values are added to `SettingsContextType` in `types/SettingsContextType.ts`.

### `src/constants`
- **Static Data**: Add new static data (e.g., images or configuration) to `constants/images.ts` or create a new file in this directory.

### `src/hooks`
- **Custom Hooks**: Place reusable hooks here. Follow the pattern in `useSettingsContext.ts`.

### `src/utility`
- **Utility Functions**: Add helper functions here. Ensure they are pure and reusable.

---

## Testing and Debugging
1. **Linting**: Run `npm run lint` to check for code quality issues.
2. **Formatting**: Use `npm run format` to format code according to the project's style guide.
3. **Preview**: Use `npm run dev` to preview changes locally.

---

## Deployment
- Use the GitHub Actions workflow defined in `.github/workflows/deploy.yaml` to deploy the app to GitHub Pages.

---

## Additional Notes
- **Documentation**: Update the `README.md` file for any significant changes.
- **Contributions**: Follow the guidelines in `.github/ISSUE_TEMPLATE` for feature requests and bug reports.