import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Close as DialogClose,
  Content as DialogContent,
  DialogPortal,
} from "@radix-ui/react-dialog";
import { AlertTriangle, Mail, X } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogTrigger,
} from "./ui/dialog";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CONTACT_MESSAGE_MAX_LENGTH = 1000;

const contactFormDataSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().email({ message: "Check" }).min(1, { message: "Required" }),
  message: z
    .string()
    .min(1, { message: "Required" })
    .max(CONTACT_MESSAGE_MAX_LENGTH, { message: "Shorten" }),
});

type ContactFormData = z.infer<typeof contactFormDataSchema>;

export function ContactMeDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormDataSchema),
  });

  const messageLength = watch("message")?.length ?? 0;
  const isMessageLengthOver = messageLength > CONTACT_MESSAGE_MAX_LENGTH;

  const onSubmit: SubmitHandler<ContactFormData> = console.log;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Mail />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={cn(
            "border-windowsBlue fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 bg-background bg-white shadow duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-[640px] md:w-full",
          )}
        >
          <div className="flex flex-row">
            <div className="bg-windowsBlue w-full px-6 py-1 text-center font-bold text-white">
              Contact me
            </div>

            <DialogClose className="border-[3px] border-b-gray-500 border-l-gray-100 border-r-gray-500 border-t-gray-100 bg-gray-300 p-1">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-6">
            <DialogDescription className="text-black">
              Send me a message! I&apos;ll get back to you via email within 1-2
              business days.
            </DialogDescription>

            <div className="flex flex-row items-center justify-between gap-1">
              <p className="w-[7ch] font-bold text-black">Name:</p>
              <div className="relative w-full">
                <input
                  {...register("name")}
                  placeholder="Name"
                  className="w-full border-2 border-black p-1"
                />
                {errors.name && (
                  <span className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-row items-center gap-1 font-bold text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <p className="inline text-sm">{errors.name.message}</p>
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-1">
              <p className="w-[7ch] font-bold text-black">Email:</p>

              <div className="relative w-full">
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="w-full border-2 border-black p-1"
                />
                {errors.email && (
                  <span className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-row items-center gap-1 font-bold text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <p className="inline text-sm">{errors.email.message}</p>
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="w-[7ch] font-bold text-black">Message:</p>
              <div className="relative w-full">
                <textarea
                  {...register("message")}
                  rows={10}
                  className="w-full border-2 border-black p-1"
                />
                {errors.message ? (
                  <span className="absolute bottom-2 right-3 flex -translate-y-1/2 flex-row items-center gap-1 font-bold text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <p className="inline text-sm">{errors.message.message}</p>
                  </span>
                ) : (
                  <span
                    className={cn(
                      "absolute bottom-2 right-3 flex -translate-y-1/2 flex-row items-center gap-1",
                      isMessageLengthOver && "text-orange-600",
                    )}
                  >
                    {isMessageLengthOver ? (
                      <>
                        <AlertTriangle className="h-4 w-4" />
                        <p className="inline text-sm font-bold">Shorten</p>
                      </>
                    ) : (
                      <>
                        <span className="font-bold">{messageLength}</span>
                        <span className="text-sm">
                          / {CONTACT_MESSAGE_MAX_LENGTH}
                        </span>
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="block w-min border-[3px] border-b-gray-500 border-l-gray-100 border-r-gray-500 border-t-gray-100 bg-gray-300 px-4 py-1"
            >
              Contact
            </button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
