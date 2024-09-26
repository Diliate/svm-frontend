import React from "react";

const page = () => {
  return (
    <section className="p-10">
      <h1 className="text-4xl font-semibold text-center">
        Return and Refund Policy
      </h1>
      <div className="flex flex-col items-center justify-center gap-5 mt-3">
        <div className="w-[80%]">
          <div>
            <h2 className="text-3xl font-semibold">Returns</h2>
            <ul className="flex flex-col gap-3 mt-3 text-xl text-justify list-disc">
              <li>
                <span className="font-medium">Eligibility: </span>You may return
                most new, unopened items within 30 days of delivery for a full
                refund. Items must be in their original packaging and unused.
              </li>
              <li>
                <span className="font-medium">Non-Returnable Items: </span>{" "}
                Certain products, such as opened supplements, personal care
                items, or any perishable goods, cannot be returned. Please check
                the product description before making a purchase.
              </li>
              <li>
                <span className="font-medium">Return Process: </span>To initiate
                a return, please contact our Customer Care team at
                support@yourayurvedicwebsite.com with your order details. We
                will provide you with instructions on how to return the item.
              </li>
              <li>
                <span className="font-medium">Return Shipping: </span>You will
                be responsible for paying for your own shipping costs for
                returning the item. Shipping costs are non-refundable.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 mt-5 text-xl text-justify ">
            <h2 className="text-3xl font-medium">Refunds</h2>
            <ul className="flex flex-col gap-3 list-disc">
              <li>
                <span className="font-medium">Processing: </span>Once we receive
                your return, we will inspect the item and notify you of the
                status of your refund. If approved, the refund will be
                processed, and a credit will automatically be applied to your
                original method of payment within a certain amount of days.
              </li>
              <li>
                <span className="font-medium">Partial Refunds: </span> In
                certain situations, only partial refunds may be granted (e.g.,
                items not in original condition, damaged, or missing parts for
                reasons not due to our error).
              </li>
              <li>
                <span className="font-medium">Late or Missing Refunds: </span>{" "}
                If you haven&apos;t received a refund yet, first check your bank
                account again. Then contact your credit card company, as it may
                take some time before your refund is officially posted. If
                you&apos;ve done all of this and still have not received your
                refund, please contact us at support@yourayurvedicwebsite.com.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 mt-5 text-xl text-justify">
            <h2 className="text-3xl font-medium">Exchanges</h2>
            <ul className="mt-3 list-disc">
              <li>
                <span className="font-medium">
                  Defective or Damaged Items:{" "}
                </span>
                If you received a defective or damaged item, please contact us
                immediately. We will arrange for a replacement or refund as
                necessary.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
