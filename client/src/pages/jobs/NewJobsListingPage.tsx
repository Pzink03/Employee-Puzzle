import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { JobListForm, createJobListing } from "@/features/job-list";
import { Link, useNavigate } from "react-router-dom";

export function NewJobsListingsPage() {
    const navigate = useNavigate()

    return (
        <>
        <PageHeader>
            New Job Listings
        </PageHeader>
        <JobListForm onSubmit={ async values => {
            await createJobListing(values)
            navigate('/jobs/my-listings')
            }} />
        </>
    )
}
