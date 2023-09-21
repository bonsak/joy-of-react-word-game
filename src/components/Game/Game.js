import React from 'react'

import { sample } from '../../utils'
import { WORDS } from '../../data'
import { checkGuess } from '../../game-helpers'

import GuessInput from '../GuessInput'
import GuessResults from '../GuessResults'
import WonBanner from '../WonBanner'
import LostBanner from '../LostBanner'

import { NUM_OF_GUESSES_ALLOWED } from '../../constants'
// import Keyboard from '../Keyboard/Keyboard'

function Game() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS))
  // running | won | lost
  const [gameStatus, setGameStatus] = React.useState('running')
  // Guesses
  const [guesses, setGuesses] = React.useState([])
  // HKeep track of turns. Easier to read
  const [turn, setTurn] = React.useState(1)

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = checkGuess(tentativeGuess, answer)

    setGuesses([...guesses, nextGuesses])

    // console.log('Turn: ', turn)

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus('won')
    } else if (turn >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost')
    }
    const nextTurn = turn
    setTurn(nextTurn + 1)
  }

  function handleRestart() {
    const newAnswer = sample(WORDS)
    setAnswer(newAnswer)
    setGuesses([])
    setGameStatus('running')
    setTurn(1)
  }

  return (
    <>
      <GuessResults guesses={guesses} />
      <GuessInput
        gameStatus={gameStatus}
        handleSubmitGuess={handleSubmitGuess}
      />
      {/* <Keyboard guesses={guesses} /> */}
      {gameStatus === 'won' ? (
        <WonBanner
          numOfGuesses={guesses.length}
          handleRestart={handleRestart}
        />
      ) : undefined}
      {gameStatus === 'lost' ? (
        <LostBanner answer={answer} handleRestart={handleRestart} />
      ) : undefined}
    </>
  )
}

export default Game
