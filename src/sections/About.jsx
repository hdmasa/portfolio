"use client";
import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import CopyPhoneButton from "../components/CopyPhoneButton";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">درباره من</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 – معرفی */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
            alt="coding perspective"
          />
          <div className="z-10">
            <p className="headtext">سلام، من مهسا سمیعی هستم</p>
            <p className="subtext">
              توسعه‌دهنده فول‌استک با تجربه عملی در ساخت اپلیکیشن‌های وب مقیاس‌پذیر با استفاده از React، Next.js، TypeScript، Python و Flask. علاقه‌مند به خلق راه‌کارهای کارآمد، قابل نگهداری و کاربرمحور.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>

        {/* Grid 2 – مفاهیم کلیدی و تکنولوژی‌ها */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full relative"
          >
            <p className="flex items-end text-5xl text-gray-500 opacity-20 select-none">
              FULL STACK
            </p>
            {/* کارت‌های مفهومی */}
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="RESTful APIs"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="Scalable Systems"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Database Design"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Clean Code"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="Agile"
              containerRef={grid2Container}
            />
            {/* کارت‌های تکنولوژی */}
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              text="React"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              text="Python"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              text="Next.js"
              containerRef={grid2Container}
            />
          </div>
        </div>

        {/* Grid 3 – موقعیت مکانی و منطقه زمانی */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Location</p>
            <p className="subtext">
              کرج، البرز، ایران
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>

        {/* Grid 4 – دعوت به همکاری */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-5 size-full">
            <p className="text-center headtext">
              آیا آماده‌اید تا با هم همکاری کنیم؟
            </p>
            <CopyEmailButton />
            <CopyPhoneButton />
          </div>
        </div>

        {/* Grid 5 – استک فنی */}
        <div className="grid-default-color grid-5">
          <div className="z-15 w-[35%]">
            <p className="headtext">Tech Stack</p>
            <p className="subtext">
              در زبان‌ها، فریم‌ورک‌ها و ابزارهای مختلفی تخصص دارم که به من کمک می‌کنند اپلیکیشن‌های محکم و مقیاس‌پذیر توسعه بدم.
            </p>
          </div>
          {/* لیست سفارشی تکنولوژی‌ها به جای کامپوننت Frameworks */}
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[40%] md:scale-125 flex flex-wrap items-center justify-center gap-4 p-4">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">React</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">Next.js</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">TypeScript</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">Python</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">Flask</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">REST API</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">Docker</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">Git</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">Figma</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">Postman</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;