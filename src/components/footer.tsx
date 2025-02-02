import Link from "next/link";
import React from "react";
import { constants } from "@/lib/constants";

export const Footer = () => (
  <div className="flex h-80 w-full flex-col flex-wrap items-center border-t bg-stone-50 px-4 py-8 sm:flex-row sm:px-8 sm:py-16">
    <div className="center flex-col justify-start space-y-1 sm:order-last sm:h-full sm:items-end">
      <h4 className="text-base">Company</h4>
      <Link href={constants.twitter.url}>Twitter</Link>
      <Link href={constants.github.url}>GitHub</Link>
      <Link href={constants.discord.url}>Discord</Link>
    </div>
    <div className="grow" />
    <div className="flex flex-col items-center space-y-1 sm:order-first sm:h-full sm:items-start">
      <Link href="/#" className="font-cal text-xl hover:no-underline">
        {constants.title}
      </Link>
      <p>Not a lawyer.</p>
      <div className="grow" />
      <p className="text-sm">© {constants.title} 2024</p>
    </div>
  </div>
);
