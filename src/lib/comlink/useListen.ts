import { useState, useCallback } from "react";
import { useExpose } from "./useExpose";

export const useListen = (key: string) => {
  const [value, setValue] = useState<unknown>(null);

  const handleNotification = useCallback(
    (value: unknown) => {
      console.log("useListen.ts :: listener called with value: ", value);
      setValue(value);
    },
    [setValue]
  );

  useExpose(`notify-${key}`, handleNotification);
  return value;
};
