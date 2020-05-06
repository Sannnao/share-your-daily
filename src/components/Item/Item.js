import React from 'react';
import './item.scss';

const Item = ({ itemContent }) => {
  return (
	  <li className='item'>
			<span className='item__text-wrapper'>-{' '}{ itemContent }</span>
			<div className='item__buttons-wrapper'>
			  <button className='item__btn item__edit-btn'>Edit</button>
				<button className='item__btn item__del-btn'>X</button>
			</div>
		</li>
	)
}

export default Item;
