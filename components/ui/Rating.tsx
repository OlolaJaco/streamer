import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons

interface RatingProps {
  rating: number; // Decimal number between 0 and 10
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const clampedRating = Math.min(Math.max(rating, 0), 10); // Ensure rating is between 0 and 10
  const fullStars = Math.floor(clampedRating / 2); // Full stars (each star represents 2 points)
  const halfStar = clampedRating % 2 >= 1; // Check if there's a half star

  return (
    <div className="flex text-2xl">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} aria-label={`${index + 1} star`} className="text-yellow-500" />
      ))}
      {halfStar && <FaStarHalfAlt aria-label="half star" className="text-yellow-500" />}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
        <FaRegStar key={index + fullStars + 1} aria-label="empty star" className="text-gray-400" />
      ))}
    </div>
  );
};

export default Rating;