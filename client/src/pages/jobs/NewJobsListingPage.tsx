import { PageHeader } from "@/components/ui/PageHeader";
import { JobListForm, createJobListing } from "@/features/job-list";
import { useNavigate } from "react-router-dom";

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
