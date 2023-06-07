type FormProps = {
    prompt: string;
    setPrompt: any;
    handleSubmit: any;
    isLoading: boolean;
    characters: number;
};

const Form = ({
    prompt,
    setPrompt,
    handleSubmit,
    characters,
    isLoading,
}: FormProps) => {
    const isPromptValid = prompt.length < characters;
    const updatePrompt = (text: string) => {
        if (text.length <= characters) {
            setPrompt(text);
        }
    };

    let statusColor = "text-slate-500";
    let statusText = null; // Assign an empty string as the default value

    if (!isPromptValid) {
        statusColor = "text-red-400";
        statusText = `Input must be less than ${characters} characters.`;
    }

    console.log(isPromptValid);

    return (
        <>
            <div className="mb-6 text-slate-400">
                <p>
                    Tell me what your brand is about and I will geenrate copy
                    and keywords for you
                </p>
            </div>
            <input
                className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"
                type="text"
                placeholder="coffe"
                value={prompt}
                onChange={(e) => updatePrompt(e.currentTarget.value)}
            />
            <div
                className={`${statusColor} + " flex justify-between my-2 mb-6 text-sm"`}
            >
                <div>{statusText}</div>
                <div>
                    {prompt.length}/{characters}
                </div>
            </div>
            <button
                className="bg-gradient-to-r from-teal-400 
                to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
                onClick={handleSubmit}
                disabled={isLoading || !isPromptValid}
            >
                Submit
            </button>
        </>
    );
};

export default Form;
