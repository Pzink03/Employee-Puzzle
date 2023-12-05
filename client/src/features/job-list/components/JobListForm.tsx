import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobListingFormSchema } from '@backend/constants/schemas/jobListings'
import { z } from "zod";
import { Control, FieldValues, Path, PathValue, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_LISTING_EXPERIENCE_LEVELS, JOB_LISTING_TYPES } from "@backend/constants/types";

type JobListingValues = z.infer<typeof jobListingFormSchema>

const DEFAULT_VALUES: JobListingValues = {
            applyUrl: '',
            companyName: '',
            description: '',
            experienceLevel: "Mid-Level",
            location: '',
            salary: NaN,
            shortDescription: '',
            title: '',
            type: "Full Time"
}


type NewJobListingProps = {
    onSubmit: (values: JobListingValues) => void,
    initialJobListing?: JobListingValues
}



export function JobListForm({ onSubmit, initialJobListing = DEFAULT_VALUES }: NewJobListingProps) {
    const form = useForm<JobListingValues>({
        resolver: zodResolver(jobListingFormSchema),
        defaultValues: initialJobListing
    })

    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                    <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                    <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                    <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="applyUrl"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Application URL</FormLabel>
                    <FormControl>
                    <Input type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} value={isNaN(field.value) ? "" : field.value} />
                    </FormControl>
                    <FormDescription>USD</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
                />
                <JobListingSelectForm label="Type" options={JOB_LISTING_TYPES} name="type" control={form.control}/>
                <JobListingSelectForm label="Experience Level" options={JOB_LISTING_EXPERIENCE_LEVELS} name="experienceLevel" control={form.control}  />
                <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                <FormItem className="sm:col-span-2">
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                    <Textarea  {...field} />
                    </FormControl>
                    <FormDescription>Max 200 Char</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem className="sm:col-span-full">
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                    <Textarea  {...field} />
                    </FormControl>
                    <FormDescription>Supports full Markdown</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
                />
                </div>
            <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline">
                    Show Preview
                </Button>
                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? <LoadingSpinner /> : "Create"}
                </Button>
            </div>
            </form>
        </Form>
    )
}

type JobListSelectFormFieldProps<T extends FieldValues> = {
    label: string,
    control: Control<T>,
    name: Path<T>,
    options: readonly PathValue<T, Path<T>>[]
}

function JobListingSelectForm<T extends FieldValues>({
    label,
    control,
    name,
    options,
}: JobListSelectFormFieldProps<T>) {
    return (
        <FormField
        control={control}
        name={name}
        render={({field}) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <Select onValueChange={value => field.onChange(value as PathValue<T, Path<T>>)}
                defaultValue={field.value}
                >
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            {options.map(option => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}

        />
    )
}
