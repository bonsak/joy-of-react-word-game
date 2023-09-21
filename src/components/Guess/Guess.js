import React from 'react'

import { range } from '../../utils'

function Guess({ value }) {
  // console.log({ value })

  return (
    <p className='guess'>
      {range(5).map((num) => (
        <span
          key={num}
          className={`cell ${value ? value[num].status : undefined}`}
        >
          {value ? value[num].letter : undefined}
        </span>
      ))}
    </p>
  )
}

export default Guess
