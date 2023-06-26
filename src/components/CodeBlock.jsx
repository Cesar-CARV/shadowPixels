import { useState, useEffect } from "react";

function CodeBlock({ code, title }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => setCopied(false), [code]);

    const handleClick = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
    }


    return (
        <section className="flex-grow basis-96 max-w-full h-auto bg-gray-900 text-white" onClick={handleClick}>
            <header className="p-4 flex justify-between items-center bg-gray-700">
                <h4>{title}</h4>
                <button onClick={handleClick}>
                    {
                        copied ?
                            <div className="text-teal-500"><span>Copied</span> <i className='bx bxs-check-square'></i></div>
                            :
                            <i className='bx bx-clipboard'></i>
                    }
                </button>
            </header>
            <div className="p-4">
                <div className="overflow-auto w-full h-full">
                    <pre>
                        <code>
                            {code}
                        </code>
                    </pre>
                </div>
            </div>
        </section>
    )
}

export default CodeBlock;