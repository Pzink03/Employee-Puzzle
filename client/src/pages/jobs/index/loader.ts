
import { getAllPublishedJobListings } from "@/features/job-list";
import { deferredLoader } from "@/lib/reactRouter";

export const loader = deferredLoader(() => {
    return { jobListingsPromise: getAllPublishedJobListings() }
})
