import React from 'react'

const MessageBackup = props =>
  props.message ? <div className="message__backup">{props.message}</div> : null

export function Alert(props) {
  let alertClass =
    'alert' + (props.s ? (props.err ? ' failure' : ' success') : props.err ? ' failure' : '')
  const AlertX = () => (
    <a
      className="alert__x"
      onClick={() =>
        props.ss({ error: false, submitted: false, message: null, messageBackup: null })
      }
    >
      ✕
    </a>
  )
  const AlertMessage = () => (
    <span
      className={alertClass}
      style={props.mb ? { borderRadius: '0.25rem 0.25rem 0 0' } : {}}
      dangerouslySetInnerHTML={{ __html: props.m }}
    />
  )
  return (
    <div className="alert__wrap">
      <AlertMessage />
      <AlertX />
      <MessageBackup message={props.mb} />
    </div>
  )
}
