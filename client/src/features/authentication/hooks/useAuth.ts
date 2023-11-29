import { useContext } from "react"
import { Context } from "../context/AuthProvider"

export function useAuth() {
  const auth = useContext(Context)

  if (auth == null) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return auth
}
