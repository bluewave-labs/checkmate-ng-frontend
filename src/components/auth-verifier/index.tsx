import { useGet } from "@/hooks/UseApi";
import { useAppDispatch } from "@/hooks/AppHooks";
import type { ApiResponse } from "@/hooks/UseApi";
import type { IUser } from "@/types/user";
import {
  setAuthenticated,
  setUser,
  logout,
  setSelectedTeamId,
} from "@/features/authSlice";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/AppHooks";
import type { ReactNode } from "react";

export const AuthVerifier = ({ children }: { children: ReactNode }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const selectedTeamId = useAppSelector((state) => state.auth.selectedTeamId);
  const dispatch = useAppDispatch();

  const { response, error, loading, isValidating } =
    useGet<ApiResponse>("/auth/me");

  useEffect(() => {
    if (response) {
      const user: IUser = response.data;

      dispatch(setAuthenticated(true));
      dispatch(setUser(response.data));

      if (
        !selectedTeamId ||
        !user.teamIds.some((id) => id === selectedTeamId)
      ) {
        dispatch(setSelectedTeamId(user.teamIds[0]));
      }
      setIsVerifying(false);
    } else if (error) {
      dispatch(logout());
      setIsVerifying(false);
    }
  }, [response, error, dispatch, selectedTeamId]);

  if (isVerifying) {
    return null;
  }

  if ((loading || isValidating) && !response && !error) {
    return null;
  }

  return <>{children}</>;
};
