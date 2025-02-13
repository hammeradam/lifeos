import { useTheme } from '@/components/theme-provider';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        size="sm"
        onClick={() => {
          setTheme(
            theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark',
          );
        }}
      >
        <button type="button">
          {theme === 'light' && <Sun />}
          {theme === 'dark' && <Moon />}
          {theme === 'system' && <SunMoon />}
          <span>{theme}</span>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
