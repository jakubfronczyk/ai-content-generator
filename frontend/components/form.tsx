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
    const isPromptValid = prompt.length <= characters;
    const updatePrompt = (text: string) => {
        if (text.length <= characters) {
            setPrompt(text);
        }
    };

    return (
        <>
            <p>
                Tell me what your brand is about and I will geenrate copy and
                keywords for you
            </p>
            <input
                type="text"
                placeholder="coffe"
                value={prompt}
                onChange={(e) => updatePrompt(e.currentTarget.value)}
            />
            <div>
                {prompt.length}/{characters}
            </div>
            <button
                onClick={handleSubmit}
                disabled={isLoading || !isPromptValid}
            >
                Submit
            </button>
        </>
    );
};

export default Form;
