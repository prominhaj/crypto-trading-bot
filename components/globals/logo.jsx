import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <svg
                width="40"
                height="40"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#008000', stopOpacity: 1 }} />
                        <stop offset="25%" style={{ stopColor: '#0000FF', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#FFFF00', stopOpacity: 1 }} />
                        <stop offset="75%" style={{ stopColor: '#FF0000', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="pyramid-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>

                <path
                    d="M100 20 L180 180 L20 180 Z"
                    fill="url(#pyramid-gradient)"
                />
            </svg>
        </Link>
    );
};

export default Logo;