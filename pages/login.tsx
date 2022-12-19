import {getProviders, signIn} from "next-auth/react";
import {ClientSafeProvider} from "next-auth/react/types";

function Login({providers}: { providers: ClientSafeProvider[] }) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full bg-black">
            <img src="logo.png" alt="logo" className="w-52 mb-5" />
            {Object.values(providers).map(({id, name}) => (
                <div key={name}>
                    <button
                        className="bg-[#18D860] text-white p-5 rounded-full"
                        onClick={() => signIn(id, {callbackUrl: '/'})}
                    >
                        Login with {name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {providers}
    }
}