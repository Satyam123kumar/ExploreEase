import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTripCardItem = ({trip}) => {
    const [photoUrl, setPhotoUrl] = useState()
    useEffect(()=>{
        trip&&getPlacePhoto();
    },[trip])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await getPlaceDetails(data).then(res=>{
            // console.log("res-data", res.data);

            const photoURL = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
            // console.log(photoURL);
            setPhotoUrl(photoURL);
        })
    }
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img src={photoUrl?photoUrl: '/placeholder.jpeg'} className='rounded-xl h-[180px] w-full object-cover'/>
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
