"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    ChartCandlestick,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
} from 'lucide-react';

export function AppSidebar({ sessionUser, ...props }) {

    const data = {
        user: {
            name: sessionUser?.name,
            email: sessionUser?.email,
            avatar: sessionUser?.photo || '/avater.webp'
        },
        teams: [
            {
                name: 'Acme Inc',
                logo: GalleryVerticalEnd,
                plan: 'Enterprise'
            },
            {
                name: 'Acme Corp.',
                logo: AudioWaveform,
                plan: 'Startup'
            },
            {
                name: 'Evil Corp.',
                logo: Command,
                plan: 'Free'
            }
        ],
        navMain: [
            {
                title: 'Trade',
                url: '#',
                icon: ChartCandlestick,
                isActive: true,
                items: [
                    {
                        title: 'Analytics',
                        url: '/trade/analytics'
                    },

                    {
                        title: 'History',
                        url: '/trade/history'
                    },
                    {
                        title: 'Settings',
                        url: '/trade/settings'
                    },
                ]
            },
            {
                title: 'Models',
                url: '#',
                icon: Bot,
                items: [
                    {
                        title: 'Genesis',
                        url: '#'
                    },
                    {
                        title: 'Explorer',
                        url: '#'
                    },
                    {
                        title: 'Quantum',
                        url: '#'
                    }
                ]
            },
            {
                title: 'Documentation',
                url: '#',
                icon: BookOpen,
                items: [
                    {
                        title: 'Introduction',
                        url: '#'
                    },
                    {
                        title: 'Get Started',
                        url: '#'
                    },
                    {
                        title: 'Tutorials',
                        url: '#'
                    },
                    {
                        title: 'Changelog',
                        url: '#'
                    }
                ]
            },
        ],
        projects: [
            {
                name: 'Design Engineering',
                url: '#',
                icon: Frame
            },
            {
                name: 'Sales & Marketing',
                url: '#',
                icon: PieChart
            },
            {
                name: 'Travel',
                url: '#',
                icon: Map
            }
        ]
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
