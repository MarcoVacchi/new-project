import React from 'react'
import Link from 'next/link'

const navigation = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Projects",
        href: "/projects"
    },
    {
        name: "About me",
        href: "/about"
    },
    {
        name: "Contact",
        href: "/contact"
    },
]

export default function header() {
    return (
        <nav className="border-b bg-background/90 backdrop-blur fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <a href="#" className="text-xl font-bol">
                    Logo Sito
                </a>

                <ul className="flex space-x-8 list-none">
                    {navigation.map(({ name, href }) =>
                        <li key={href}>
                            <Link href={href}
                            >
                                {name}
                            </Link>
                        </li>)}

                </ul>
            </div>
        </nav>
    )
}
