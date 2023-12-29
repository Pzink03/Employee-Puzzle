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

export function JobListingsPage() {
    const { jobListingsPromise } = useDeferredLoaderData<typeof loader>()

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
                {jobListings.map(jobListing => (
                    <JobListingCard {...jobListing} footerBtns={<JobListingDialogFull {...jobListing} />} />
                ))}
                </JobListingGrid>}
          </Await>
        </Suspense>
      </>
        )
}
