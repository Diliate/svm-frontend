import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addRating } from "@/services/ratingService"; // Replace with your actual service
import toast from "react-hot-toast";

const RatingModal = ({ productId, userId, onFeedbackAdded }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5.");
      return;
    }

    setLoading(true);
    try {
      const newFeedback = await addRating({
        productId,
        userId,
        rating,
        feedback,
      });
      onFeedbackAdded(newFeedback); // Callback to update the parent component
      setFeedback("");
      setRating(0);
      setIsOpen(false);
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#056D3C] text-white rounded-full px-4 py-2 hover:bg-[#195639] transition-all duration-200">
          Add Feedback
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Feedback</DialogTitle>
          <DialogDescription>
            Rate this product and provide your feedback.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="rating" className="text-xl font-semibold">
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="p-2 border-2 rounded-md"
            >
              <option value={0}>Select Rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="feedback" className="text-xl font-semibold">
              Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
              className="col-span-3 p-3 border-2 rounded-md"
            />
          </div>
          <DialogFooter>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded mt-5 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
