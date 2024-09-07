import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCardItem = ({hotel}) => {

    const [photoUrl, setPhotoUrl] = useState()
    useEffect(()=>{
        hotel&&getPlacePhoto();
    },[hotel])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.name
        }
        const result = await getPlaceDetails(data).then(res=>{
            console.log("res-data", res.data);

            const photoURL = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
            // console.log(photoURL);
            setPhotoUrl(photoURL);
        })
    }
  return (
    <div>
      <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+ hotel?.address} target='_blank'>
            <div className='my-5 hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl?photoUrl: '/placeholder.jpeg'} className='rounded-xl h-[180px] w-full object-cover'/>
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.name}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.address}</h2>
                    <h2 className='text-sm'>🏷️ {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.rating} stars</h2>
                </div>
            </div>
            </Link>
    </div>
  )
}

export default HotelCardItem
