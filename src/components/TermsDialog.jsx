import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

function TermsDialog({ isTermsModalOpen, setTermsModalOpen }) {
  return (
    <Dialog open={isTermsModalOpen} onOpenChange={setTermsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="overflow-y-auto h-[500px] w-[104%]">
            <section>
              <h1 className="text-4xl font-semibold">Terms and Conditions</h1>
              <div className="flex items-center justify-center gap-5 mt-3">
                <div className="flex flex-col gap-5 text-xl leading-10 text-justify ">
                  <p>
                    Welcome to [Your Ayurvedic Medicine Website]. By accessing
                    or using our website, you agree to comply with and be bound
                    by the following terms and conditions. Please read them
                    carefully before using our site or purchasing our products.
                    If you do not agree with these terms, you should not use our
                    services.
                  </p>
                  <p className="pb-5 border-b-2">
                    By using [Your Ayurvedic Medicine Website], you agree to our
                    terms and conditions. You must be 18 or older to make
                    purchases, and all users must comply with applicable laws.
                    We strive to provide accurate product information, but
                    cannot guarantee it is error-free. Our products are not
                    intended to diagnose, treat, cure, or prevent any disease,
                    so please consult a healthcare professional before use.
                    Prices are subject to change, and all orders are subject to
                    acceptance. Shipping times are estimates, and we are not
                    responsible for delays. Returns and refunds are handled
                    according to our policy, and refunds will be issued to the
                    original payment method. You are responsible for maintaining
                    the confidentiality of your account, and we reserve the
                    right to terminate accounts if necessary. All content on our
                    site is protected by intellectual property laws and is for
                    personal use only. We provide our website and products
                    &quot;as is&quot; and are not liable for any indirect or
                    consequential damages. These terms are governed by the laws
                    of [Your Country/State], and disputes will be resolved
                    through arbitration. For questions, please contact us at
                    support@yourayurvedicwebsite.com or +[Your Phone Number].
                  </p>

                  <div className="flex items-baseline gap-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <p>
                      By continuing to use this website, you acknowledge that
                      you have read, understood, and agree to these Terms and
                      Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default TermsDialog;
