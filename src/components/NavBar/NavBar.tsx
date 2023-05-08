import Link from 'next/link';
//import Image from "next/image";
import React, { useState } from 'react';
import Image from 'next/image';

// Styles
import styles from './NavBar.module.css';

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={'/'}>
          <Image
            src="/../public/img/Logo.png"
            alt="logo "
            width={170}
            height={60}
          />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
