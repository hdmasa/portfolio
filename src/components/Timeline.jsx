export const Timeline = ({ data }) => {
  return (
    <div className="c-space section-spacing">
      <h2 className="text-heading">تجربه کاری من</h2>

      <div className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={`${item.date}-${index}`}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute -left-[15px] flex h-10 w-10 items-center justify-center rounded-full bg-midnight">
                <div className="h-4 w-4 rounded-full border border-neutral-700 bg-neutral-800 p-2" />
              </div>

              <div className="hidden flex-col gap-2 text-xl font-bold text-neutral-300 md:flex md:pl-20 md:text-4xl">
                <h3>{item.date}</h3>
                <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="mb-4 block text-left text-2xl font-bold text-neutral-300 md:hidden">
                <h3>{item.date}</h3>
                <h3>{item.job}</h3>
              </div>

              {item.contents.map((content, contentIndex) => (
                <p
                  className="mb-3 font-normal text-neutral-400"
                  key={`${content}-${contentIndex}`}
                >
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div className="absolute left-1 top-0 h-full w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]" />
      </div>
    </div>
  );
};
