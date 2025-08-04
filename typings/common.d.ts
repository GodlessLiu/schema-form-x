/// <reference types="vite-plugin-pwa/client" />

declare global {
  /**
   * Vue app module type for plugin registration
   * Used by auto-import plugins to register global modules
   */
  type UserModule = (arg: { app: App<Element> }) => void

  /**
   * Command item interface for command palette functionality
   * Represents a single command option in the command dialog
   */
  interface CommandItem {
    /** Unique identifier for the command item */
    value: string
    /** Display text for the command item */
    label: string
    /** Optional icon class name for the command item */
    icon?: string
    /** Function to execute when the command is selected */
    action: () => Promise<void> | void
    /** Whether the command item is disabled/not selectable */
    disabled?: boolean
  }

  /**
   * Command group interface for organizing command items
   * Groups related commands together in the command palette
   */
  interface CommandGroup {
    /** Display title for the command group */
    title: string
    /** Array of command items belonging to this group */
    items: CommandItem[]
  }

  /**
   * Loading options interface for global loading state management
   * Configures how loading states are displayed and handled
   */
  interface LoadingOptions {
    /** Optional text to display during loading */
    text?: string
    /** Whether to suppress error toast notifications */
    silent?: boolean
  }

  /**
   * Loading state interface for tracking global loading status
   * Manages the current loading state across the application
   */
  interface LoadingState {
    /** Whether any loading operation is currently active */
    isLoading: boolean
    /** Text message to display during loading */
    loadingText: string
    /** Counter for nested loading operations */
    loadingCount: number
  }

  /**
   * Theme settings interface for application theming
   * Manages color scheme and display mode preferences
   */
  interface ThemeSettings {
    /** Selected theme color (e.g., 'zinc', 'blue', 'green') */
    color: string
    /** Theme display mode ('light' or 'dark') */
    mode: Theme
  }

  /**
   * Application settings interface for user preferences
   * Stores all user-configurable application settings
   */
  interface Settings {
    /** Theme-related settings including color and mode */
    theme: ThemeSettings
    /** Selected language code (e.g., 'zh-CN', 'en') */
    language: string
  }
}

export {}
