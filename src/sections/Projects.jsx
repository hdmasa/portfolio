"use client";
import { useState } from "react";
import { motion } from "motion/react";
import ProjectDetails from "../components/ProjectDetails";
import { myProjects } from "../constants";

const featuredProjects = myProjects.slice(0, 3);

const ProjectCard = ({
  title,
  description,
  subDescription,
  href,
  image,
  index,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        style={{ top: `${index * 18}px` }}
        className="sticky z-10"
      >
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[#171717] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.42)] sm:p-6 md:rounded-[60px] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-4xl font-bold text-white/30 sm:text-5xl md:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                {title}
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-300 sm:text-base">
                {description}
              </p>
            </div>

            <div className="lg:w-[52%]">
              <motion.img
                src={image}
                alt={title}
                className="h-[240px] w-full rounded-[28px] object-cover md:h-[300px] lg:h-[340px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </motion.article>

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

const Projects = () => {
  return (
    <section className="c-space section-spacing">
      <div className="rounded-t-[40px] bg-[#030412] px-4 pb-8 pt-8 sm:rounded-t-[50px] sm:px-6 sm:pb-12 sm:pt-12 md:rounded-t-[60px] md:px-8 md:pb-16 md:pt-16">
        <h2 className="text-heading">
          پروژه های من
        </h2>

        <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6 md:mt-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
