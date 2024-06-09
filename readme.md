# mockaas.tv

## Description
mockaas.tv is a mock of mocaas.tv.

## Installation

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies using `pnpm install` command.
3. Add `.env` file consisting of `JWT_SECRET` with your desired value.
4. Start the development server using `pnpm run dev` command.


### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies using `pnpm install` command.
3. Copy `.env` to `.env.local`. Don't forget to assign the value(s).
4. Start the development server using `pnpm run dev` command.


## Usage
### Register and signin
You can register and sign in using web UI or `curl` command in terminal (or anything that can do http request).

### Film
For creating, updating, and deleting, you can only do it using http request. Don't forget to add Authorization header with `Bearer [token]` value.

The listing (retrieving many data) and reading (retrieving single data) can be done using UI by visiting `/browse` and `/watch/{id}` respectively. Or you can also do it using http request.
