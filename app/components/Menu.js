"use client"
import React from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import styles from '../assets/styles/menu.module.css'

const Menu = () => {

      const navLinks = [
        {name:"Home", href:"/"},
        {name:"Nos clients", href:"/clients"},
        {name:"Nos commandes", href:"/orders"}         
      ]

      const pathname = usePathname();

    return (
        <div className={styles.menu}>
            {navLinks.map((link)=>{
                // Check if the link is exactly equal to "/" for "Home" or starts with the href for the other links.
                const isActive = link.href === "/" ? pathname === link.href : pathname.startsWith(link.href);
                return(
                    <Link href={link.href} key={link.name} className={isActive ? styles['nav-active'] : styles['inactive']}>
                        {link.name}
                    </Link>
                )
            })}
        </div>
    );
};

export default Menu;