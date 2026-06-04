// eslint-disable-next-line react/prop-types
export default function Button ({
    type, 
    name, 
    text, 
    onClick, 
    disabled = false
} : {
    type: "submit" | "reset" | "button", 
    name: string, 
    text: string,
    onClick?: () => void,
    disabled?: boolean
}) {
    return (
        <button 
            type={type} 
            id={name} 
            name={name}
            onClick={onClick}
            disabled={disabled}
            className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {text}
        </button>
    )
}
