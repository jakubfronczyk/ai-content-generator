type FormProps = {
    prompt: string;
    setPrompt: any;
    handleSubmit: any;
};

const Form = ({ prompt, setPrompt, handleSubmit }: FormProps) => {
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
                onChange={(e) => setPrompt(e.currentTarget.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
};

export default Form;
