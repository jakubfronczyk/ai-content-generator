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

    const gradientTextStyle =
        "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";

    return (
        <div className="h-screen flex bg-slate-600">
            <div className="max-w-md m-auto p-2 flex ">
                <div className="bg-slate-800 p-6 rounded-md text-white">
                    <div className="text-center my-12">
                        <h1
                            className={
                                gradientTextStyle + " text-3xl font-light"
                            }
                        >
                            AI Content Generator
                        </h1>

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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
