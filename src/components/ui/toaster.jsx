"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top-end", // o 'bottom-end' según prefieras
  pauseOnPageIdle: true,
  duration: 4000,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root
            width={{ md: "sm" }}
            bg={
              toast.type === "success"
                ? "secondary.700"
                : toast.type === "error"
                ? "red.800"
                : toast.type === "warning"
                ? "orange.800"
                : "brand.600"
            }
            color="white"
            borderRadius="lg"
            boxShadow="xl"
          >
            {toast.type === "loading" ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && (
                <Toast.Title fontWeight="semibold">{toast.title}</Toast.Title>
              )}
              {toast.description && (
                <Toast.Description opacity={0.9}>
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger
                color="white"
                _hover={{ color: "whiteAlpha.800" }}
              >
                {toast.action.label}
              </Toast.ActionTrigger>
            )}
            {toast.closable && (
              <Toast.CloseTrigger
                color="white"
                _hover={{ color: "whiteAlpha.800" }}
              />
            )}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
