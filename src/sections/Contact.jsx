"use client";
import { useState } from "react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const initialFormData = {
  name: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setFormData(initialFormData);
      showAlertMessage(
        "success",
        result.message ||
          "پیام شما با موفقیت ثبت شد و در اولین فرصت با شما تماس می‌گیرم.",
      );
    } catch (error) {
      console.error(error);
      showAlertMessage(
        "danger",
        error.message ||
          "در ثبت پیام شما مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex items-center c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">ارتباط با من</h2>
          <p className="font-normal text-neutral-400">
            اگر قصد داشته باشید یک وب‌سایت جدید بسازید، پلتفرم فعلی‌تان را بهبود
            دهید، یا پروژه‌ای منحصربه‌فرد را به واقعیت تبدیل کنید، من اینجا هستم
            تا کمک کنم.
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              نام
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="phone" className="feild-label">
              شماره تماس
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="field-input field-input-focus"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              توضیحات
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="field-input field-input-focus"
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "ثبت" : "در حال ارسال"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
