type ResultProps = {
    snippet: string;
    keywords: any;
};

const Result = ({ snippet, keywords }: ResultProps) => {
    return (
        <div>
            Here are your results:
            <div>Snippet: {snippet}</div>
            <div>Keywords: {keywords.join(", ")}</div>
        </div>
    );
};

export default Result;
