'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin/projects', label: 'Projects' },
  // { href: '/admin/products', label: 'Create Products' },
  // { href: '/admin/list-products', label: 'Product List' },
  // { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/blogs', label: 'Blogs' },
  { href: '/admin/contacts', label: 'Contacts' },
  { href: '/admin/subscribers', label: 'Subscribers' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-48 min-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <nav className="p-4 space-y-1">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-md px-3 py-2 text-sm',
              pathname.startsWith(link.href)
                ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold'
                : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
