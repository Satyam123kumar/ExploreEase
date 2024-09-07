import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {

    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([])

    useEffect(()=>{
        getUserTrips();
    }, [])

    const getUserTrips = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/');
            return ;
        }

        
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc)=>{
            // console.log("querySnapshot ", doc.data())
            setUserTrips(prev=>[...prev, doc.data()]);
        })
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-56 mt-10 items-center'>
      <h2 className='font-bold tetx-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 mt-5 md:grid-cols-3 gap-5'>
        {userTrips?.length>0 ? userTrips.map((trip, index)=>(
            <UserTripCardItem trip={trip} key={index}/>
        ))
        :[1,2,3,4,5,6].map((item, index)=>(
          <div key={index} className='h-[180px] w-full bg-slate-200 animate-pulse rounded-xl'>

          </div>  
        ))
        }
      </div>
    </div>
  )
}

export default MyTrips
