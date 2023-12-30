import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { JobListingSkeletonGrid } from "@/features/job-list";
import { JobListingGrid } from "@/features/job-list/components/JobListingGrid";
import { Await, useDeferredLoaderData } from "@/lib/reactRouter";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import { loader } from "./loader";
import { JobListingCard } from "@/features/job-list/components/JobListingCard";
import { JobListingDialogFull } from "@/features/job-list/components/JobListingDialogFull";
import { Eye, EyeOff, Heart } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/utils/shadcnUtils";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function JobListingsPage() {
    const { jobListingsPromise } = useDeferredLoaderData<typeof loader>()

    const [hiddenJobListingIds, setHiddenJobListingIds] = useLocalStorage<string[]>("hiddenJobsIds", [])
    const [favoriteJobListingIds, setFavoriteJobListingIds] = useLocalStorage<string[]>("favoriteJobsIds", [])

    function toggleFavorite(jobListingIds: string) {
        setFavoriteJobListingIds(ids => {
            if(ids.includes(jobListingIds)) {
                return ids.filter(id => id !== jobListingIds)
            }

            return [...ids, jobListingIds]
        })
    }

    function toggleHidden(jobListingIds: string, title: string) {
        setHiddenJobListingIds(ids => {
            if(ids.includes(jobListingIds)) {
                return ids.filter(id => id !== jobListingIds)
            }

            return [...ids, jobListingIds]
        })

        if(hiddenJobListingIds.includes(jobListingIds)) return

        toast({
            title: "Job Hidden",
            description: `${title} will no longer be showing`,
            action: <ToastAction onClick={() =>{
                setHiddenJobListingIds(ids => ids.filter(id => id !== jobListingIds)
                )
            }}
            altText="Click show hidden in the filter section to show hidden jobs and then click the show button in the card to show this job again">
                Undo
            </ToastAction>
        })
    }


    return (
        <>
        <PageHeader
          btnSection={
            <Button variant="outline" asChild>
              <Link to="/jobs/new">Create Listing</Link>
            </Button>
          }
        >
        Job Listings
        </PageHeader>
        <Suspense fallback={<JobListingSkeletonGrid />}>
          <Await resolve={jobListingsPromise}>
            {jobListings => <JobListingGrid>
                {jobListings.map(jobListing => {
                    const isFavorite = favoriteJobListingIds.includes(jobListing.id)
                    const isHidden = hiddenJobListingIds.includes(jobListing.id)
                    const HiddenIcon = isHidden ? Eye : EyeOff

                    return <JobListingCard className={isHidden ? "opacity-50" : undefined} {...jobListing} footerBtns={<JobListingDialogFull {...jobListing} />} headerDetails={
                        <div className="-mr-3 -mt-3">
                            <Button onClick={() => toggleHidden(jobListing.id, jobListing.title)} variant="ghost" size="icon" className="rounded-full">
                                <HiddenIcon className="w-4 h-4" />
                                <div className="sr-only">{isHidden ? "Un-Hide" : "Hide"}</div>
                            </Button>
                            <Button onClick={() => toggleFavorite(jobListing.id)} variant="ghost" size="icon" className="rounded-full">
                                <Heart className={cn("w-4 h-4", isFavorite && ("fill-red-500 stroke-red-500"))} />
                                <div className="sr-only">{isFavorite ? "Un-Favorite" : "Favorite"}</div>
                            </Button>
                        </div>
                    } />
})}
                </JobListingGrid>}
          </Await>
        </Suspense>
      </>
        )
}
