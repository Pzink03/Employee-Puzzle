import { useAuth } from "@/features/authentication";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

export function PrivatePage({ children } : { children: ReactNode}) {
    const location = useLocation()
    const { user, isLoadingUser} = useAuth()

    if(isLoadingUser) return <LoadingSpinner className="w-24 h-24" />

    if(user == null) {
        return <Navigate to="/login" replace state={{location}}/>
    }

    return children
}
