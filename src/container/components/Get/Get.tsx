import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IMessages} from "../../../types.d";

const url = "http://146.185.154.90:8000/messages";

const Get = () => {

    const [messages, setMessages] = useState<IMessages[]>([]);

    const fetchData = async () => {
        const responce = await axios.get(url);
        setMessages(responce.data);
    };

    useEffect(() => {
        fetchData().catch(error => console.error(error));
    }, []);

    console.log(messages);

    return (
        <div className="container">
            <div className="container2">
                <div>
                    {messages.map((message: IMessages) => (
                        <div className="divInfo">
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