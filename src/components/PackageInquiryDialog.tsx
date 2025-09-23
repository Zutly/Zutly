"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SharedContactFormContent from "@/components/SharedContactFormContent";

interface PackageInquiryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
}

const PackageInquiryDialog: React.FC<PackageInquiryDialogProps> = ({
  isOpen,
  onOpenChange,
  packageName,
}) => {
  const initialMessage = `Ik ben geïnteresseerd in het "${packageName}" pakket en zou graag meer informatie ontvangen.`;

  const handleSubmissionSuccess = () => {
    onOpenChange(false); // Close the dialog on successful submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-zutly-dark-purple">Offerte aanvragen voor {packageName}</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
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