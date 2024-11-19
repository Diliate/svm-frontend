import React from "react";

const Page = () => {
  return (
    <section className="px-10 pt-24 pb-20 md:px-20 lg:px-40 bg-gray-50">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Terms and Conditions
      </h1>
      <p className="mt-3 text-xl text-center text-gray-600">
        Please read these terms and conditions carefully before using our
        website or services.
      </p>

      {/* Content Section */}
      <div className="p-8 mt-10 bg-white rounded-lg shadow-lg md:p-10">
        <div className="space-y-6 text-xl leading-relaxed text-justify text-gray-700">
          <p>
            Welcome to <span className="font-semibold text-gray-800">SVM</span>.
            By accessing or using our website, you agree to comply with and be
            bound by the following terms and conditions. Please read them
            carefully before using our site or purchasing our products. If you
            do not agree with these terms, you should not use our services.
          </p>
          <p className="pb-5 border-b-2 border-gray-200">
            By using <span className="font-semibold text-gray-800">SVM</span>,
            you agree to our terms and conditions. You must be 18 or older to
            make purchases, and all users must comply with applicable laws. We
            strive to provide accurate product information, but cannot guarantee
            it is error-free. Our products are not intended to diagnose, treat,
            cure, or prevent any disease, so please consult a healthcare
            professional before use. Prices are subject to change, and all
            orders are subject to acceptance. Shipping times are estimates, and
            we are not responsible for delays. Returns and refunds are handled
            according to our policy, and refunds will be issued to the original
            payment method. You are responsible for maintaining the
            confidentiality of your account, and we reserve the right to
            terminate accounts if necessary. All content on our site is
            protected by intellectual property laws and is for personal use
            only. We provide our website and products{" "}
            <span className="italic">&quot;as is&quot;</span> and are not liable
            for any indirect or consequential damages. These terms are governed
            by the laws of{" "}
            <span className="font-medium text-gray-800">
              [Your Country/State]
            </span>
            , and disputes will be resolved through arbitration. For questions,
            please contact us at{" "}
            <a
              href="mailto:support@yourayurvedicwebsite.com"
              className="text-blue-500 hover:underline"
            >
              support@yourayurvedicwebsite.com
            </a>{" "}
            or{" "}
            <a
              href="tel:+[Your Phone Number]"
              className="text-blue-500 hover:underline"
            >
              +[Your Phone Number]
            </a>
            .
          </p>

          {/* Checkbox Section */}
          <div className="flex items-start gap-4 mt-6">
            <input
              type="checkbox"
              className="w-5 h-5 mt-1 text-green-500 border-gray-300 rounded focus:ring-green-500 focus:ring-offset-2"
            />
            <p className="text-gray-600">
              By continuing to use this website, you acknowledge that you have
              read, understood, and agree to these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
