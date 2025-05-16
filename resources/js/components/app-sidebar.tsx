import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, BookText, Building, ChartColumnIncreasing, Cuboid, Folder, Handshake, LayoutGrid, Library, ScrollText, Users } from 'lucide-react';
import AppLogo from './app-logo';




const footerNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.repository'),
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: t('ui.navigation.items.documentation'),
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const { t } = useTranslations();
    const mainNavItems = (t: (key: string) => string): NavItem[] => {
    const items: NavItem[] = [];
    items.push({
        title: t('ui.navigation.items.dashboard'),
        url: '/dashboard',
        icon: LayoutGrid,
    });

    /**User view permits */
    auth.permits.users.view &&
        items.push({
            title: t('ui.navigation.items.users'),
            url: '/users',
            icon: Users,
        });

    /**Reports view permits */
    auth.permits.reports.view &&
        items.push(
            {
                title: t('ui.navigation.items.floors'),
                url: '/floors',
                icon: Building,
            },
            {
                title: t('ui.navigation.items.zones'),
                url: '/zones',
                icon: Cuboid,
            },
            {
                title: t('ui.navigation.items.bookshelves'),
                url: '/bookshelves',
                icon: Library,
            },
        );

    /**Products view permits */
    auth.permits.products.view &&
        items.push({
            title: t('ui.navigation.items.books'),
            url: '/books',
            icon: BookText,
        });

    /**Reports view permits */
    auth.permits.reports.view &&
        items.push(
            {
                title: t('ui.navigation.items.loans'),
                url: '/loans',
                icon: Handshake,
            },
            {
                title: t('ui.navigation.items.reservations'),
                url: '/reservations',
                icon: ScrollText,
            },
            {
                title: t('ui.navigation.items.graphs'),
                url: '/graphs',
                icon: ChartColumnIncreasing,
            },
        );
    return items;
};
    
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(t)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems(t)} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
