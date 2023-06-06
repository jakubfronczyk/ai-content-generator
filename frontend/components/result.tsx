type ResultProps = {
    prompt: string;
    snippet: string;
    keywords: string[];
    handleReset: any;
};

const Result = ({ prompt, snippet, keywords, handleReset }: ResultProps) => {
    const keyword = keywords.map((keyword, index) => (
        <div key={index}>{keyword}</div>
    ));

    return (
        <div>
            <div>
                <div>Prompt</div>
                <div>{prompt}</div>
            </div>
            <div>
                <div>Snippet</div>
                <div>{snippet}</div>
            </div>
            <div>
                <div>Keywords</div>
                <div>{keyword}</div>
            </div>

            <button onClick={handleReset}>Back</button>
        </div>
    );
};

export default Result;
