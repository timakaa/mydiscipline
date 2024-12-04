"use client";

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/modal";
import { Trash2 } from "lucide-react";
import { deleteChartById } from "@/app/actions/chartActions";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteChartModal = ({ id }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteChart = async (e) => {
    if (isLoading) return;
    e.preventDefault();

    try {
      setIsLoading(true);
      await deleteChartById(id);
      router.push("/discipline");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger asChild>
        <button className="btn btn-error p-2 text-white">
          <Trash2 size={14} />
        </button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side="bottom">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Delete Chart</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Are you sure you want to delete this chart?
          </ResponsiveModalDescription>
          <form onSubmit={deleteChart}>
            <button
              disabled={isLoading}
              className="btn btn-error py-2 text-white"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </form>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default DeleteChartModal;
