import { Button } from '@/components/ui/button'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlaceCardItem = ({ place }) => {
    const [photoUrl, setPhotoUrl] = useState()
    useEffect(()=>{
        place&&getPlacePhoto();
    },[place])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: place.place
        }
        await getPlaceDetails(data).then(res=>{
            console.log("res-data", res.data);

            const photoURL = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
            // console.log(photoURL);
            setPhotoUrl(photoURL);
        })
    }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.place} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={photoUrl?photoUrl: '/placeholder.jpeg'} className='w-[130px] h-[130px] rounded-lg object-cover' />
                <div>
                    <h2 className='font-bold text-lg'>{place.place}</h2>
                    <p className='text-sm text-gray-500'>{place.details}</p>
                    <div className='flex mt-2 justify-between'>
                        <p className='text-sm bg-gray-100 p-1.5 rounded-full'>🕙 {place.time_at_location}</p>
                        <p className='text-sm bg-gray-100 p-1.5 rounded-full'>⭐ {place.rating} stars</p>
                        <p className='text-sm bg-gray-100 p-1.5 rounded-full'>💸 {place.ticket_pricing}</p>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default PlaceCardItem
