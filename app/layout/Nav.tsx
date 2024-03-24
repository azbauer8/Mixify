import { cn } from "@/utils/general"
import { NavLink, useLocation } from "@remix-run/react"
import { Disc3Icon, HistoryIcon, HomeIcon, MicVocalIcon } from "lucide-react"
import { $path } from "remix-routes"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navLinks = [
  {
    name: "Home",
    href: $path("/"),
    icon: HomeIcon,
  },
  {
    name: "Artists",
    href: $path("/artists"),
    icon: MicVocalIcon,
  },
  {
    name: "Tracks",
    href: $path("/tracks"),
    icon: Disc3Icon,
  },
  {
    name: "Recent",
    href: $path("/recent"),
    icon: HistoryIcon,
  },
] as const

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <TooltipProvider>
      <div className="flex items-center overflow-hidden rounded-lg border text-center">
        {navLinks.map(({ name, href, icon: Icon }, index) => (
          <Tooltip key={name} delayDuration={0}>
            <TooltipTrigger
              asChild
              className={cn(
                "px-6 py-3 text-accent-foreground hover:bg-accent",
                index !== navLinks.length - 1 && "border-r",
                pathname === href && "bg-accent"
              )}
            >
              <NavLink to={href} prefetch="intent">
                <Icon />
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-base">
              {name}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
