import React from 'react'

function GuessInput({ gameStatus, handleSubmitGuess, answer }) {
  const [tentativeGuess, setTentativeGuess] = React.useState('')

  const focusRef = React.useRef()

  React.useEffect(() => {
    focusRef.current.focus()
  }, [answer])

  function handleSubmit(event) {
    event.preventDefault()

    handleSubmitGuess(tentativeGuess)

    setTentativeGuess('')
  }

  return (
    <form onSubmit={handleSubmit} className='guess-input-wrapper'>
      <label htmlFor='guess-input'>Enter guess:</label>
      <input
        ref={focusRef}
        required
        disabled={gameStatus !== 'running'}
        minLength={5}
        maxLength={5}
        pattern='[a-zA-Z]{5}'
        title='5 letter word'
        value={tentativeGuess}
        onChange={(event) => {
          const nextGuess = event.target.value.toUpperCase()
          setTentativeGuess(nextGuess)
        }}
        id='guess-input'
        type='text'
      />
    </form>
  )
}

export default GuessInput
