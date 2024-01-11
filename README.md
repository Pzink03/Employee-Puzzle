## Employment Puzzle
While developing this already existing job board website I implemented front-end features to enhance overall functionality and user interface. Implementing custom React hooks I integrate context functionality, giving the application dynamic features such as a user-friendly dark mode. I also designed and integrated the use of Stripe payments, providing a solution for job listing renewals and facilitating updates to job statuses. Also, I introduced filtering, hiding, and favoriting job listings, utilizing local storage to ensure persistent UI interactions.
## Functionality

### Key Features
-Visitors to the site will need to create an account to access the site. Returning users will have the option to login with their credentials.
-Logged in users will be able to create tasks and job listings.
-When creating a job listing you can preview the post before it's made live.
-Uses Stripe to manage payments that will allow users to create job listings.
-Job listings will have a status badge indicating when a job listing is in draft, expired, or how many days until a job listing needs to be renewed.
-Users have the ability to toggle dark mode on/off.
-Uses a skeleton loading grid when listings are still in a loading state
-Users will have the ability to edit and delete job listings
-Implements form validation through schemas
-Allows users to filter jobs based on selected catagories
-Users can favorite/hide jobs and filter accordingly

### `components`

 This folder will contain all of the components used in this project. The components are built using Shadcn. Also, all icons for this project use the `lucide-react` library.

### `constants`

This folder contains all the config/data files. If you need to add a new environment variable to the project you should add it here. This makes it so we get type safety with our environment variables and also makes it easier to find them all in one place. If you need to import an environment variable make sure you import it from this file and not with `import.meta.env`.

### `features`

The features folder is our most complex folder as it contains all the features for our application. Inside each feature the folder structure from `src` is replicated as you can see. The only important thing to know about this folder is that we only allow you to import from the `index.ts` file within each feature. This is to make it easier to find where things are coming from and also to make it easier to refactor things later on. If you need to import something from a feature make sure you import it from the `index.ts` file.

### `hooks`

This folder contains any global hooks that are used across the entire application. If a hook is only used in a particular feature it should go in the feature folder instead.

### `layouts`

This folder contains any layouts that are used across the entire application. If a layout is only used in a particular feature it should go in the feature folder instead.

### `pages`

This folder contains all of our pages. In general we like to nest our pages in a folder structure that closely resembles the actual URL path to those files as it makes it easier to find the correct page for a given path.

### `utils`

This folder contains any global utilities. If a utility is only used in a particular feature it should go in the feature folder instead.

## Project Initialization

To fully enjoy this application on your local machine, please follow these steps:
for the frontend:
1. Clone the repository down to your local machine
2. CD into the new project directory
3. CD into client directory
4. run `npm i`
5. run `npm run dev`

To get the backend setup you will need to do the following:
1. Install Sqlite on your machine
2. CD into api directory
3. Run `npm i`
4. Copy the `.env.example` file to `.env`
5. Run `npx prisma db push`
6. Run `npm run dev`

## User Routes

1. `POST /users/login` - This takes a simple email/password and will return the user id/email if the credentials are correct. It will also set a cookie in the browser with the user's session. As long as you ensure you always pass the cookie up with each request you will be authenticated. This cookie stays valid for a week which means you can close the browser and come back later and still be logged in.
2. `POST /users/signup` - This route works pretty much identically to the login route, but it will create a brand new user as long as their password meets all requirements. It will also return the user id/email and set a cookie in the browser.
3. `DELETE /users/logout` - This route will clear the cookie in the browser and log the user out.
4. `GET /users/session` - This route will return the user id/email of the currently logged in user. This is useful for getting the user id/email if they leave the page and come back later while their session cookie is still active.

#### Job Listing Routes

1. `GET /job-listings/published` - This route will return all the published job listings. This is useful for getting the job listings to display on the job board.
2. `GET /job-listings/my-listings` - This route will return all the job listings for the currently logged in user (even if they are not published).
3. `POST /job-listings` - This route will create a new job listing for the currently logged in user. It will return the new job listing that was created.
4. `PUT /job-listings/:id` - This route will update the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the updated job listing.
5. `DELETE /job-listings/:id` - This route will delete the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the deleted job listing.
6. `POST /job-listings/:id/create-publish-payment-intent` - This route is used as part of our Stripe integration to create a payment intent for the job listing with the given id. This needs to be given a duration for how long to post the job listing for. This will only work if the user is authenticated and the owner of the job listing. It will return the payment intent to be used with Stripe. If you want to learn more checkout the documentation on Stripe for [accepting payments](https://stripe.com/docs/payments/quickstart).

#### Stripe Routes

1. `POST /stripe-webhooks/job-listing-order-complete` - This is not a route that you will need to directly call. Stripe will call this route for us whenever a payment is successfully made and it will update the job listing with the new expiration date.

Fork repository at: https://github.com/Pzink03/Employment-Puzzle

Clone repository to local by running: git clone https://github.com/Pzink03/Employment-Puzzle

## Maintainer
@Pzink03
