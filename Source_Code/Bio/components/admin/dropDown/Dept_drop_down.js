import { View, Text } from 'react-native'
import React from 'react'

const Dept_drop_down = () => {
  return (
    <RNPickerSelect
    onValueChange={(value) => console.log(value)}
    items={[
      { label: 'Football', value: 'football' },
      { label: 'Baseball', value: 'baseball' },
      { label: 'Hockey', value: 'hockey' },
    ]}
  />
  )
}

export default Dept_drop_down