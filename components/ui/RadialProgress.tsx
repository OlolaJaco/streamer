interface RadialProgressProps {
  popularity?: number;
  color?: string;
}

const RadialProgress: React.FC<RadialProgressProps> = ({ popularity = 0, color = 'text-primary' }) => {
  // Convert popularity to a percentage (0-100) based on 1000 as the maximum value
  const percentage = Math.min(Math.round((popularity / 1000) * 100), 100);
  
  return (
    <div 
      className={`radial-progress ${color}`} 
      style={{ "--value": percentage } as React.CSSProperties} 
      aria-valuenow={percentage} 
      role="progressbar"
    >
      {percentage}%
    </div>
  )
}

export default RadialProgress