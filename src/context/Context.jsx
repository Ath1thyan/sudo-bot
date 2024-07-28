import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async () => {
        if (input.trim() === "") return;

        const newMessage = { text: input, sender: "user" };
        setMessages([...messages, newMessage]);
        setRecentPrompt(input);
        setInput("");
        setLoading(true);
        setShowResult(true);

        const response = await run(input);
        const botMessage = { text: response, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        setLoading(false);
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        messages,
        setMessages,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;