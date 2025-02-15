import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

export default function UrlInput() {
  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Label className="text-sm/6 font-medium">Long URL</Label>
        <Description className="text-sm/6 text-black/100">
          Enter your long URL and hit Generate Button.
        </Description>
        <Input
          placeholder="url . . ."
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          )}
        />
      </Field>
    </div>
  );
}
