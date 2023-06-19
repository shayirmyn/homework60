import React from 'react';

const Form = () => {
    const url = 'http://146.185.154.90:8000/messages';

    const data = new URLSearchParams();
    const onValue1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userName = event.target.value;
        data.set('author', userName);
    };
    const onValue2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userMessage = event.target.value;
        data.set('message', userMessage);
    };

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(url, {
            method: 'post',
            body: data,
        });
    };

    return (
        <form className="form" onSubmit={submit}>
           <div className="innerForm">
               <div>
                   <input className="inputSend"
                          type="text"
                          onChange={onValue1}
                          placeholder=" type your name"/>
                   <input className="inputSend"
                          type="text"
                          onChange={onValue2}
                          placeholder=" type message.."/>
               </div>
               <button className="btn btn-primary"
                       type="submit"
               >send</button>
           </div>
        </form>
    );
};

export default Form;