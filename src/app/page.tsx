"use client";
import heroImage from "@/assets/hero_image.jpg";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="h-dvh container mx-auto flex items-center justify-center">
      <div className="flex gap-5 overflow-hidden">
        <Image
          className="w-[31.20rem] aspect-square"
          src={heroImage}
          alt="Resume generator using AI"
        />
        <div className="flex flex-col gap-5 max-w-3xl">
          <motion.h1
            initial={{ y: "50vh" }}
            animate={{ y: "0vh" }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-7xl font-bold  leading-tight"
          >
            Create Your{" "}
            <span className="text-primary text-balance">AI-Powered Resume</span>
          </motion.h1>
          <motion.h6
            initial={{ y: "50vh" }}
            animate={{ y: "0vh" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-2xl text-balance"
          >
            Let our AI technology help you build a professional resume tailored
            to your skills, experience, and career goals.
          </motion.h6>
          <motion.p
            initial={{ y: "50vh" }}
            animate={{ y: "0vh" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-muted-foreground text-balance"
          >
            Follow these simple steps to create a standout resume that will get
            you noticed by top employers.
          </motion.p>
          <Link href="/onboarding/personal-info">
            <Button className="w-fit" size="lg" asChild>
              <motion.button initial={{ y: "20vh" }} animate={{ y: "0vh" }}>
                Start Now
              </motion.button>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
