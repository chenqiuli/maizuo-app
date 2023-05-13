import React from 'react';
import './index.css';

export default function TitleBar({ text, children }) {
  return (
    <div className="titleBar">
      <div className="text">{text}</div>
      {children}
    </div>
  );
}
