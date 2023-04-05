import React, { useState, useEffect, createContext } from 'react'

// import data
import { housesData } from '../data'

// create context
export const HouseContext = createContext()

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('Location (any)')
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState('Property type (any)')
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState('Price range (any)')
  const [loading, setLoading] = useState(false)

  // return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country
    })
    //console.log(allCountries)
    // remove duplicates
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)]

    //console.log(uniqueCountries)
    // set countries state
    setCountries(uniqueCountries)
  }, [houses])

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type
    })
    //console.log(allProperties)
    // remove duplicates
    const uniqueProperties = ['Location (any)', ...new Set(allProperties)]

    //console.log(uniqueProperties)
    // set countries state
    setProperties(uniqueProperties)
  }, [houses])

  const handleClick = () => {
    // set loading
    setLoading(true)

    //console.log(country, property, price)

    // create a function that checks if the string includes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('(any)')
    }
    //console.log(isDefault(country))
    //console.log(parseInt(price.split(' ')[0]))

    // get first value of price and parse it to number
    const minPrice = parseInt(price.split(' ')[0])
    // get second value of price which is the maximum price & prase it to number
    const maxPrice = parseInt(price.split(' ')[2])
    //console.log(maxPrice)

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price)

      //console.log(house.country)
      //console.log(house.type)
      //console.log(country)
      //console.log(property)
      //console.log(minPrice)
      //console.log(maxPrice)

      // if all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house
      }

      // if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house
      }

      // if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country
      }

      // if property is not default
      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property
      }

      // if price is not default
      if (isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house
        }
      }

      // if country & property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property
      }

      // if country and price is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country
        }
      }

      // if property and price is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property
        }
      }
    })

    console.log(newHouses.length)

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      )
    }, 1000)
  }

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  )
}

export default HouseContextProvider
