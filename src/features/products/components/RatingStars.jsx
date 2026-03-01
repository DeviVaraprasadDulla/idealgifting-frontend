function RatingStars({ selected, onSelect }) {
  return (
    <div className="flex gap-2 text-2xl cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onSelect(star)}
          className={star <= selected ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingStars;
