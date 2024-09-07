import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Places to Visit</h2>
      <div className='mt-2'>
        {trip?.tripData?.itinerary.map((item, index)=>(
            <div key={index}>
                <h2 className='font-medium text-lg mt-3'>Day {item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5 mt-2'>
                {item?.plan.map((place,index)=>(
                    <div key={index}>
                        <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                        <PlaceCardItem place={place}/>
                        {/* <h2>{place.place}</h2> */}
                    </div>
                ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
