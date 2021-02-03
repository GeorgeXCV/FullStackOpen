import React from 'react';
import Contact from "./Contact";

const Contacts = ({names, filter}) => {
    if (filter.length < 1) {
      return names.map(name => 
        (
          <Contact name={name.name} number={name.number}/>   
        ))
    } else {
      return filter.map(name => 
        (
          <Contact name={name.name} number={name.number}/>   
        ))
    }
   
  } 

export default Contacts;