import React from "react";

const Page = () => {
  return (
    <section className="px-5 pt-20 pb-20 md:px-20 lg:px-40 bg-gray-50">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Return and Refund Policy
      </h1>
      <p className="mt-3 text-lg text-center text-gray-600">
        Learn about our return and refund policies to ensure a smooth
        experience.
      </p>

      {/* Content Section */}
      <div className="p-8 mt-10 space-y-10 bg-white rounded-lg shadow-lg md:p-10">
        {/* Returns Section */}
        <div>
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">Returns</h2>
          <ul className="space-y-5 text-lg leading-relaxed text-gray-700 list-disc list-inside">
            <li>
              <span className="font-medium">Eligibility: </span>You may return
              most new, unopened items within 30 days of delivery for a full
              refund. Items must be in their original packaging and unused.
            </li>
            <li>
              <span className="font-medium">Non-Returnable Items: </span>
              Certain products, such as opened supplements, personal care items,
              or any perishable goods, cannot be returned. Please check the
              product description before making a purchase.
            </li>
            <li>
              <span className="font-medium">Return Process: </span>To initiate a
              return, please contact our Customer Care team at{" "}
              <a
                href="mailto:support@yourayurvedicwebsite.com"
                className="text-blue-500 hover:underline"
              >
                support@yourayurvedicwebsite.com
              </a>{" "}
              with your order details. We will provide you with instructions on
              how to return the item.
            </li>
            <li>
              <span className="font-medium">Return Shipping: </span>You will be
              responsible for paying for your own shipping costs for returning
              the item. Shipping costs are non-refundable.
            </li>
          </ul>
        </div>

        {/* Refunds Section */}
        <div>
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">Refunds</h2>
          <ul className="space-y-5 text-lg leading-relaxed text-gray-700 list-disc list-inside">
            <li>
              <span className="font-medium">Processing: </span>Once we receive
              your return, we will inspect the item and notify you of the status
              of your refund. If approved, the refund will be processed, and a
              credit will automatically be applied to your original method of
              payment within a certain amount of days.
            </li>
            <li>
              <span className="font-medium">Partial Refunds: </span>In certain
              situations, only partial refunds may be granted (e.g., items not
              in original condition, damaged, or missing parts for reasons not
              due to our error).
            </li>
            <li>
              <span className="font-medium">Late or Missing Refunds: </span>If
              you haven&apos;t received a refund yet, first check your bank
              account again. Then contact your credit card company, as it may
              take some time before your refund is officially posted. If
              you&apos;ve done all of this and still have not received your
              refund, please contact us at{" "}
              <a
                href="mailto:support@yourayurvedicwebsite.com"
                className="text-blue-500 hover:underline"
              >
                support@yourayurvedicwebsite.com
              </a>
              .
            </li>
          </ul>
        </div>

        {/* Exchanges Section */}
        <div>
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            Exchanges
          </h2>
          <ul className="space-y-5 text-lg leading-relaxed text-gray-700 list-disc list-inside">
            <li>
              <span className="font-medium">Defective or Damaged Items: </span>
              If you received a defective or damaged item, please contact us
              immediately. We will arrange for a replacement or refund as
              necessary.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Page;
