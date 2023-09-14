import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Mail } from "lucide-react";

export function ContactMeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Mail />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">Yes</div>
        <DialogFooter>Contact</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
