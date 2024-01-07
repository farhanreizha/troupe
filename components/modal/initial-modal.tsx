"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import FileUpload from "@/components/file-upload";
import { Loader2 } from "lucide-react";
import { CreateServerSchema } from "@/lib/schemas";

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof CreateServerSchema>>({
    resolver: zodResolver(CreateServerSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (value: z.infer<typeof CreateServerSchema>) => {
    await axios
      .post("/api/servers", value)
      .then((result) => {
        form.reset();
        router.refresh();
        window.location.replace(`/servers/${result.data.id}`);
      })
      .catch((error) =>
        toast(error.response.data, {
          unstyled: true,
          className: "toast-error",
        })
      );
  };

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(!isOpen);

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden border-none bg-card">
        <DialogHeader className="pt-8 px-6 pb-4">
          <DialogTitle className="h3-bold text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center small-medium">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                >
                </FormField>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase small-bold dark:text-foreground/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="shad-input"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-primary/10 dark:bg-slate-800/20 px-6 py-4">
              <Button disabled={isLoading}>
                Create
                {isLoading && (
                  <Loader2 className="animate-spin h-4 w-4 text-foreground/70 ml-2" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
