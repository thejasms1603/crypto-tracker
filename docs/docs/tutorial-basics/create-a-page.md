---
sidebar_position: 1
---

# Create a Page

Add **Markdown or React** files to `app/pages` to create a **standalone page**:

- `app/page.tsx` → `localhost:3000/`



## Create your first React layout

Create a file at `app/layout.tsx`:

```tsx title="app/page.tsx"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

```


## Create your first React Page

Create a file at `app/page.tsx`:

```tsx title="app/page.tsx"
import CryptoTracker from '@/components/CryptoTracker'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen'>
      <CryptoTracker/>
    </div>
  )
}

export default page
```
A new page is now available at [http://localhost:3000](http://localhost:3000/).

