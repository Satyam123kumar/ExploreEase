import { Button } from '@/components/ui/button'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


const InfoSection = ({trip}) => {
    
    const [photoUrl, setPhotoUrl] = useState()
    useEffect(()=>{
        trip&&getPlacePhoto();
    },[trip])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
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
      <img src={photoUrl?photoUrl: '/placeholder.jpeg'} className='md:h-[340px] xl:h-[400px] w-full object-cover rounded-xl'/>
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📆 {trip?.userSelection?.noOfDays} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip?.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🥂 No. Of Traveller: {trip?.userSelection?.traveller}</h2>
            </div>
        </div>

        <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection
