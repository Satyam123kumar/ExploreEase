export const SelectTravelsList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole travels in exploration",
        icon: "✈️",
        people: '1 Person'
    }, 

    {
        id: 2,
        title: "A couple",
        desc: "two travellers in tandem",
        icon: "🧑‍🤝‍🧑",
        people: '2 People'
    }, 

    {
        id: 3,
        title: "Family",
        desc: "A group of fun loving adv",
        icon: "🏠",
        people: '3 to 5 People'
    }, 

    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekers",
        icon: "⛵",
        people: '5 to 10 People'
    }, 
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: 'Stay concious of costs',
        icon: "💸"
    },
    {
        id: 2,
        title: "Moderate",
        desc: 'Keep cost on average side',
        icon: "💰"
    },
    {
        id: 3,
        title: "Luxury",
        desc: 'Dont worry about costs',
        icon: "🤑"
    }
]

export const AI_PROMPT='Generate Travel Plan for Location: {location} for {totalDays} Days for {traveller} with a {budget} budget, Give me hotel options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions and suggest itinerary with placeName, place Detals, Place Image URL, Geo Coordinates, ticket Pricing, rating, Time to travel, time each of the location for {td} days with each day plan with best time to visit in JSON format.'