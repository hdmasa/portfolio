import ContactButton from "../components/ContactButton";
import Magnet from "../components/Magnet";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030412] c-space pt-8 md:pt-12">

      {/* Hero Heading */}
      <div className="relative z-20 flex justify-center overflow-hidden px-4">
        <h1
          dir="rtl"
          className="
            hero-heading
            mt-10
            text-center
            whitespace-nowrap
            font-black
            leading-none
            tracking-tight
            text-[7vw]
            sm:text-[7vw]
            md:text-[8vw]
            lg:text-[9vw]
          "
        >
          سلام من مهسا هستم
        </h1>
      </div>

      {/* Bottom Content */}
      <div
        className="
          absolute
          bottom-50
          right-20
          z-30
          flex
          w-full
          items-end
          justify-between
          gap-4
          px-5
          sm:bottom-8
          sm:px-8
          md:bottom-10
          md:px-10
          lg:px-20
        "
      >

        {/* Contact Button */}
        <ContactButton href="#contact" />
      </div>

      {/* Avatar */}
      <Magnet
        padding={250}
        strength={7}
        activeTransition="transform 0.2s ease-out"
        inactiveTransition="transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
        className="
          absolute
          left-1/2
          top-[40%]
          z-10
          w-[340px]
          -translate-x-1/2
          -translate-y-1/2

          sm:bottom-0
          sm:top-auto
          sm:w-[430px]
          sm:translate-y-0

          md:w-[310px]

          lg:w-[480px]
        "
      >
        <img
          src="/assets/avatar1.png"
          alt="Mahsa portrait"
          className="
            h-auto
            w-full
            object-cover
            transition-transform
            duration-110
            ease-out
            hover:scale-105
          "
        />
      </Magnet>
    </section>
  );
};

export default Hero;