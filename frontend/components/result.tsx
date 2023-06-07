type ResultProps = {
    prompt: string;
    snippet: string;
    keywords: string[];
    handleReset: any;
};

const Result = ({ prompt, snippet, keywords, handleReset }: ResultProps) => {
    const keyword = keywords.map((keyword, index) => (
        <div
            key={index}
            className="bg-teal-200 p-1 text-teal-700 px-2 text-sm rounded-md"
        >
            {keyword}
        </div>
    ));

    const keywordElementsHolder = (
        <div className="flex flex-wrap gap-2">{keyword}</div>
    );

    const resultSection = (label: string, body: any) => {
        return (
            <div className="bg-slate-700 p-4 my-3 rounded-md">
                <div className="text-slate-400 text-sm font-bold mb-4">
                    {label}
                </div>
                <div>{body}</div>
            </div>
        );
    };

    return (
        <>
            <div className="mb-6">
                {resultSection(
                    "Prompt",
                    <div className="text-lg font-bold">{prompt}</div>
                )}
                {resultSection("Branding Snippet", snippet)}
                {resultSection("Keywords", keywordElementsHolder)}
            </div>
            <button
                className="bg-gradient-to-r from-teal-400 
          to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
                onClick={handleReset}
            >
                Back
            </button>
        </>
    );
};

export default Result;
