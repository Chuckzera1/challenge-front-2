export function LinkIcon({ icon, bgColor }: { icon: React.ReactNode, bgColor: string }) {
    return (
        <span className={`inline-flex items-center justify-center p-3 bg-${bgColor}-500 rounded-md shadow-lg`}>
            {icon}
        </span>
    )
}