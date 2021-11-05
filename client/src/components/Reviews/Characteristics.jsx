import React from 'react';

function Characteristics(props) {

  let percent = Math.round((props.rating.value / 5) * 100) + '%';



  return (
    <div className='chara'>
      <div className='chara-name'>{props.name + ':'}</div>
      <div className='chara-bar'>
        <div className='bar'>
          <div className='bar-divider' style={{left: '23%'}}></div>
          <div className='marker' style={{left: percent}}></div>
          <div className='bar-divider'style={{left: '73%'}}></div>
        </div>
      </div>
      {props.name === 'Fit' || props.name === 'Length' ?
      <div>
        <span className='chara-left'>Too small</span>
        <span className='chara-mid'> Perfect</span>
        <span className='chara-right'>Too large</span>
      </div>:
      <div>
        <span className='chara-left'>Poor</span>
        <span className='chara-mid'></span>
        <span className='chara-right'>Perfect</span>
      </div>
      }
    </div>
  )
}

export default Characteristics;