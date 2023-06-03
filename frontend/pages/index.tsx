import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Main from "@/components/main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Content Generator | AI Generated Marketing</title>
                <meta
                    name="description"
                    content="Generate branding for your product"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>
            <main>
                <Main />
            </main>
        </>
    );
}
