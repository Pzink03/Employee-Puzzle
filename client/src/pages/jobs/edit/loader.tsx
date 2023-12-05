import { getJobListing } from "@/features/job-list";
import { deferredLoader } from "@/lib/reactRouter";

export const loader = deferredLoader(({ params: { id } }) => {
    if(typeof id !== "string") throw new Response("Not Found", {status: 404})

    return { jobListingPromise: getJobListing(id), id }
})
