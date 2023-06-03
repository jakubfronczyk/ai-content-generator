import { useState } from "react";
import Form from "./form";
import Result from "./result";

const Main: React.FC = () => {
    const ENDPOINT: string =
        "https://t3irntudgf.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_keywords";

    const [prompt, setPrompt] = useState("");
    const [snippet, setSnippet] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [hasResult, setHasResult] = useState(false);

    const handleSubmit = async () => {
        console.log("Submitting " + prompt);

        fetch(`${ENDPOINT}?prompt=beach`)
            .then((res) => res.json())
            .then(handleResult);
    };

    const handleResult = (data: any) => {
        setSnippet(data.snippet);
        setKeywords(data.keywords);
        setHasResult(true);
    };

    let resultsElement = null;

    // if (hasResult) {
    //     resultsElement = (
    //         <div>
    //             Here are your results:
    //             <div>Snippet: {snippet}</div>
    //             <div>Keywords: {keywords.join(", ")}</div>
    //         </div>
    //     );
    // }

    return (
        <>
            <h1>AI Content Generator</h1>
            <Form
                prompt={prompt}
                setPrompt={setPrompt}
                handleSubmit={handleSubmit}
            />
            {hasResult ? (
                <Result
                    snippet={snippet}
                    keywords={keywords}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default Main;
