"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher() {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleClick} aria-label="Cambiar tema">
      {!mounted || resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
