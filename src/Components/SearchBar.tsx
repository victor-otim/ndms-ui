import {Link} from "react-router-dom";

export default function SearchBar ({btnAddText, btnAddLink}: {btnAddText: string, btnAddLink: string}) {
    return (
        <div className={"flex justify-between mb-4"}>
            <div className={"flex flex-row items-center"}>
                <Link to={`/${btnAddLink}`} className={"text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"}>{btnAddText}</Link>
            </div>
        </div>
    );
}
