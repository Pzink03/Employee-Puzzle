import { JobListing } from "../constants/types"
import { JobListingCard } from "./JobListingCard"
import { JobListingGrid } from "./JobListingGrid"

type MyJobListingGridProps = {
    jobListings: JobListing[]
}

export function MyJobListingGrid({ jobListings }: MyJobListingGridProps ) {
    return <JobListingGrid>
        {jobListings.map((jobListing) => (
            <MyJobListingsCard key={jobListing.id} jobListing={jobListing} />
        ))}
    </JobListingGrid>
}

type MyJobListingCard = {
    jobListing: JobListing
}

function MyJobListingsCard({ jobListing}: MyJobListingCard){
    return <JobListingCard {...jobListing} />

}
