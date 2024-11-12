
'use client';

import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import React from 'react';

export default function BreadcrumbPath() {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(Boolean);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>

                {paths.length > 0 && <BreadcrumbSeparator />}

                {/* Dynamic segments */}
                {paths.map((path, index) => {
                    const isActive = index === paths.length - 1;
                    const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {isActive ? (
                                    <span className="font-semibold text-black dark:text-white">{formattedPath}</span>
                                ) : (
                                    <BreadcrumbLink href={`/${['dashboard', ...paths.slice(0, index + 1)].join('/')}`}>
                                        {formattedPath}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {index < paths.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
