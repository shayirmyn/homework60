import React, {useEffect, useState} from 'react';
import {IMessages} from "../../../types.d";
const url = "http://146.185.154.90:8000/messages";

const Get = () => {

    const [messages, setMessages] = useState<IMessages[]>([]);

    const fetchData = async () => {
        const responce = await fetch(url);
        const parseResponce = await responce.json();
        setMessages(parseResponce);
        console.log('first mount');
    };

    useEffect(() => {
        fetchData().catch(error => console.error(error));
    }, []);


    useEffect(() => {
        let lastDateTime = messages.length > 0 ? messages[messages.length - 1].datetime : '';
        let interval = setInterval(async () => {
            if (lastDateTime) {
                const response = await fetch(`${url}?datetime=${lastDateTime}`);
                const messages = await response.json();
                if (messages.length > 0) {
                    setMessages(prevState => [...prevState, ...messages]);
                    console.log('second mount')
                }
            }
        }, 5000);

        return () => clearInterval(interval);

    }, [messages]);

    return (
        <div className="container">
            <div className="container2">
                <div>
                    {
                        messages.length < 1 ? <h5>oops, please wait for a minute</h5> :
                            messages.map((message: IMessages) => (
                                <div className="divInfo" key={message.datetime}>
                                    <p className="authorName"><strong>author:</strong> {message.author}</p>
                                    <p className="messageInfo"><strong>message:</strong> {message.message}</p>
                                    <p className="dateInfo"><strong>date:</strong> {message.datetime}</p>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
};

export default Get;