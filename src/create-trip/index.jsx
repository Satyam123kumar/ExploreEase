import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options'
import { chatSession } from '@/service/AIModel'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
//for dialogue
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [openDialogue, setOpenDialogue] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    // onError: (err) => console.log(err)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialogue(true)
      return;
    }

    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.traveller) {
      toast("All details are mandatory to fill")
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget)
      .replace('{td}', formData?.noOfDays)

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
    setLoading(false)
    SaveAiTrip(result?.response?.text());

  }

  const SaveAiTrip = async (TripData) => {

    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString()  //It is just to create document id
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID
    })
    setLoading(false)
    navigate('/view-trip/'+docID)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "Application/json"
      }
    }).then((res) => {
      // console.log(res)
      //as res is json data so we need to convert them into string format that's why we use stringyfy
      localStorage.setItem('user', JSON.stringify(res.data))
      setOpenDialogue(false)
      onGenerateTrip();
    })
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-56 mt-10 items-center'>
      <h2 className='font-bold text-3xl'>Tell us about your travel preference</h2>
      <p className='mt-3 text-gray-500 text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus, felis quis porttitor sodales, dolor lorem egestas ante, id convallis nibh velit a justo.</p>

      {/* form */}
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (e) => {
                setPlace(e);
                handleInputChange('location', e)
              }
            }}
          />
          {/* {console.log(place)} */}
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days you are planning?</h2>
          <Input placeholder={"Ex.3"} type='number' onChange={
            (e) => handleInputChange('noOfDays', e.target.value)
          } />
          <p className='text-gray-500 text-sm my-1'>*Enter days less than 6</p>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${formData?.budget === item.title && 'shadow-lg border-black'}
                `}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on treavelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelsList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${formData?.traveller === item.people && 'shadow-lg border-black'}
              `}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={onGenerateTrip} disabled={loading || formData?.noOfDays > 5}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> :
            "Generate Trip"
          }
        </Button>
      </div>

      <Dialog open={openDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the app with Googele authentication securely</p>

              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip
