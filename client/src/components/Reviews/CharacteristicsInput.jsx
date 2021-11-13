import React, { useState } from 'react';

function CharacteristicsInput(props) {
  const [charaDesc, setCharaDesc] = useState({description: 'none selected'})

  let chara = props.characteristic

  let charaDescValues = {
    Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  }

  let handleCharaScoreChange = function(e) {
    var value = e.target.value
    value == 1 ? setCharaDesc({description: charaDescValues[chara][value - 1]})
    : value == 2 ? setCharaDesc({description: charaDescValues[chara][value - 1]})
    : value == 3 ? setCharaDesc({description: charaDescValues[chara][value - 1]})
    : value == 4 ? setCharaDesc({description: charaDescValues[chara][value - 1]})
    : setCharaDesc({description: charaDescValues[chara][value - 1]});
  }

  return (
    <React.Fragment >
      <span><b>{`${chara}: `}</b>{`${charaDesc.description}`}</span>
      <div>
        <input name={`chara-${chara}`} type='radio' value='1' className='chara-input' onChange={handleCharaScoreChange} id={`${chara}-score-1`} ></input>
        <label className='chara-label' htmlFor={`${chara}-score-1`}>
          <div>1</div>
        </label>
        <input name={`chara-${chara}`} type='radio' value='2' className='chara-input' onChange={handleCharaScoreChange} id={`${chara}-score-2`}></input>
        <label className='chara-label' htmlFor={`${chara}-score-2`}>
          <div data-testid={chara === 'Length' ? 'length-chara' : null} >2</div>
        </label>
        <input name={`chara-${chara}`} type='radio' value='3' className='chara-input' onChange={handleCharaScoreChange} id={`${chara}-score-3`}></input>
        <label className='chara-label' htmlFor={`${chara}-score-3`}>
          <div>3</div>
        </label>
        <input name={`chara-${chara}`} type='radio' value='4' className='chara-input' onChange={handleCharaScoreChange} id={`${chara}-score-4`}></input>
        <label className='chara-label' htmlFor={`${chara}-score-4`}>
          <div>4</div>
        </label>
        <input name={`chara-${chara}`} type='radio' value='5' className='chara-input' onChange={handleCharaScoreChange} id={`${chara}-score-5`}></input>
        <label className='chara-label' htmlFor={`${chara}-score-5`}>
          <div>5</div>
        </label>
      </div>
    </React.Fragment>
  )
}

export default CharacteristicsInput;