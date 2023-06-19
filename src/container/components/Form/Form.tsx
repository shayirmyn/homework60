import React from 'react';

const Form = () => {



    return (
        <form className="form">
           <div className="innerForm">
               <div>
                   <input className="inputSend" type="text" placeholder=" type your name"/>
                   <input className="inputSend" type="text" placeholder=" type message.."/>
               </div>
               <button className="btn btn-primary"
                       type="submit"
               >send</button>
           </div>
        </form>
    );
};

export default Form;