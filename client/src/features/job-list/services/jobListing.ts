import { baseApi } from "@/services/baseApi";
import { jobListingFormSchema } from "@backend/constants/schemas/jobListings";
import { z } from "zod";
import { jobListingSchema } from "../constants/schemas";

export function createJobListing(data: z.infer<typeof jobListingFormSchema> ) {
    return baseApi.post('/job-listings', data).then(res => jobListingSchema.parseAsync(res.data))
}

export function getAllJobListings() {
    return baseApi.get('/job-listings/my-listings').then(res => z.array(jobListingSchema).parseAsync(res.data))
}

export function deleteListing(id: string) {
    return baseApi.delete(`/job-listings/${id}`)

}
