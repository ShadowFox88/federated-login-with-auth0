import { User } from "global/types";

interface Properties {
    user?: User;
}

export default function NavBar(properties: Properties) {
    return (
        <nav className="box-border flex w-full items-center justify-end p-6 shadow-lg">
            <span className="font-bold">{properties.user?.name ?? "No user"}</span>
        </nav>
    );
}
