import { useMutation } from "@tanstack/react-query";

import { loginUser } from "./loginUser";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
