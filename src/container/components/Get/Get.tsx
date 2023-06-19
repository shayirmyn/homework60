import React, {useEffect, useState} from 'react';
import {IMessages} from "../../../types.d";
const url = "http://146.185.154.90:8000/messages";

const Get = () => {

    const [messages, setMessages] = useState<IMessages[]>([]);

    const fetchData = async () => {
        const responce = await fetch(url);
        const parseResponce = await responce.json();
        setMessages(parseResponce);
    };

    useEffect(() => {
        fetchData().catch(error => console.error(error));
        if (messages.length > 0) {
            let lastDateTime = messages[messages.length - 1].datetime;
            setInterval(async () => {
                const dateTimeRequest = await fetch(`${url}?datetime=${lastDateTime}`);
                const parseDateTimeRequest = await dateTimeRequest.json();

                if (parseDateTimeRequest.length > 0) {
                    setMessages( prevState => [...prevState, parseDateTimeRequest]);
                } else {
                    console.log("nothing!!!")
                }

                lastDateTime = parseDateTimeRequest[parseDateTimeRequest.length - 1].datetime;
            }, 3000);
        }
    }, [messages]);

    return (
        <div className="container">
            <div className="container2">
                <div>
                    {
                        messages.length < 1 ? <h5>Please send something to show..</h5> :
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