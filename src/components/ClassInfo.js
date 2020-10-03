import React, { Component } from 'react';
import { useSelector } from 'react-redux';



export const ClassInfo = () => {
    const code = useSelector(state => state.vars.secret);
    const name = useSelector(state => state.vars.clsName);
    return <React.Fragment>
            <h2>Class: { name } </h2>
            <h3>Secret code: { code }</h3>
            <h3></h3>
         </React.Fragment>
    
}