import { useState } from "react";
import Form from "./form";
import Result from "./result";

const Main: React.FC = () => {
    const CHARACTER_LIMIT: number = 32;
    const ENDPOINT: string =
        "https://t3irntudgf.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_keywords";

    const [prompt, setPrompt] = useState("");
    const [snippet, setSnippet] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [hasResult, setHasResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        console.log("Submitting " + prompt);
        setIsLoading(true);

        fetch(`${ENDPOINT}?prompt=${prompt}`)
            .then((res) => res.json())
            .then(handleResult);
    };

    const handleResult = (data: any) => {
        const updatedSnippet = data.snippet.replace(/"/g, "");

        setSnippet(updatedSnippet);
        setKeywords(data.keywords);
        setHasResult(true);
        setIsLoading(false);
    };

    const handleReset = () => {
        setPrompt("");
        setHasResult(false);
        setIsLoading(false);
    };

    return (
        <>
            <h1>AI Content Generator</h1>

            {hasResult ? (
                <Result
                    prompt={prompt}
                    snippet={snippet}
                    keywords={keywords}
                    handleReset={handleReset}
                />
            ) : (
                <Form
                    prompt={prompt}
                    setPrompt={setPrompt}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    characters={CHARACTER_LIMIT}
                />
            )}
        </>
    );
};

export default Main;
