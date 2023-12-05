import { PageHeader } from "@/components/ui/PageHeader"
import { JobListForm, editJobListing } from "@/features/job-list"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { useNavigate } from "react-router-dom"
import { loader } from "./loader"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export function EditJobListingPage() {
    const navigate = useNavigate()
    const { id, jobListingPromise } = useDeferredLoaderData<typeof loader>()

    return (
        <>
        <PageHeader>
            Edit Job Listings
        </PageHeader>
        <Suspense fallback={<LoadingSpinner className="h-24 w-24" />}>
            <Await resolve={jobListingPromise} >
                {jobListing => (
                    <JobListForm
                    initialJobListing={jobListing}
                    onSubmit={ async values => {
                        await editJobListing(id, values)
                        navigate('/jobs/my-listings')
                        }} />
                )}
            </Await>
        </Suspense>
        </>
    )
}
