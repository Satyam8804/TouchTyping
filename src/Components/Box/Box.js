import React, { useEffect, useState } from 'react';
import './Box.css';

const Box = () => {
  const words =
    'You are required to build a web-based application for touch typing. Touch typing is typing without looking at the keyboard. The fundamental idea is that each finger is given its own section of the keyboard and your fingers learn the location of the keyboard through practising regularly and gaining muscle memory to eventually build up speed whilst typing. While touch typing is a practice of keys, words & sentences.';

  const [seconds, setSeconds] = useState(30);
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [state, setState] = useState(false);
  const [indicator, setIndicator] = useState(false);

  function handleCount(e) {
    const letter = e.target.value;
    setLetterCount(letter.length);
    const word = e.target.value.trim().split(/\s+/);
    const length = word.length;
     if(!text.includes(letter)){
        setIndicator(true);
        setMistakeCount((prevMistakes) => prevMistakes + 1);
    }else{
        setIndicator(false);
    }
    setWordCount(length);
  }

  function handleWpm() {
    const wordPerMinute = Math.round((wordCount / 30) * 60);
    setWpm(wordPerMinute);
  }

  function handleAccuracy(){
    const accur  = ((letterCount - mistakeCount)*100)/letterCount;
    setAccuracy(accur)
  }

  useEffect(() => {
    setText(words);
  }, []);

  useEffect(() => {


    
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (seconds === 0) {
      setState(true);
      handleWpm();
      handleAccuracy();
    }


  }, [seconds]);

  return (
    <div className="container">
      <div className="heading">
        <span>Touch Typing</span>
        <span className={seconds <= 10 ? 'ending' : 'timer'}>{seconds}</span>
      </div>
      <textarea value={text} disabled placeholder='Type Here...'/>
      <input
        type="text"
        onChange={handleCount}
        className={indicator ? 'wrong' : ''}
        disabled={state}
      />
      <div className="stats">
        <div className="count change">Word Count:{" "} {wordCount}</div>
        <div className="wpm change">WPM:{" "} {wpm}</div>
        <div className="accuracy change">Accuracy %:{" "}{accuracy} </div>
      </div>
    </div>
  );
};

export default Box;