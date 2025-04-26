type ProjectDetailsProps = {
  caption?: string;
  client?: string;
  location?: string;
  status?: string;
  sectors?: string[];
  purpose?: string;
};

export const ProjectDetails = ({
  caption,
  client,
  location,
  status,
  sectors,
  purpose,
}: ProjectDetailsProps) => {
  const meta = [
    { label: 'Client', value: client },
    { label: 'Location', value: location },
    { label: 'Status', value: status },
    { label: 'Sectors', value: sectors?.join(', ') },
  ].filter((item) => item.value);

  return (
    <div className="text-deep-black px-8 md:px-20 py-20 grid md:grid-cols-3 gap-y-12 text-sm">
      {/* Left side: metadata */}
      <div className="space-y-8">
        {meta.map(({ label, value }) => (
          <div key={label}>
            <p
              className="text-[14px] tracking-wider text-deep-black uppercase opacity-80"
              style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
            >
              {label}
            </p>
            <p
              className="text-[14px] tracking-widest text-deep-black text-lg mt-2 opacity-100"
              style={{ fontFamily: 'var(--font-euclid)' }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
      {/* Center: caption */}
      <div className="md:col-span-2 md:col-start-2 md:mt-0 space-y-6">
        {caption && (
          <h2
            className="text-[14px] tracking-wider text-deep-black uppercase opacity-80"
            style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
          >
            {caption}
          </h2>
        )}
        {purpose && (
          <p
            className="text-[16px] tracking-wider text-deep-black whitespace-pre-line opacity-100"
            style={{ fontFamily: 'var(--font-euclid)' }}
          >
            {purpose}
          </p>
        )}
      </div>
    </div>
  );
};
