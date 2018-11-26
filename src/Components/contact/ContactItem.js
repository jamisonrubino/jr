import React from 'react';
export function ContactItem(props) {
  return (
    <div className={'contact__menu--' + props.item[0].toLowerCase()}>
      <div className="contact__menu__item__wrapper">
        <div className="contact__menu__info">
          <span className="contact__menu__info--info">
            <a href={props.item[2]} target={props.item[3] ? '' : '_blank'} rel="noopener noreferrer">
              {props.item[0] === 'Email' && props.size === 'sm'
                ? props.item[1].slice(0, props.item[1].indexOf('@')) +
                  '\n' +
                  props.item[1].slice(props.item[1].indexOf('@'))
                : props.item[1]}
            </a>
          </span>
          <span
            className="contact__menu__info--back"
            onClick={() =>
              (document.querySelector(
                '.contact__menu--' + props.item[0].toLowerCase() + ' .contact__menu__item__wrapper'
              ).style.marginLeft = `-${props.itemSize}px`)
            }
          >
            ›
          </span>
        </div>
        <div
          className="contact__menu__item"
          onClick={() =>
            (document.querySelector(
              '.contact__menu--' + props.item[0].toLowerCase() + ' .contact__menu__item__wrapper'
            ).style.marginLeft = '0')
          }
        >
          <span className="svg" dangerouslySetInnerHTML={{ __html: props.svg }} />
          <a href="" onClick={e => e.preventDefault()}>
            {props.item[0]}
          </a>
        </div>
      </div>
    </div>
  )
}
