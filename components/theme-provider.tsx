"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from "next-themes"

/**
 * next-themes + React 19 warning filter.
 * next-themes ekta inline <script> render kore (theme flash thamate),
 * ar React 19 seta dekhle dev mode e warning dey. Eta harmless.
 * Sudhu ei ek-i message ta filter kora hocche, baki shob error ager moto ashbe.
 */
const SCRIPT_TAG_WARNING =
  "Encountered a script tag while rendering React component"

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const w = window as typeof window & { __scriptWarnPatched?: boolean }

  if (!w.__scriptWarnPatched) {
    w.__scriptWarnPatched = true

    const originalError = console.error

    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes(SCRIPT_TAG_WARNING)
      ) {
        return
      }

      originalError.apply(console, args)
    }
  }
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Ignore invalid or repeated keyboard events
      if (!event || !event.key || event.defaultPrevented || event.repeat) {
        return
      }

      // Ignore modifier keys
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      // Ignore typing inside input fields
      if (isTypingTarget(event.target)) {
        return
      }

      // Toggle theme using D key
      if (event.key.toLowerCase() !== "d") {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }