function CodeBlock({code}) {

    return (
        <div className="flex-grow basis-96 bg-gray-950 text-white p-4 h-auto max-h-96 overflow-y-scroll">
            <code>
                {code}
            </code>
        </div>
    )
}

export default CodeBlock;