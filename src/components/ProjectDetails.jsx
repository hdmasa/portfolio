import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden bg-[#030412]/70 backdrop-blur-sm">
      <motion.div
        className="relative max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy shadow-sm"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-5 top-5 rounded-sm bg-midnight p-2 hover:bg-gray-500"
        >
          <img
            src="assets/close.svg"
            className="h-6 w-6"
            alt="Close project details"
          />
        </button>

        <img src={image} alt={title} className="w-full rounded-t-2xl" />

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>

          {subDescription.map((subDesc, index) => (
            <p
              key={`${title}-${index}`}
              className="mb-3 font-normal text-neutral-400"
            >
              {subDesc}
            </p>
          ))}

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="size-10 rounded-lg hover-animation"
                />
              ))}
            </div>

            <a
              href={href}
              target={href ? "_blank" : undefined}
              rel={href ? "noreferrer" : undefined}
              className={`inline-flex items-center gap-1 font-medium ${
                href
                  ? "cursor-pointer hover-animation"
                  : "pointer-events-none opacity-50"
              }`}
            >
              View Project
              <img
                src="assets/arrow-up.svg"
                className="size-4"
                alt="View project"
              />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
