import { FaRegStar, FaStar } from "react-icons/fa";

const TestimonialCard = ({ feedback }) => {
  const { rating, feedback: comment, user } = feedback;

  return (
    <div className="p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:w-[300px] h-[200px]">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-medium">{user?.name || "Anonymous"}</h2>
        <div className="flex">
          {Array.from({ length: rating }, (_, index) => (
            <FaStar key={index} color="#FFB345" />
          ))}
          {Array.from({ length: 5 - rating }, (_, index) => (
            <FaRegStar key={index} color="#FFB345" />
          ))}
        </div>
        <p className="text-lg text-justify">
          {comment || "No feedback provided."}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
