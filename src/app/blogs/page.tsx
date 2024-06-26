/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Footer from "@/components/layout/footer";
import Link from "next/link";

// import Card from "@/components/layout/cardBase";
import { Card } from "@/components/ui/card";

import { FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { ICardProps } from "@/lib/type/card";
import { readClient } from "../../../sanity/lib/client";
import { LoadingPage } from "@/components/global/loading";
export default function Blogs() {
  const ref = useRef<HTMLDivElement>(null);
  const [openItem, setOpenItem] = useState<string>("");
  const [blogs, setBlogs] = useState<ICardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Handle Click Outside
  const handleClickOutside = () => {
    setOpenItem("");
    console.log("clicked outside");
  };
  useOnClickOutside(ref, handleClickOutside);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await readClient.fetch(`*[_type == "post"]`);
      setBlogs(response);
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  console.log(isLoading);

  return (
    <section className="w-full mb-12">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingPage />
        </div>
      ) : (
        <div>
          <div>
            <h1 className="dark:text-zinc-200 text-zinc-900 leading-none mb-3 text-4xl font-bold">
              My Blogs
            </h1>
            <p className="dark:text-zinc-400 text-zinc-800 m-0 leading-tight">
              Random stats and stuff related to me.
            </p>
          </div>
          <div className="mt-6 dark:bg-inherit">
            <div className="flex flex-col gap-6">
              {blogs?.length > 0 ? (
                blogs.map((post) => (
                  <Card
                    key={post._id}
                    className="flex flex-col md:flex-row  justify-between px-4 py-4 gap-4"
                  >
                    <span className="flex flex-col gap-2">
                      <h2 className="font-bold text-2xl">{post.title}</h2>
                      <p className="">{post.description}</p>
                      <p className="">
                        {new Date(blogs[0]?._createdAt).toDateString() ?? ""} -{" "}
                        {new Date(blogs[0]?._createdAt).toLocaleTimeString(
                          undefined,
                          { hour12: false }
                        ) ?? ""}
                      </p>
                    </span>
                    <Link
                      href={
                        post.slug
                          ? `/blogs/${(post.slug as any).current}`
                          : "/blogs"
                      }
                    >
                      <Button>
                        Read More <FiExternalLink />
                      </Button>
                    </Link>
                  </Card>
                ))
              ) : (
                <div className="p-4 text-red-500">No posts found</div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </section>
  );
}
