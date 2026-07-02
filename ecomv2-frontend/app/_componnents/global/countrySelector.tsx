import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list';

function CountrySelector({inputName}) {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  

  const changeHandler = value => {
    setValue(value)
  }

  return <Select options={options} value={value} onChange={changeHandler} name={inputName} />
}

export default CountrySelector