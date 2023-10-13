import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'

// Pulls the current user info using clerk's helper func to get. Destructure too get userId from auth and test to see if the user is authorized. 
// If so then it does a database query agains prisma object relationship mapping(ORM) and return information associated with the userId 

export const currentProfile = async () => {

    const { userId } = auth()

    if (!userId) {
        return null
    }


    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    })

    return profile
}