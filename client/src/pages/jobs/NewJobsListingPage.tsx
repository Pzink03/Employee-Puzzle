import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { JobListForm } from "@/features/job-list";
import { Link } from "react-router-dom";

export function NewJobsListingsPage() {
    return (
        <>
        <PageHeader>
            New Job Listings
        </PageHeader>
        <JobListForm />
        </>
    )
}
