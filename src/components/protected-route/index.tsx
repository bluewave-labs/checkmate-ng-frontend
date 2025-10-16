import { useNavigate } from "react-router";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import { setUser, setSelectedTeamId } from "@/features/authSlice";
import { useAppDispatch } from "@/hooks/AppHooks";

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const { response, isValidating, error } = useGet<ApiResponse>(
  //   "/auth/me",
  //   {},
  //   {
  //     shouldRetryOnError: false,
  //     revalidateOnFocus: false,
  //     dedupingInterval: 600000,
  //   }
  // );

  // if (isValidating) {
  //   return null;
  // }

  // if (error) {
  //   navigate("/login");
  //   return null;
  // }

  // if (response && response.message === "OK") {
  //   dispatch(setUser(response.data));
  //   dispatch(setSelectedTeamId(response.data.teamIds?.[0] || null));
  // }
  return <>{children}</>;
};
