import { Button } from "@/components/ui/button"
import { JobListing } from "../constants/types"
import { JobListingCard } from "./JobListingCard"
import { JobListingGrid } from "./JobListingGrid"
import { Link } from "react-router-dom"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteListing } from "../services/jobListing"
import { useMemo, useState } from "react"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"


type MyJobListingGridProps = {
    jobListings: JobListing[]
}

export function MyJobListingGrid({ jobListings }: MyJobListingGridProps ) {
    const [deletedJobListingIds, setDeletedJobListingIds] = useState<string[]>([])
    const visibleJobListings = useMemo(() => {
        return jobListings.filter((jobListing) => !deletedJobListingIds.includes(jobListing.id))
    }, [jobListings, deletedJobListingIds])

    function deleteJobListing(id: string) {
        deleteListing(id).catch(() => {
            toast({
                title: "Failure to delete job listing",
                action: <ToastAction altText="Click the delete button in the job card to retry"onClick={() => deleteJobListing(id)}>
                    Retry
                </ToastAction>
            })
            setDeletedJobListingIds(ids => {
                return ids.filter(listingIds => listingIds !== id)
            })
        })
        setDeletedJobListingIds(ids => [...ids, id])
    }

    return <JobListingGrid>
        {visibleJobListings.map((jobListing) => (
            <MyJobListingsCard key={jobListing.id} jobListing={jobListing} deleteJobListing={deleteJobListing}/>
        ))}
    </JobListingGrid>
}

type MyJobListingCard = {
    jobListing: JobListing
    deleteJobListing: (id: string) => void
}

function MyJobListingsCard({ jobListing, deleteJobListing}: MyJobListingCard){
    return (
    <JobListingCard {...jobListing}
    footerBtns={
        <>
        <DeleteJobListingDialogue deleteListing={() => deleteJobListing(jobListing.id)}/>
        <Button variant="outline" asChild>
            <Link to={`/jobs/${jobListing.id}/edit`}>Edit</Link>
        </Button>
        </>
    }
    />
    )
}

type deleteJobListingDialogueProps = {
    deleteListing: () => void
}

function DeleteJobListingDialogue({ deleteListing }: deleteJobListingDialogueProps) {
    return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="ghost">Delete</Button>
        </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>
            Are you sure you want to delete this job listing?
            </AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your job listing and any remaining time will not be refunded.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteListing}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
    )
}
