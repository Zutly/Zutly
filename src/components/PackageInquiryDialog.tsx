"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import SharedContactFormContent from "@/components/SharedContactFormContent";

interface PackageInquiryDialogProps {
  packageName: string;
  trigger: React.ReactNode;
  dialogTitlePrefix?: string; // Nieuwe prop voor de titelprefix
}

const PackageInquiryDialog: React.FC<PackageInquiryDialogProps> = ({
  packageName,
  trigger,
  dialogTitlePrefix = "Offerte aanvragen", // Standaardwaarde is 'Offerte aanvragen'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const initialMessage = `Ik ben geïnteresseerd in het "${packageName}" pakket en zou graag meer informatie ontvangen.`;

  const handleSubmissionSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-[425px] p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-zutly-platinum text-center"> {/* Expliciet text-center toegevoegd */}
            {dialogTitlePrefix} voor {packageName}
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2 text-center"> {/* Expliciet text-center toegevoegd */}
            Vul het onderstaande formulier in en we nemen zo snel mogelijk contact met u op.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <SharedContactFormContent
            initialMessage={initialMessage}
            onSubmissionSuccess={handleSubmissionSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageInquiryDialog;