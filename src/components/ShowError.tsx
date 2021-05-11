interface ErrorProps {
    error: {
        message: string;
    };
    size?: 'lg' | 'sm';
    contactSupportMessage?: boolean;
}

const ShowError: React.FC<ErrorProps> = ({ error, size, contactSupportMessage }) => (
    <div className="flex flex-col justify-center items-center">
        <span
            className={`flex flex-row items-center text-red-400 ${
                (size === 'lg' && 'text-xl') || (size === 'sm' && 'text-sm')
            }`}
        >
            <span className="mr-2">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </span>
            {error.message}
        </span>
        {contactSupportMessage && <span className="text-sm text-red-600 font-semibold">Please try later or contact support.</span>}
    </div>
);

export default ShowError;
