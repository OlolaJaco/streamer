

const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={`animate-pulse bg-base-300 ${className}`}></div>
    );
};

export default Skeleton