import { PrivatePage } from "@/components/routing/PrivatePage";
import { MyJobListingsPage } from "./MyJobListingsPage";
import { loader } from './loader'

export const myJobListingsRoute = {
    loader,
    element: <PrivatePage>
                <MyJobListingsPage />
            </PrivatePage>
}
