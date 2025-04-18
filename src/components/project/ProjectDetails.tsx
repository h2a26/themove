type ProjectDetailsProps = {
    caption?: string;
    client?: string;
    location?: string;
    status?: string;
    sectors?: string[];
    purpose?: string;
};

export const ProjectDetails = ({ caption, client, location, status, sectors, purpose }: ProjectDetailsProps) => {
    const meta = [
        { label: 'Client', value: client },
        { label: 'Location', value: location },
        { label: 'Status', value: status },
        { label: 'Sectors', value: sectors?.join(', ') }
    ].filter(item => item.value);

    return (
        <div className="text-deep-black px-8 md:px-20 py-20 grid md:grid-cols-3 gap-y-12 text-sm">
            {/* Left side: metadata */}
            <div className="space-y-6">
                {meta.map(({ label, value }) => (
                    <div key={label}>
                        <p className="font-euclid-circular-b text-[12px] tracking-wider text-deep-black uppercase opacity-80">{label}</p>
                        <p className="font-euclid text-[13px] tracking-widest text-deep-black text-lg mt-2 opacity-100">{value}</p>
                    </div>
                ))}
            </div>

            {/* Right side: caption and purpose */}
            <div className="md:col-span-2 md:col-start-2 md:mt-0 space-y-2">
                {caption && (
                    <h2 className="font-euclid-circular-b text-[12px] tracking-wider text-deep-black uppercase opacity-80">
                        {caption}
                    </h2>
                )}
                {purpose && (
                    <p className="font-euclid text-[13px] tracking-wider text-deep-black whitespace-pre-line opacity-100">
                        {purpose}
                    </p>
                )}
            </div>
        </div>
    );
};
