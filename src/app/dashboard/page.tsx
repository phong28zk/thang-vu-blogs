/* eslint-disable @next/next/no-img-element */
"use client";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

import Stats from "@/components/global/stats";
import Footer from "@/components/layout/footer";
import spotifyData from "@/content/spotify.json";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Use axios to fetch data from Spotify API
  // Example: https://api.spotify.com/v1/shows/{id}/episodes
  // with id = 4gNDdUh9g9ylzs00ODQd0Z
  const ref = useRef(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useClickAway(ref, () => {
    setOpenItem(null);
  });

  const formatDuration = (duration_ms: number) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  const season1 = spotifyData.items
    .filter((item) => item.season === 1)
    .sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  const season2 = spotifyData.items
    .filter((item) => item.season === 2)
    .sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );

  return (
    <div className="w-full h-full p-8 flex flex-col items-center relative">
      <section className="flex flex-col w-full justify-between mt-16 lg:mt-0 md:mt-0 prose prose-a:no-underline gap-6 mb-12">
        <div>
          <h1 className="dark:text-zinc-200 text-zinc-900 leading-none mb-3 text-4xl font-bold">
            Dashboard
          </h1>
          <p className="dark:text-zinc-400 text-zinc-800 m-0 leading-tight">
            Random stats and stuff related to me.
          </p>
        </div>
        <Stats />
        <div className="flex flex-col justify-between gap-4 rounded-lg bg-gradient-to-r from-neutral-200 to-zinc-200 p-4 shadow-xl dark:bg-gradient-to-r dark:from-neutral-800 dark:to-zinc-800 overflow-auto">
          <a
            className="m-0 flex gap-4 text-zinc-700 dark:text-zinc-400"
            href="https://open.spotify.com/show/4gNDdUh9g9ylzs00ODQd0Z"
            target="_blank"
            rel="noreferrer"
          >
            My Spotify's podcast <FiExternalLink />
          </a>
          <Accordion
            ref={ref}
            type="single"
            collapsible
            className="w-full max-h-[650px]"
          >
            <AccordionItem value={"item-1"}>
              <AccordionTrigger>Season 1</AccordionTrigger>
              <AccordionContent>
                <ScrollArea style={{ maxHeight: "500px", overflowY: "auto" }}>
                  <ul className="gap-4">
                    {season1.map((item) => (
                      <li key={item.id}>
                        <Card className="flex flex-row py-2">
                          <div>
                            <CardHeader className="flex flex-row justify-between">
                              <CardTitle>{item.name}</CardTitle>
                              <CardTitle className="ml-auto">
                                <Button variant="link" rel="noreferrer">
                                  <Link href={item.external_urls.spotify}>
                                    <FiExternalLink />
                                  </Link>
                                </Button>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p>{item.release_date}</p>
                              <p>{formatDuration(item.duration_ms)}</p>
                            </CardContent>
                          </div>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value={"item-2"}>
              <AccordionTrigger>Season 2</AccordionTrigger>
              <AccordionContent>
                <ScrollArea style={{ maxHeight: "500px", overflowY: "auto" }}>
                  <ul className="gap-4">
                    {season2.map((item) => (
                      <li key={item.id}>
                        <Card className="flex flex-row py-2">
                          <div>
                            <CardHeader className="flex flex-row justify-between">
                              <CardTitle>{item.name}</CardTitle>
                              <CardTitle className="ml-auto">
                                <Button variant="link" rel="noreferrer">
                                  <Link href={item.external_urls.spotify}>
                                    <FiExternalLink />
                                  </Link>
                                </Button>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p>{item.release_date}</p>
                              <p>{formatDuration(item.duration_ms)}</p>
                            </CardContent>
                          </div>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Footer />
      </section>
    </div>
  );
}